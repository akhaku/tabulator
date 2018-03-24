/* globals console,chrome */

/* Mostly a wrapper around Chrome extension APIs */

/**
 * Exposes the background page tab store to the newtab page.
 */
export function getAllTabs() {
  return chrome.extension.getBackgroundPage().tabs;
}

export function fireMessage(messageType, messageValue) {
  chrome.runtime.sendMessage({type: messageType, value: messageValue});
}

export function attachMessageListeners(messageNameToCallback) {
  chrome.runtime.onMessage.addListener((message, unusedSender, unusedSendResponse) => {
    if (messageNameToCallback[message.type]) {
      messageNameToCallback[message.type]();
    } else {
      console.warn(`New tab page encountered unhandled message: ${message.type}`);
    }
  });
}
