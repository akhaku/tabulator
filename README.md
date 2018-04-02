# Tabulator
A tab management plugin [gettabulator.com](https://gettabulator.com)

## Current features
Tabulator overrides your new tab page with its own page. On this page, you can
- list all tabs in the current window with thumbnails
- allow filtering said list of tabs by tab title or url
- allow switching to a tab from said list of tabs
- allow closing tabs from said list of tabs

## Future features
Potential future features
- keyboard navigation of tabs, with enter to switch to currently selected tab and delete/backspace to close
- some sort of toast after closing a tab, with a quick link to re-open tab (is that even possible?)
- visual indication of pinned tabs
- maybe re-order tabs via drag and drop?

## Chrome permissions
Summary of Chrome permissions needed
- `<all_urls>`: [needed](https://developer.chrome.com/extensions/tabs#method-captureVisibleTab) to capture a screenshot of a tab
- `tabs`: [needed](https://developer.chrome.com/extensions/tabs#type-Tab) to access the title and url of all tabs

## Development setup
You will need a recent-ish version `npm` to develop Tabulator. I don't actually know what the minimum required version is.

Clone the project, `cd` into it, run `npm install`, and then `npm run build`.

Next, go to <chrome://extensions>, hit "load unpacked", and pick the `static` folder of the repository.

I also highly recommend updating the `build` script in `package.json`, replacing `production` with `development`. If you do that, you will also need to add the following to your `manifest.json`:
```
"content_security_policy": "script-src 'self' 'unsafe-eval'; object-src 'self'",
```
Just make sure you don't check those changes in.

When you make changes, `npm run build` to generate the changed files. For changes to the new tab page, refreshing that is sufficient, but for changes to the background page you'll need to either refresh the plugin, or refresh the background view from "inspect views" in <chrome://extensions>. Any changes to the manifest require an extension refresh, also from <chrome://extensions>.
