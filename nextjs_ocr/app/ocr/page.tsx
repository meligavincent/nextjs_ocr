"use client"
import { DragEvent, useState } from "react";

export default function FileDrop() {
  const [isOver, setIsOver] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [extractedtext,setExtractedtext] = useState<String >(" ");

  // Define the event handlers
  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(false);

    // Fetch the files
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles(droppedFiles);

    // Use FileReader to read file content
    droppedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        console.log(reader.result);
      };

      reader.onerror = () => {
        console.error("There was an issue reading the file.");
      };

      reader.readAsDataURL(file);
      return reader;
    });
  };

  // Define the function to send files to the FastAPI server
  const handleSubmit = async () => {
    if (files.length === 0) {
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    const response = await fetch("http://127.0.0.1:8000/uploadfiles/", {
      method: "POST",
      body: formData,
   
    });

    if (response.ok) {
      const text = await response.text();

      setExtractedtext(text);
      console.log(text);
    } else {
      console.error("An error occurred while uploading files.");
    }
  };

  

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "200px",
        width: "300px",
        border: "1px dotted",
        backgroundColor: isOver ? "lightgray" : "white",
      }}
    >
      <div>Drag and drop some files here</div>
      <button onClick={handleSubmit}>Upload Files</button>

      <textarea defaultValue={extractedtext.toString()}/>
    </div>
  );
}