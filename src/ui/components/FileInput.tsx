// FileInput.tsx
import React, { ChangeEvent } from 'react';

interface FileInputProps {
  onFileChange: (file: File | null) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onFileChange }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onFileChange(event.target.files[0] || null);
    }
  };

  return (
    <div>
      <input 
        type="file" 
        onChange={handleChange} 
      />
    </div>
  );
};

export default FileInput;
