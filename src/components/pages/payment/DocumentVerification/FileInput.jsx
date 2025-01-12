import React from "react";

const FileInput = ({ onFileSelect, accept, file }) => {
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    onFileSelect(selectedFile);
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center relative hover:border-blue-500 transition">
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      {file ? (
        <div>
          {file.type.startsWith("image/") ? (
            <img
              src={URL.createObjectURL(file)}
              alt="Selected file preview"
              className="w-32 h-32 mx-auto rounded-md object-cover"
            />
          ) : (
            <p className="text-gray-500 truncate">{file.name}</p>
          )}
        </div>
      ) : (
        <p className="text-gray-400">Drag and drop your file here or click to upload</p>
      )}
    </div>
  );
};

export default FileInput;
