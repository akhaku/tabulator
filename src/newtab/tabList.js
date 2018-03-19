import PropTypes from 'prop-types';
import React from 'react';

import TabDisplay from 'src/newtab/tabDisplay';
import {tabPropType} from 'src/newtab/tabModel';

import './tabList.less';

export default function TabList({tabs}) {
  const tabDisplays = tabs.map(tab => <TabDisplay tab={tab}/>);
  return (
    <div className="Component-TabList">
      {tabDisplays}
    </div>
  );
}

TabList.propTypes = {
  tabs: PropTypes.arrayOf(tabPropType).isRequired,
};
