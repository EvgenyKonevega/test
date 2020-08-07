import React, { Component } from 'react';
import './index.css';

class DragAndDrop extends Component {
  constructor(props) {
    super(props);
    this.state = { drag: false };
  }
  dragCounter = 0;

  handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({ drag: true });
    }
  };

  handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter--;
    if (this.dragCounter === 0) {
      this.setState({ drag: false });
    }
  };

  handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ drag: false });
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.props.handleDrop(e.dataTransfer.files);
      e.dataTransfer.clearData();
      this.dragCounter = 0;
    }
  };

  render() {
    return (
      <div
        className="drop-area"
        onDragEnter={(e) => this.handleDragIn(e)}
        onDragLeave={(e) => this.handleDragOut(e)}
        onDragOver={(e) => this.handleDrag(e)}
        onDrop={(e) => this.handleDrop(e)}
      >
        {this.state.drag ? (
          <div className="hover">
            <div className="drop-message">
              <span>Drop here</span>
            </div>
          </div>
        ) : (
          this.props.file && (
            <div className="info">
              <span>supported formats are</span>
            </div>
          )
        )}

        {this.props.children}
      </div>
    );
  }
}

export default DragAndDrop;
