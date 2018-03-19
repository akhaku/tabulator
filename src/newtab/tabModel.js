import PropTypes from 'prop-types';

export const tabPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
});
