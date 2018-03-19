import React from 'react';

import {tabPropType} from 'src/newtab/tabModel';

import './tabDisplay.less';

export default function TabDisplay({tab}) {
  return (
    <div className="Component-TabDisplay">
      <p className="Text-TabTitle">
        {tab.title}
      </p>
    </div>
  );
}

TabDisplay.propTypes = {
  tab: tabPropType,
};
