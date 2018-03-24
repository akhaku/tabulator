/* globals chrome,console,setTimeout,window */
import * as api from 'src/common/api';
import * as messages from 'src/common/messages';
import {Tab} from 'src/common/tabModel';

window.images = {};
window.tabs = [];

fetchTabs(() => {});

chrome.runtime.onMessage.addListener((message, unusedSender, unusedSendResponse) => {
  switch (message.type) {
    case messages.GO_TO_TAB:
      chrome.tabs.update(parseInt(message.value), {active: true});
      break;
    default:
      console.warn(`Background page encountered unhandled message: ${message.type}`);
      break;
  }
});

chrome.tabs.onActiveChanged.addListener(tabId => {
  chrome.tabs.get(tabId, tab => {
    captureAndSaveVisibleTab(tabId, tab, 0, () => {
      // we could probably optimize this if needed
      fetchTabs(() => api.fireMessage(messages.TAB_IMAGE_CAPTURED));
    });
  });
});

/**
 * Fetches all the tabs into a list of tab objects. Fires the callback after setting the
 * tabs.
 */
function fetchTabs(callback) {
  chrome.tabs.query({}, tabs => {
    window.tabs = tabs.filter(t => t.url.indexOf('http') === 0)
      .map(t => new Tab(t, window.images));
    callback();
  });
}

/**
 * Captures the visible tab as an image and stores it in memory. Calls the callback with
 * true if the capture succeeded, false if it failed.
 */
function captureAndSaveVisibleTab(tabId, tab, attemptsSoFar, callback) {
  // fail fast if we already switched away
  if (!tab.active || tab.url.indexOf('http') !== 0) {
    callback(false);
    return;
  }
  chrome.tabs.captureVisibleTab(null, {format: 'jpeg', quality: 5}, dataUri => {
    if (!dataUri || typeof dataUri !== 'string') {
      if (attemptsSoFar++ < 5) {
        setTimeout(() => captureAndSaveVisibleTab(tabId, tab, attemptsSoFar), 500);
      } else {
        console.log(`Giving up on capturing tab ${tabId}`);
        callback(false);
      }
    } else {
      const foundTab = window.tabs.find(t => t.id === tabId);
      if (foundTab) {
        foundTab.image = dataUri;
        window.images[tabId] = dataUri;
        // TODO update tab image and other stuff on navigation
        // TODO deal with tabs being closed (eg remove image, tab object)
        // TODO deal with tabs being moved around
      } else {
        console.log(`Tab with id ${tabId} missing after capturing image`);
      }
      callback(true);
    }
  });
}
