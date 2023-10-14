import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import classes from './UploadCard.module.css'
import { Button } from '@mui/material'

export function UploadCardDropzone(props) {
  const disabled = props.disable;
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result
        console.log(binaryStr)
      }
      reader.readAsArrayBuffer(file)
    })
    
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop, accept: {'application/pdf': []}, maxFiles: 1})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div className={classes.upload_btn}>
        <div className={classes.upload_btn_content}>
        Enter pdf file
        </div>
      </div>

      {/* <div>Drag 'n' drop some files here, or click to select files</div> */}
    </div>
  )
}