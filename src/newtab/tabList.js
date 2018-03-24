import PropTypes from 'prop-types';
import React from 'react';

import {tabPropType} from 'src/common/tabModel';
import TabDisplay from 'src/newtab/tabDisplay';

import './tabList.less';

export default function TabList({clickCallback, tabs}) {
  const tabDisplays = tabs.map(tab => (
    <TabDisplay key={tab.id} tab={tab} clickCallback={clickCallback}/>
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
