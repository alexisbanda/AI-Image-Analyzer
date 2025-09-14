
import React from 'react';

interface ImageUploaderProps {
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAnalyzeClick: () => void;
  previewUrl: string | null;
  isFileSelected: boolean;
  isLoading: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onFileChange, onAnalyzeClick, previewUrl, isFileSelected, isLoading }) => {
  return (
    <div className="w-full flex flex-col items-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700 shadow-2xl">
      <div className="w-full h-64 sm:h-80 bg-slate-900 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-600 mb-6 overflow-hidden">
        {previewUrl ? (
          <img src={previewUrl} alt="Selected preview" className="w-full h-full object-contain" />
        ) : (
          <div className="text-center text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-2">Image preview will appear here</p>
          </div>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <label htmlFor="file-upload" className="flex-1 cursor-pointer inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-sky-100 bg-sky-600 hover:bg-sky-700 transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          {isFileSelected ? 'Change Image' : 'Select Image'}
        </label>
        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={onFileChange} accept="image/png, image/jpeg, image/webp" />

        <button
          onClick={onAnalyzeClick}
          disabled={!isFileSelected || isLoading}
          className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          {isLoading ? 'Analyzing...' : 'Analyze Image'}
        </button>
      </div>
    </div>
  );
};

export default ImageUploader;
