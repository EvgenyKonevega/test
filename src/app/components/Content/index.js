import React, { useState } from 'react';
// import DragAndDrop from '../DragAndDrop/DragAndDrop';
import { useDropzone } from 'react-dropzone';
import { Modal, Button, Form } from 'react-bootstrap/';
import Post from './Post';
import SideBar from '../SideBar';
import './index.css';

const Content = (props) => {
  const [fileURL, setFile] = useState('');
  const [tags, setTags] = useState([]);
  const [isModalOpen, setModalState] = useState(false);
  const [textFieldValue, setTextFieldValue] = useState('');
  const [tempTag, setTempTag] = useState({});
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setTags([]);
      setFile(URL.createObjectURL(acceptedFiles[0]));
    },
  });

  // const handleChangingTag = (tag) => {
  //   const newTags = tags.map((o) => {
  //     if (o.id === tag.id) {
  //       return tag;
  //     }
  //     return o;
  //   });
  //   setTags(newTags);
  // };

  const changeTagState = (tag) => {
    tag.isActive = !tag.isActive;
    const newTags = tags.map((o) => {
      if (o.id === tag.id) {
        return tag;
      } else {
        return { ...o, isActive: false };
      }
    });
    setTags(newTags);
    // handleChangingTag(tag);
  };

  const handleCloseModal = () => {
    setModalState(false);
  };

  const handleTagCreation = (e) => {
    setTempTag({
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
      isActive: false,
      id: tags.length + 1,
    });
    setModalState(true);
  };

  const submitTagCreation = () => {
    let tagList = tags;
    tagList.push({ ...tempTag, text: textFieldValue });
    setTags(tagList);
    setModalState(false);
  };

  const handleChangeTagText = (e) => {
    setTextFieldValue(e.target.value);
  };

  const renderModal = () => {
    return (
      <Modal show={isModalOpen} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Tag content</Modal.Title>
        </Modal.Header>
        <Modal.Body>What or who is it?</Modal.Body>
        <Form.Control
          type="text"
          placeholder="Input some text.."
          onChange={handleChangeTagText}
        />
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={submitTagCreation}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div className="page-container">
      <SideBar tags={tags} changeTagState={changeTagState} />
      <div className="content">
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <Post
          fileURL={fileURL}
          tags={tags}
          handleTagCreation={handleTagCreation}
          changeTagState={changeTagState}
        />
      </div>
      {renderModal()}
    </div>
  );
};

export default Content;
