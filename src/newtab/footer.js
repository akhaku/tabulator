import React from 'react';

import './footer.less';

export default function Footer() {
  return (
    <div className="Container-Footer">
      <a
        className="Text-Report"
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
