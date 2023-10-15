import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import classes from './UploadCard.module.css';
import { BASE_URL } from '../../util/connection';

export function UploadCardDropzone(props) {
  const {disable, lectureName, courseName, collegeName, topicName} = props.props;
  console.log('disable', disable)
  const [selectedFile, setSelectedFile] = useState(null);
  const inputRef = useRef(null);

  const onDrop = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const uploadFile = async () => {
    if (!selectedFile) {
      alert('Please select a file before submitting!');
      return;
    }

    const formData = new FormData();
    formData.append('lecture', selectedFile);
    formData.append('course_name', courseName);
    formData.append('college_name', collegeName);
    formData.append('topic_name', topicName);
    formData.append('lecture_name', lectureName);

    const value = await axios.post(`${BASE_URL}/add-file`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
      },
    });

    console.log(value);
  };

  const handleButtonClick = () => {
    // Trigger a click on the hidden input element
    inputRef.current.click();
  };

  return (
    <div className={classes.buttons}>
      <input
        type="file"
        ref={inputRef}
        accept="application/pdf"
        onChange={onDrop}
        style={{ display: 'none' }}
      />
      <Button variant="outlined" onClick={handleButtonClick} disabled={disable}>
        Upload pdf file
      </Button>
      <Button variant="outlined" onClick={uploadFile} disabled={disable}>
        Submit
      </Button>
    </div>
  );
}
