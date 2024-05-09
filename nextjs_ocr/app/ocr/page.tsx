'use client'
import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import './styles.css';
import UploadArea from './components/upload_area';
import { RiUploadCloud2Line } from 'react-icons/ri';
import Image from 'next/image';
import * as path from 'path';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';


const Page: React.FC = () => {
  const [fileUrl, setfileUrl] = useState<string | null>(null);
  const [responseData, setResponseData] = useState<string | null>(null);
  const [fileExtension,setFileExtension] = useState<string|null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imagesExtension = ['.png','.jpg','.jpeg']
  const pdfExtenssions = ['.pdf','.PDF']
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
        'image/png': imagesExtension ,
        'text/html': ['.html', '.htm'],
        "application/pdf":pdfExtenssions
      },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const formData = new FormData();
        formData.append('files', acceptedFiles[0]);
        setfileUrl(URL.createObjectURL(acceptedFiles[0]));
        axios.post('http://localhost:8000/uploadfiles/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'accept': 'application/json',
          },
        })
          .then((response) => {
            if (response.data[0].file_path) {
              setfileUrl(response.data[0].file_path);
              setResponseData(response.data[0].extracted_text);
              setFileExtension(path.extname(fileUrl!));
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    
  });
  

  return (
    <div className='container'>

        <div className="wrapper">
          <header>
                File Upload
          </header>
          <form action="" {...getRootProps()}>
              <input {...getInputProps()} />
              <input type="file" className="file-input" hidden/>
              {fileUrl && (imagesExtension.includes(fileExtension!))? (
                <Image src={fileUrl} alt="Uploaded image" width={260} height={260}/>
            //   ) :fileUrl && (pdfExtenssions.includes(fileExtension!))?
            //   (
            //     <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">

            //           <div
            //               style={{
            //                   border: '1px solid rgba(0, 0, 0, 0.3)',
            //                   height: '750px',
            //               }}
            //           >
            //               <Viewer fileUrl={fileUrl} />
            //           </div>
            //   </Worker>
             
            
            // ) 
              ):(
                <div className="upload-placeholder">
                  <RiUploadCloud2Line className='upload-image' />
                  <p>Browse File to Upload</p>
                </div>
              )}
          </form>
        </div>

       {/* <UploadArea/> */}
      {responseData && (
        <div className='result'>
          <textarea>{responseData}</textarea>
          <button onClick={() => setResponseData(null)}>Clear</button>
        </div>
      )}
      
    </div>
  );
};

export default Page;
