import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Form } from 'react-bootstrap/';

class Post extends Component {
  state = {
    showModal: false,
    descr: '',
    title: '',
    textFieldValue: '',
    tempX: 0,
    tempY: 0,
  };

  handleClose = () =>
    this.setState({
      showModal: false,
    });

  handleSubmit = () => {
    let tag = {
      x: this.state.tempX,
      y: this.state.tempY,
      isActive: false,
      text: this.state.textFieldValue,
    };
    console.log(tag);
    if (!this.props.tags.length) {
      tag.id = 1;
      this.props.handnleTagCreation(tag);
      this.setState({ showModal: false });
    } else {
      tag.id = this.props.tags.length + 1;
      this.props.handnleTagCreation(tag);
      this.setState({ showModal: false });
    }
  };

  handleChange = (e) =>
    this.setState({
      textFieldValue: e.target.value,
    });

  handleClick = (e) => {
    this.setState({
      showModal: true,
      tempX: e.nativeEvent.offsetX,
      tempY: e.nativeEvent.offsetY,
    });
  };

  changeState = (tag) => {
    tag.isActive = !tag.isActive;
    this.props.handleChangingTag(tag);
  };

  renderTags = () => {
    return this.props.tags.map((tag) => {
      if (tag.isActive) {
        return (
          <div
            className="tag"
            key={tag.id}
            style={{ top: tag.y - 30, left: tag.x }}
            onClick={() => this.changeState(tag)}
          >
            <FontAwesomeIcon size="2x" icon={faMapPin} />
            <span className="tag-content">{tag.text}</span>
          </div>
        );
      } else {
        return (
          <div
            className="tag"
            key={tag.id}
            style={{ top: tag.y - 13, left: tag.x }}
            onClick={() => this.changeState(tag)}
          >
            <FontAwesomeIcon icon={faMapPin} />
          </div>
        );
      }
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
              src={this.props.file.preview}
              onClick={(e) => this.handleClick(e)}
            />
          </div>
          {this.renderTags()}
        </div>
        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Tag content</Modal.Title>
          </Modal.Header>
          <Modal.Body>What or who is it?</Modal.Body>
          <Form.Control
            type="text"
            placeholder="Input some text.."
            onChange={this.handleChange}
          />
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Post;
