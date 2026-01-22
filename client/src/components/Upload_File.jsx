import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt, FaFilePdf } from 'react-icons/fa';

const Upload_File = ({ onFileSelect, selectedFile, lang }) => {
  
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);
 
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false 
  });

  
  const label = lang === 'ar' ? "2. سيرتك الذاتية (PDF)" : "2. Your Resume (PDF)";
  const dragText = lang === 'ar' ? "اسحب ملف الـ PDF هنا، أو اضغط للاختيار" : "Drag & drop PDF here, or click to select";

  return (
    <div className="mb-6">
      <label className="block text-xl font-bold mb-2 text-slate-700">
        {label}
      </label>
      
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-blue-400'}`}
      >
        <input {...getInputProps()} />
        
        {selectedFile ? (
          <div className="flex items-center justify-center text-green-600 gap-2">
            <FaFilePdf size={24} />
            
            <span className="font-semibold text-left" dir="ltr">{selectedFile.name}</span>
          </div>
        ) : (
          <div className="text-gray-400">
            <FaCloudUploadAlt size={40} className="mx-auto mb-2" />
            <p>{dragText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload_File;