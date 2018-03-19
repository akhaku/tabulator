import PropTypes from 'prop-types';
import React from 'react';

import TabDisplay from 'src/newtab/tabDisplay';

export default function TabList({tabs}) {
  const tabDisplays = tabs.map(tab => <TabDisplay tab={tab}/>);
  return (
    <div>
      {tabDisplays}
    </div>
  );
}

TabList.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
};
