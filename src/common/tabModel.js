import PropTypes from 'prop-types';

export class Tab {
  constructor(chromeTabObject, images) {
    this.favIcon = chromeTabObject.favIconUrl;
    this.id = chromeTabObject.id;
    this.title = chromeTabObject.title;
    this.url = chromeTabObject.url;
    this.windowId = chromeTabObject.windowId;
    this.image = images[chromeTabObject.id] || null;
  }
}

export const tabPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  windowId: PropTypes.number.isRequired,
});
