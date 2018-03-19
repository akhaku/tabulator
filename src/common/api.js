/* globals chrome,console */

/* Mostly a wrapper around Chrome extension APIs */
const GO_TO_TAB = 'goToTab';

/**
 * Attaches message listeners for cross-page communication.
 */
export function attachListeners() {
  chrome.runtime.onMessage.addListener((message, unusedSender, unusedSendResponse) => {
    switch (message.type) {
      case GO_TO_TAB:
        chrome.tabs.update(parseInt(message.value), {active: true});
        break;
      default:
        console.warn(`Encountered unhandled message: ${message.type}`);
        break;
    }
  });
}

/**
 * Exposes the background page tab store to the newtab page.
 */
export function getAllTabs() {
  return chrome.extension.getBackgroundPage().tabs;
}

/**
 * Allows the background page to fetch tabs.
 */
export function fetchTabs(callback) {
  chrome.tabs.query({}, callback);
}

export function navigateToTab(tabId) {
  chrome.runtime.sendMessage({type: GO_TO_TAB, value: tabId});
}
