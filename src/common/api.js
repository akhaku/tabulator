/* globals console,chrome */

/* Mostly a wrapper around Chrome extension APIs */

/**
 * Exposes the background page tab store to the newtab page.
 */
export async function getAllTabs() {
  return (await chrome.storage.local.get('tabs')).tabs;
}

export function fireMessage(messageType, messageValue) {
  chrome.runtime.sendMessage({type: messageType, value: messageValue}).catch(error => {
    if (error.message.includes('Receiving end does not exist')) {
      console.debug(`No listener for message ${messageType} - this is normal if no tab is open`);
    } else {
      console.error(`Failed to send message ${messageType}:`, error);
    }
  });
}

/**
 * Returns a Promise for the current window ID.
 */
export function getCurrentWindowId() {
  return new Promise(resolve => {
    chrome.windows.getCurrent({populate: false}, w => {
      resolve(w.id);
    });
  });
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
