import PropTypes from 'prop-types';
import React from 'react';

import {tabPropType} from 'src/newtab/tabModel';

import './tabDisplay.less';

export default function TabDisplay({tab, clickCallback}) {
  return (
    <div onClick={() => clickCallback(tab.id)} className="Component-TabDisplay">
      <p className="Text-TabTitle">
        {tab.title}
      </p>
    </div>
  );
}

TabDisplay.propTypes = {
  clickCallback: PropTypes.func.isRequired,
  tab: tabPropType,
};
