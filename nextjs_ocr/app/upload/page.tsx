'use client'
import React, { useCallback, useRef, useState ,useEffect} from 'react';
import { useDropzone } from 'react-dropzone';
import './styles.css';
import axios from 'axios';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive'
import Head from './components/head';


interface IFile extends File {
  preview: string;
  file_path: string;
  filename: string;
}
interface ImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  // add any other props you want to pass to the <Image> component
}
const ImageWithButtons = ({ src, alt, ...props }: ImageProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className='image-wrapper'
    >
      <Image src={src} alt={alt} {...props} />
      {isHovered && (
        <div className='image-buttons'>
          < input type="checkbox" />
          <button>Delete</button>
        </div>
      )}
    </div>
  )
}





const FileGallery = ({ files, onRemove }: { files: IFile[], onRemove: (index: number) => void }) => {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' })
  const isMediumScreen = useMediaQuery({ query: '(max-width: 1024px)' })

  const imageWidth = isSmallScreen ? 300 : isMediumScreen ? 500 : 800
  const imageHeight = isSmallScreen ? 200 : isMediumScreen ? 300 : 400
  const thumbs = files.map((file, index) => (
    <div className='image-card' key={file.name}>      
        
        <ImageWithButtons src={file.file_path} alt = {file.filename}
          width={imageWidth}
          height={imageHeight}/>
    </div>
  ));

  return (
    <div  className='image-gallery'>
      {thumbs}
    </div>
  );
}

const Dropzone = ({ onDrop }: { onDrop: (files: IFile[]) => void }) => {
  const [files, setFiles] = useState<IFile[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const { getRootProps, getInputProps } = useDropzone({ onDrop,  accept: {
    'image/png': ['.png'],
    'text/html': ['.html', '.htm'],
  } });

  useEffect(() => {
    onDrop(files);
  }, []);

  return (
    <div {...getRootProps()} style={{ border: '1px solid black', padding: 20 }}>
      <input {...getInputProps()} ref={inputRef} />
      <p>Drag and drop some files here, or click to select files</p>
    </div>
  );
}

export default function Home() {
  const [galleryFiles, setGalleryFiles] = useState<IFile[]>([]);
  

  useEffect(() => {
    const getFiles = async () => {
      try {
        const response = await axios.get<IFile[]>('http://127.0.0.1:8000/getfiles/', {
          headers: {
            'accept': 'application/json'
          }
        });

        if (response.status === 200) {
          setGalleryFiles(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getFiles();
  }, []);
 

  // const handleDrop = useCallback((files: IFile[]) => {
  //   setGalleryFiles(prevFiles => [...prevFiles, ...files]);
  // }, []);

  const handleRemove = useCallback((index: number) => {
    setGalleryFiles(prevFiles => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
  }, []);

  return (
    <div className='upload-page'>
      <Head/>
      
      <hr width="100%" size="2"></hr>
      
      <h2>Drag and drop files here</h2>
      {/* <Dropzone onDrop={handleDrop} /> */}
      <h1>File Gallery</h1>
      <FileGallery files={galleryFiles} onRemove={handleRemove} />
      
      
    </div>
  );
}