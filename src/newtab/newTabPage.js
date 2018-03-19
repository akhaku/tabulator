import React from 'react';

import * as api from 'src/common/api';
import TabList from 'src/newtab/tabList';

import './newTabPage.less';

export default class NewTabPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [],
    };
  }

  componentWillMount() {
    const tabs = api.getAllTabs();
    this.setState({tabs});
  }

  clickCallback = tabId => {
    api.navigateToTab(tabId);
  };

  render() {
    return (
      <div className="Component-NewTabPage">
        <h1>{'Tabulator'}</h1>
        <TabList clickCallback={api.navigateToTab} tabs={this.state.tabs}/>
      </div>
    );
  }
}
