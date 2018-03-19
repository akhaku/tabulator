import PropTypes from 'prop-types';
import React from 'react';

export default function TabDisplay({tab}) {
  return <div>{tab}</div>;
}

TabDisplay.propTypes = {
  tab: PropTypes.string.isRequired,
};
