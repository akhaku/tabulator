import PropTypes from 'prop-types';

export class Tab {
  constructor(chromeTabObject, images) {
    this.title = chromeTabObject.title;
    this.favIcon = chromeTabObject.favIconUrl;
    this.id = chromeTabObject.id;
    this.image = images[chromeTabObject.id] || null;
  }
}

export const tabPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
});
