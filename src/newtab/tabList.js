import PropTypes from 'prop-types';
import React from 'react';

import TabDisplay from 'src/newtab/tabDisplay';
import {tabPropType} from 'src/newtab/tabModel';

import './tabList.less';

export default function TabList({clickCallback, tabs}) {
  const tabDisplays = tabs.map(tab => (
    <TabDisplay tab={tab} clickCallback={clickCallback}/>
  ));
  return (
    <div className="Component-TabList">
      {tabDisplays}
    </div>
  );
}

TabList.propTypes = {
  clickCallback: PropTypes.func.isRequired,
  tabs: PropTypes.arrayOf(tabPropType).isRequired,
};
