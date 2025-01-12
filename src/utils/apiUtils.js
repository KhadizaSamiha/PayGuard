// src/utils/apiUtils.js
import axios from "axios";

export const uploadToImgBB = async (file, apiKey) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await axios.post("https://api.imgbb.com/1/upload", formData, {
    params: { key: apiKey },
  });

  return response.data.data.url; // Return the image URL
};

export const saveToDatabase = async (userId, fileUrl, status = "pending") => {
  await axios.post("https://payguard-server-production.up.railway.app/documents", {
    user_id: userId,
    fileUrl,
    status,
  });
};
