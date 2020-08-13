import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapPin,
  faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons';
import './index.css';

class SideBar extends Component {
  renderTags = () => {
    return this.props.tags.map((tag) => {
      return (
        <div
          className={tag.isActive ? 'side-item-active' : 'side-item'}
          key={tag.id}
          onClick={() => this.props.changeTagState(tag)}
        >
          <FontAwesomeIcon size="2x" className="item-icon" icon={faMapPin} />
          <span className="item-text">{tag.text}</span>
        </div>
      );
    });
  };

  render() {
    return (
      <nav className="sidebar">
        <div className="sidebar-side">
          <div className="logo">
            <div className="side-item">
              <span className="item-text">Karasic</span>
              <FontAwesomeIcon
                size="2x"
                className="item-icon"
                icon={faAngleDoubleRight}
              />
            </div>
          </div>
          {this.renderTags()}
        </div>
      </nav>
    );
  }
}

export default SideBar;
