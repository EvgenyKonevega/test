import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';

class Image extends Component {
  renderTags = () => {
    return this.props.tags.map((tag) => {
      return (
        <div
          className={tag.isActive ? 'tag active' : 'tag'}
          key={tag.id}
          style={{ top: tag.y - 11, left: tag.x + 1 }}
          onClick={() => this.props.changeTagState(tag)}
        >
          <FontAwesomeIcon icon={faMapPin} />
        </div>
      );
    });
  };

  render() {
    return (
      <div className="post">
        <div className="frame">
          <div className="picture">
            <img
              className="tags-field"
              alt=""
              src={this.props.fileURL}
              onClick={this.props.handleTagCreation}
            />
          </div>
          {this.renderTags()}
        </div>
      </div>
    );
  }
}

export default Image;
