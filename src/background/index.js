/* globals chrome,console,setTimeout */
import * as api from 'src/common/api';
import * as messages from 'src/common/messages';
import {Tab} from 'src/common/tabModel';

/**
 * chrome.storage.local images-ABC to an object containing the url and a base64 encoded
 * jpeg thumbnail
 * chrome.storage.local tabs-ABC: a list of Tab objects, in order of appearance in the
 * browser. Note that this is across all open windows
 */

// cold start, init with current tabs
chrome.storage.local.get('tabs').then(result => {
  if (!result.tabs) {
    fetchTabs();
  }
});

chrome.runtime.onMessage.addListener((message, unusedSender, unusedSendResponse) => {
  switch (message.type) {
    case messages.CLOSE_TAB:
      chrome.tabs.remove(message.value);
      break;
    case messages.GO_TO_TAB:
      chrome.tabs.update(message.value, {active: true});
      break;
    case messages.MOVE_TAB:
      chrome.storage.local.get('tabs').then(result => {
        const tabs = result.tabs;
        if (tabs && tabs[message.value.oldIndex] && tabs[message.value.newIndex]) {
          const tabId = tabs[message.value.oldIndex].id;
          const realNewIndex = tabs[message.value.newIndex].realIndex;
          chrome.tabs.move(tabId, {index: realNewIndex},
            () => api.fireMessage(messages.TAB_MOVED));
        }
      });
      break;
    default:
      console.warn(`Background page encountered unhandled message: ${message.type}`);
      break;
  }
});

chrome.tabs.onActivated.addListener(({tabId}) => {
  chrome.tabs.get(tabId, tab => {
    if (tab.url.indexOf('http') !== 0) {
      return;
    }
    captureAndSaveVisibleTab(tabId, tab, 0, captured => {
      if (captured) {
        // we could probably optimize this if needed
        fetchTabs(() => api.fireMessage(messages.TAB_IMAGE_CAPTURED));
      }
    });
  });
});

chrome.tabs.onRemoved.addListener(tabId => {
  const callback = () => fetchTabs(() => api.fireMessage(messages.TAB_CLOSED));
  chrome.storage.local.remove(`images-${tabId}`).then(callback, callback);
});
chrome.tabs.onUpdated.addListener(() => {
  fetchTabs(() => api.fireMessage(messages.TAB_UPDATED));
});
chrome.tabs.onMoved.addListener(() => {
  fetchTabs(() => api.fireMessage(messages.TAB_MOVED));
});

/**
 * Fetches all the tabs into a list of tab objects. Fires the callback after setting the
 * tabs.
 */
function fetchTabs(callback) {
  chrome.tabs.query({}, tabs => {
    chrome.storage.local.get(null).then(items => {
      const tabIdToImageMap = Object.keys(items)
        .filter(k => k.indexOf('images-') === 0)
        .reduce((acc, cur) => {
          const tabId = cur.replace('images-', '');
          acc[tabId] = items[cur];
          return acc;
        }, {});
      chrome.storage.local.set({tabs:
        tabs.filter(t => t.url.indexOf('http') === 0).map(t => new Tab(t, tabIdToImageMap))})
        .then(() => {
          if (callback) {
            callback();
          }
        });
    });
  });
}

/**
 * Captures the visible tab as an image and stores it in memory. Calls the callback with
 * true if the capture succeeded, false if it failed.
 */
function captureAndSaveVisibleTab(tabId, tab, attemptsSoFar, callback) {
  chrome.tabs.captureVisibleTab(null, {format: 'jpeg', quality: 2}, dataUri => {
    if (!tab.active) {
      // the user switched away pretty quickly, we're not sure which tab we captured
      callback(false);
      return;
    }
    if (!dataUri || typeof dataUri !== 'string') {
      if (attemptsSoFar++ < 5) {
        setTimeout(() => captureAndSaveVisibleTab(tabId, tab, attemptsSoFar, callback), 500);
      } else {
        console.log(`Giving up on capturing tab ${tabId}`);
        callback(false);
      }
    } else {
      chrome.storage.local.get('tabs').then(result => {
        const tabs = result.tabs;
        if (tabs) {
          const foundTab = tabs.find(t => t.id === tabId);
          if (foundTab) {
            foundTab.image = dataUri;
            chrome.storage.local.set({[`images-${tabId}`]: {url: foundTab.url, image: dataUri}});
          } else {
            console.log(`Tab with id ${tabId} missing after capturing image`);
          }
        }
        callback(true);
      });
    }
  });
}
