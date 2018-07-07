import PropTypes from 'prop-types';
import React from 'react';
import {SortableContainer} from 'react-sortable-hoc';

import {tabPropType} from 'src/common/tabModel';
import TabDisplay from 'src/newtab/tabDisplay';

import './tabList.less';

export default function TabList({clickCallback, closeCallback, onSortEndCallback, tabs}) {
  const tbs = tabs.map((tab, index) => (
    <TabDisplay
      disabled={tab.pinned}
      key={tab.id}
      index={index}
      tab={tab}
      clickCallback={clickCallback}
      closeCallback={closeCallback}
    />
  ));
  const Container = SortableContainer(({tabDisplays}) => (
    <div className="Component-TabList">
      {tabDisplays}
    </div>
  ));
  return (
    <Container
      axis="xy"
      pressDelay={200}
      tabDisplays={tbs}
      onSortEnd={onSortEndCallback}
    />
  );
}

TabList.propTypes = {
  clickCallback: PropTypes.func.isRequired,
  closeCallback: PropTypes.func.isRequired,
  onSortEndCallback: PropTypes.func.isRequired,
  tabs: PropTypes.arrayOf(tabPropType).isRequired,
};
