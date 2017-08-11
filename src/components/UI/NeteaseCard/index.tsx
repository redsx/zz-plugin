import React, { Component } from 'react';
import IconButton from '../Button/IconButton';

export default class NeteaseCard extends Component<any, any> {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="NeteaseCard">
        <div className="NeteaseCard-img-container">
          <img
            className="NeteaseCard-img"
            src="http://p1.music.126.net/xmYUW7yYS02Tc0McsGdKWA==/18345351510075909.jpg"
          />
        </div>
        <div className="NeteaseCard-content">
            <div className="NeteaseCard-info">
              <h2 className="NeteaseCard-h2">floower dance</h2>
              <p>NeteaseCard</p>
            </div>
            <div className="NeteaseCard-ctrl">
              <IconButton type="icon-shoucang-copy"/>
              <IconButton type="icon-prev"/>
              <IconButton type="icon-cplay1" className="NeteaseCard-play"/>
              <IconButton type="icon-prev-copy"/>
              <IconButton type="icon-bofangqi_shouyegeci_"/>
            </div>
        </div>
      </div>
    );
  }
}