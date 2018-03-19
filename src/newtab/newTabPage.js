import React from 'react';

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
    this.setState({tabs: [{title: 'tab1'}, {title: 'tab2'}, {title: 'tab3'}, {title: 'tab4'}]});
  }

  clickCallback = tabId => {
    console.log(`clicked tab with ID ${tabId}`);
  };

  render() {
    return (
      <div className="Component-NewTabPage">
        <h1>{'Tabulator'}</h1>
        <TabList clickCallback={this.clickCallback} tabs={this.state.tabs}/>
      </div>
    );
  }
}
