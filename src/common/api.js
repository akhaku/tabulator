/* globals chrome */
import * as messages from 'src/common/messages';

/* Mostly a wrapper around Chrome extension APIs */

/**
 * Exposes the background page tab store to the newtab page.
 */
export function getAllTabs() {
  return chrome.extension.getBackgroundPage().tabs;
}

export function navigateToTab(tabId) {
  chrome.runtime.sendMessage({type: messages.GO_TO_TAB, value: tabId});
}
