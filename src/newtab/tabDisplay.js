import PropTypes from 'prop-types';
import React from 'react';
import {SortableElement} from 'react-sortable-hoc';

import {tabPropType} from 'src/common/tabModel';

import './tabDisplay.less';

const urlReplaceRegex = /^https?\:\/\/(www.)?/;

const TabDisplay = ({tab, clickCallback, closeCallback}) => {
  const favIcon = tab.favIcon ? <img className="Image-FavIcon" src={tab.favIcon}/> : null;
  const image = tab.image ? (
    <img className="Image-TabThumbnail" src={tab.image}/>
  ) : null;
  const pinIcon = !tab.pinned ? null
    : <img className="Icon-Pin" src="images/pin.png" title="Pinned" alt="pinned"/>;
  return (
    <div className="Component-TabDisplay">
      <p onClick={() => clickCallback(tab.id)} className="Text-Overlay">
        {'Go to tab'}
      </p>
      <a
        className="Icon-Close"
        href="#"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          closeCallback(tab.id);
        }}
        title={'Close tab'}
      >
        <svg viewBox="0 0 12 12" version="1.1">
          <line x1="1" y1="10" x2="10" y2="1" strokeWidth="1"/>
          <line x1="1" y1="1" x2="10" y2="10" strokeWidth="1"/>
        </svg>
      </a>
      {pinIcon}
      <div className="Container-Text">
        <div className="Text-TabTitle" title={tab.title}>{favIcon}{tab.title}</div>
        <div className="Text-TabUrl" title={tab.url}>
          {tab.url.replace(urlReplaceRegex, '')}
        </div>
      </div>
      {image}
    </div>
  );
};

TabDisplay.propTypes = {
  clickCallback: PropTypes.func.isRequired,
  closeCallback: PropTypes.func.isRequired,
  tab: tabPropType,
};

const wrappedTabDisplay = SortableElement(TabDisplay);
export default wrappedTabDisplay;
