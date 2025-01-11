import React, { useState } from "react";
import { useAuth } from "@/features/auth/useAuth";
import { uploadToImgBB, saveToDatabase } from "@/utils/apiUtils";
import FileInput from "./DocumentVerification/FileInput";

const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

const DocumentForm = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const { user } = useAuth();

  const handleFileUpload = async () => {
    if (!file) {
      setStatus("No file selected.");
      return;
    }

    try {
      const imageUrl = await uploadToImgBB(file, imgbbApiKey); // Upload to ImgBB
      await saveToDatabase(user.id, imageUrl); // Save file URL to MongoDB
      setStatus("File uploaded successfully!");
    } catch (error) {
      console.error("Error during upload:", error);
      setStatus("Error uploading file.");
    }
  };

  return (
    <div>
      <FileInput onFileSelect={setFile} accept=".pdf, .jpg, .png" />
      <button onClick={handleFileUpload}>Upload Document</button>
      <p>{status}</p>
    </div>
  );
};

export default DocumentForm;
