import PropTypes from 'prop-types';
import React from 'react';

import {tabPropType} from 'src/common/tabModel';

import './tabDisplay.less';

export default function TabDisplay({tab, clickCallback}) {
  const image = tab.image ? (
    <img src={tab.image} style={{width: '200px', height: '100px'}}/>
  ) : null;
  return (
    <div onClick={() => clickCallback(tab.id)} className="Component-TabDisplay">
      <p className="Text-TabTitle" title={tab.title}>
        {tab.title}
      </p>
      {image}
    </div>
  );
}

TabDisplay.propTypes = {
  clickCallback: PropTypes.func.isRequired,
  tab: tabPropType,
};
