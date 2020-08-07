import React, { Component } from 'react';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = { tags: props.tags };
  }

  handleClick = (e) => {
    if (!this.props.tags.lenght) {
      this.props.handnleTagCreation({
        id: 1,
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
      });
    } else {
      this.props.handnleTagCreation({
        id: this.state.tags.lenght + 1,
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
      });
    }
  };

  renderTags() {
    return this.props.tags.map((tag) => {
      return <div className="tag" style={{ top: tag.y, left: tag.x }}></div>;
    });
  }

  render() {
    const tags = this.props.tags;

    return (
      <div className="post">
        <div className="frame" onClick={(e) => this.handleClick(e)}>
          <div className="picture">
            <img className="tags-field" alt="" src={this.props.file.preview} />
          </div>
          {this.renderTags()}
          {/* {this.props.tags.map((tag) => {
            <div className="tag" key={tag.id}>
              <img src={faMapPin} alt="" style={{ top: tag.y, left: tag.x }} />
            </div>;
          })} */}
          {/* {tags.forEach((tag) => {
            <div className="tag" style={{ top: tag.y, left: tag.x }}></div>;
          })} */}
        </div>
      </div>
    );
  }
}

export default Post;
