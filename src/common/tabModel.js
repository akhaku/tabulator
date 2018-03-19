import PropTypes from 'prop-types';

export class Tab {
  constructor(chromeTabObject) {
    this.title = chromeTabObject.title;
    this.favIcon = chromeTabObject.favIconUrl;
    this.id = chromeTabObject.id;
  }
}

export const tabPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
});
