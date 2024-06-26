'use client'
import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { RiUploadCloud2Line } from 'react-icons/ri';
import './style.css';
function UploadArea() {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [responseData, setResponseData] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
  
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      accept: {
          'image/png': ['.png'],
          'text/html': ['.html', '.htm'],
        },
      onDrop: (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
          const formData = new FormData();
          formData.append('files', acceptedFiles[0]);
          setImageUrl(URL.createObjectURL(acceptedFiles[0]));
          axios.post('http://localhost:8000/uploadfiles/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'accept': 'application/json',
            },
          })
            .then((response) => {
              if (response.data[0].file_path) {
                setImageUrl(response.data[0].file_path);
                setResponseData(response.data[0].extracted_text);
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }
      },
    });
    return (
        <div className="wrapper">
            <header>
                File Upload
            </header>
            <form action="" {...getRootProps()}>
            <input {...getInputProps()} />
            <input type="file" className="file-input" hidden/>
            <RiUploadCloud2Line className='upload-image' />
            <p>Browse File to Upload</p>
        </form>
        </div>
    );
}

export default UploadArea;