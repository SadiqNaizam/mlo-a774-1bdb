import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UploadCloud, FileText, CheckCircle2, XCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

const PrescriptionUploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  console.log('PrescriptionUploadForm loaded');

  useEffect(() => {
    // Clean up the preview URL when the component unmounts or file changes
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleFileSelect = (selectedFile: File | null) => {
    if (selectedFile) {
      // Basic validation
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(selectedFile.type)) {
        setStatus('error');
        setErrorMessage('Invalid file type. Please upload a JPG, PNG, or PDF.');
        return;
      }
      
      setStatus('idle');
      setErrorMessage('');
      setFile(selectedFile);

      if (selectedFile.type.startsWith('image/')) {
        const previewUrl = URL.createObjectURL(selectedFile);
        setPreview(previewUrl);
      } else {
        setPreview(null); // No preview for non-image files like PDF
      }
    }
  };
  
  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      handleFileSelect(event.dataTransfer.files[0]);
      event.dataTransfer.clearData();
    }
  }, []);

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const onDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };
  
  const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleUpload = () => {
    if (!file) return;

    setStatus('uploading');
    setProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate upload completion
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      // Simulate a random success or failure for demonstration
      const isSuccess = Math.random() > 0.2; 
      setStatus(isSuccess ? 'success' : 'error');
      if(!isSuccess) {
          setErrorMessage('Upload failed. Please try again.');
      }
    }, 2500);
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    setStatus('idle');
    setProgress(0);
    setErrorMessage('');
    if(inputRef.current) {
        inputRef.current.value = "";
    }
  };

  const renderStatus = () => {
    switch (status) {
      case 'success':
        return (
          <Alert variant="default" className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Upload Successful!</AlertTitle>
            <AlertDescription className="text-green-700">
              Your prescription is pending verification. We will notify you upon approval.
            </AlertDescription>
          </Alert>
        );
      case 'error':
        return (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Upload Failed</AlertTitle>
            <AlertDescription>
              {errorMessage || 'An unknown error occurred. Please try again.'}
            </AlertDescription>
          </Alert>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-lg p-4 mx-auto">
      {!file && status !== 'success' && (
        <div
          className={cn(
            "flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
            isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400 bg-gray-50"
          )}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept="image/png, image/jpeg, application/pdf"
            onChange={(e) => handleFileSelect(e.target.files ? e.target.files[0] : null)}
          />
          <UploadCloud className="w-12 h-12 text-gray-500" />
          <p className="mt-4 text-lg text-gray-700">Drag & drop your prescription here</p>
          <p className="mt-1 text-sm text-gray-500">or click to browse</p>
          <p className="mt-2 text-xs text-gray-400">PNG, JPG, or PDF</p>
        </div>
      )}

      {file && status !== 'success' && (
        <div className="p-4 border rounded-lg">
          <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                {preview ? (
                  <img src={preview} alt="Prescription preview" className="w-20 h-20 object-cover rounded-md" />
                ) : (
                  <FileText className="w-16 h-16 text-gray-500" />
                )}
                <div>
                  <p className="font-medium text-sm truncate max-w-xs">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={clearFile} aria-label="Remove file">
                  <X className="h-5 w-5"/>
              </Button>
          </div>
          
          {status === 'idle' && (
             <Button onClick={handleUpload} className="w-full mt-4">
                Upload Prescription
             </Button>
          )}

          {status === 'uploading' && (
            <div className="mt-4">
              <Progress value={progress} className="w-full" />
              <p className="text-center text-sm mt-2 text-gray-600">{progress}%</p>
            </div>
          )}
        </div>
      )}
      
      <div className="mt-4">
        {renderStatus()}
      </div>

    </div>
  );
};

export default PrescriptionUploadForm;