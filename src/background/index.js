/* globals window */
import * as api from 'src/common/api';
import {Tab} from 'src/common/tabModel';

window.tabs = [];

fetchTabs();
api.attachListeners();

function fetchTabs() {
  api.fetchTabs(tabs => {
    window.tabs = tabs.filter(t => t.url.indexOf('http' === 0)).map(t => new Tab(t));
  });
}
