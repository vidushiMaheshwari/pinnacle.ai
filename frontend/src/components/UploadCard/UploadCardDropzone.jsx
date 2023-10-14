import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import classes from "./UploadCard.module.css";
import { BASE_URL } from "../../util/connection";
import axios from "axios";

export function UploadCardDropzone(props) {
  const disabled = props.disable;
  const [selectedFile, setSelectedFile] = useState(null);
  
  const onDrop = useCallback((acceptedFiles) => {
    // Only considering the first file even if multiple files were dropped
    setSelectedFile(acceptedFiles[0]);
    
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "application/pdf",
    maxFiles: 1,
  });

  const uploadFile = async () => {
    if (!selectedFile) {
      alert("Please select a file before submitting!");
      return;
    }

    // Creating a new FormData instance
    const formData = new FormData();

    // Appending the file and any additional data
    formData.append('lecture', selectedFile);
    formData.append('course_name', 'Example Course');
    formData.append('college_name', 'Example College');
    formData.append('topic_name', 'Example Topic');
    formData.append('lecture_name', 'Example Lecture');


    // Fetch request to the backend
    const value = await axios.post(`${BASE_URL}/add-file`,
      formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*'
        }
      }
    )

    console.log(value)
  };


  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div className={classes.upload_btn}>
        <div className={classes.upload_btn_content}>Enter pdf file</div>
      </div>

      <div onClick={uploadFile}>
        vidushi
      </div>

      {/* <div>Drag 'n' drop some files here, or click to select files</div> */}
    </div>
  );
}
