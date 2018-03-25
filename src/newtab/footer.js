import React from 'react';

import './footer.less';

export default function Footer() {
  return (
    <div className="Container-Footer">
      <br/>
      <a
        className="Text-Link"
        href="https://gettabulator.com"
        target="_blank"
      >
        {'gettabulator.com'}
      </a>
      {'|'}
      <a
        className="Text-Link"
        href="https://github.com/akhaku/tabulator/issues/new"
        target="_blank"
      >
        {'Report an issue'}
      </a>
      <br/>
      <br/>
      <br/>
    </div>
  );
}
