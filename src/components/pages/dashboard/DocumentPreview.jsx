// components/DocumentPreview.js
import React from "react";

const DocumentPreview = ({ document, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">Document Preview</h2>
        <div className="flex justify-center">
          <img
            src={document.file_url} 
            alt="Document"
            className="max-w-full max-h-96 object-contain"
          />
        </div>
        <div className="mt-4 text-center">
          <button
            onClick={onClose}
            className="bg-gray-400 px-4 py-2 rounded-lg text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentPreview;
