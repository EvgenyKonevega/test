import React, { useState } from 'react';
// import DragAndDrop from '../DragAndDrop/DragAndDrop';
import { useDropzone } from 'react-dropzone';
import { Modal, Button, Form } from 'react-bootstrap/';
import Image from '../../components/Image/Image';
import SideBar from '../../components/SideBar';
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
  };

  const deleteTag = (tag) => {
    const newTags = tags.filter((o) => o.id !== tag.id);
    setTags(newTags);
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
    setTempTag({});
    setTextFieldValue('');
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
      <SideBar
        tags={tags}
        changeTagState={changeTagState}
        deleteTag={deleteTag}
      />
      <div className="content">
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <Image
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
