import React, { useEffect, useState } from "react";  
import { useAuth } from "@/features/auth/useAuth";
import MyDocumentsTable from "./MyDocumentsTable";

const MyDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const { user } = useAuth(); 
  
  useEffect(() => {
    if (user && user.id) {
      fetch(`https://payguard-server-production.up.railway.app/documents/${user.id}`)  // Pass user._id in the URL
        .then((response) => response.json())
        .then((data) => setDocuments(data))
        .catch((error) => console.error("Error fetching documents:", error));
    }
  }, [user]); 

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My documents</h1>
      <MyDocumentsTable documents={documents} />
    </div>
  );
};

export default MyDocuments;
