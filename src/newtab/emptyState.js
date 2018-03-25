import PropTypes from 'prop-types';
import React from 'react';

import './emptyState.less';

export default function EmptyState({filtered}) {
  const message = filtered ? 'No results' : 'No tabs';
  return <p className="Component-EmptyState">{message}</p>;
}

EmptyState.propTypes = {
  filtered: PropTypes.bool.isRequired,
};
