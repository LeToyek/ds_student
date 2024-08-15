import { useState } from 'react';
import './App.css'
import FileInput from './ui/components/FileInput';

function App() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
  };
  const handleUpload = async () => {
    if (!file) {
      alert('No file selected');
      return;
    }
    console.log(`fileee`);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/regression/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('File uploaded successfully:', data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  return (
    <>
      <FileInput onFileChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file}>
        Upload File
      </button>
    </>
  )
}

export default App
