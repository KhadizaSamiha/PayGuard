import React from "react";

const FileInput = ({ onFileSelect, accept }) => {
  return (
    <input
      type="file"
      accept={accept}
      onChange={(e) => onFileSelect(e.target.files[0])}
    />
  );
};

export default FileInput;
