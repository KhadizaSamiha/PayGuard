import React, { useState } from "react";
import { useAuth } from "@/features/auth/useAuth";
import { uploadToImgBB, saveToDatabase } from "@/utils/apiUtils";
import FileInput from "./FileInput";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 

const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

const DocumentForm = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleFileUpload = async () => {
    if (!file) {
      toast.error("No file selected."); 
      return;
    }

    try {
      const imageUrl = await uploadToImgBB(file, imgbbApiKey);
      await saveToDatabase(user.id, imageUrl);
      localStorage.removeItem("isPaymentDone");
      toast.success("File uploaded successfully!"); 
      setTimeout(() => navigate("/home"), 1000);
    } catch (error) {
      console.error("Error during upload:", error);
      toast.error("Error uploading file."); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 p-4">
      <div className="bg-gray-600 rounded-lg shadow-lg p-6 max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">Upload Document</h2>
        <FileInput
          onFileSelect={setFile}
          accept=".pdf, .jpg, .png"
          file={file}
        />
        <button
          onClick={handleFileUpload}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition"
        >
          Upload Document
        </button>
      </div>
    </div>
  );
};

export default DocumentForm;
