# Tabulator
A tab management plugin

Tabulator overrides your new tab page with its own page. On this page, you can:
- list all tabs in the current window with thumbnails
- allow filtering said list of tabs by tab title or url
- allow switching to a tab from said list of tabs
- allow closing tabs from said list of tabs

Potential future features:
- keyboard navigation of tabs, with enter to switch to currently selected tab and delete/backspace to close
- some sort of toast after closing a tab, with a quick link to re-open tab (is that even possible?)
- visual indication of pinned tabs
- maybe re-order tabs via drag and drop?

Summary of Chrome permissions needed:
- `<all_urls>`: [needed](https://developer.chrome.com/extensions/tabs#method-captureVisibleTab) to capture a screenshot of a tab
- `tabs`: [needed](https://developer.chrome.com/extensions/tabs#type-Tab) to access the title and url of all tabs
