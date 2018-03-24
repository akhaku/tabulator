import React from 'react';

import * as api from 'src/common/api';
import * as messages from 'src/common/messages';
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
    const messageNameToCallback = {};
    messageNameToCallback[messages.TAB_IMAGE_CAPTURED] = this.refreshTabs;
    api.attachMessageListeners(messageNameToCallback);
    this.refreshTabs();
  }

  refreshTabs = () => {
    api.getCurrentWindowId().then(id => {
      const tabs = api.getAllTabs().filter(t => t.windowId === id);
      this.setState({tabs});
    });
  };

  render() {
    return (
      <div className="Component-NewTabPage">
        <h1>{'Tabulator'}</h1>
        <TabList
          clickCallback={tabId => api.fireMessage(messages.GO_TO_TAB, tabId)}
          tabs={this.state.tabs}
        />
      </div>
    );
  }
}
