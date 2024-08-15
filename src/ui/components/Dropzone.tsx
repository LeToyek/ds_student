// Dropzone.tsx
import React from 'react';
import { useDropzone, DropzoneOptions, FileWithPath } from 'react-dropzone';

interface DropzoneProps {
  onDrop: (acceptedFiles: FileWithPath[]) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({ onDrop }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false, // Set to true if you want to accept multiple files
  } as DropzoneOptions);

  return (
    <div {...getRootProps()} style={dropzoneStyles}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  );
};

// Simple inline styles for the dropzone area
const dropzoneStyles: React.CSSProperties = {
  border: '2px dashed #007bff',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

export default Dropzone;
