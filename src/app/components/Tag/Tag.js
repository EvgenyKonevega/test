import React, { Component } from 'react';

class Tag extends Component {
  constructor(props) {
    this.state = {};
  }

  render() {
    const { x, y, id, text, isActive } = this.state;
    return (
      <div
        key={this.state.tag.id}
        className="tag"
        style={{ top: tag.y, left: tag.x }}
      ></div>
    );
  }
}

export default Tag;
