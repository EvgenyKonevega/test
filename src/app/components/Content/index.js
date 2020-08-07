import React, { useEffect, useState } from 'react';
// import DragAndDrop from '../DragAndDrop/DragAndDrop';
import { useDropzone } from 'react-dropzone';
import Post from './Post';
import './index.css';

const Content = (props) => {
  const [file, setFile] = useState({});
  const [tags, setTags] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
      setTags([]);
      setFile(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      );
    },
  });

  const handnleTagCreation = (tag) => {
    let tagList = tags;
    tagList.push(tag);
    setTags(tagList);
  };

  const handleChangingTag = (tag) => {
    let tagList = tags;
    tagList.map((o) => {
      if (o.id === tag.id) {
        return tag;
      }
      return o;
    });
    setTags(tagList);
  };

  useEffect(
    () => () => {
      URL.revokeObjectURL(file.preview);
    },
    [file, tags]
  );

  return (
    <div className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <Post
        file={file}
        tags={tags}
        handleChangingTag={handleChangingTag}
        handnleTagCreation={handnleTagCreation}
      />
    </div>
  );
};

export default Content;
