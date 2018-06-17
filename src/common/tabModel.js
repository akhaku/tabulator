import PropTypes from 'prop-types';

export class Tab {
  constructor(chromeTabObject, images) {
    this.favIcon = chromeTabObject.favIconUrl;
    this.id = chromeTabObject.id;
    this.pinned = chromeTabObject.pinned;
    this.title = chromeTabObject.title;
    this.url = chromeTabObject.url;
    this.windowId = chromeTabObject.windowId;
    this.image = getImageForTab(images, chromeTabObject.id, chromeTabObject.url);
  }
}

function getImageForTab(images, tabId, tabUrl) {
  if (!images[tabId]) {
    return null;
  } else if (tabUrl !== images[tabId].url) {
    return null;
  } else {
    return images[tabId].image;
  }
}

export const tabPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  image: PropTypes.string,
  pinned: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  windowId: PropTypes.number.isRequired,
});
