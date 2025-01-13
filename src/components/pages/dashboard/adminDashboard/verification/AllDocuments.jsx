import React, { useEffect, useState } from "react";
import DocumentsTable from "./DocumentsTable";
import { showToast } from "@/utils/toastUtils";

const AllDocuments = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // Fetch documents data
    fetch("https://payguard-server-production.up.railway.app/documents")
      .then((response) => response.json())
      .then((data) => setDocuments(data));
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(
        `https://payguard-server-production.up.railway.app/documents/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
  
      const data = await response.json();
      if (response.ok) {
        setDocuments((prevDocuments) =>
          prevDocuments.map((document) =>
            document._id === id ? { ...document, status: newStatus } : document
          )
        );
        showToast("Document status updated successfully!");
      } else {
        showToast(data.message || "Failed to update document status.", "error");
      }
    } catch (error) {
      console.error(error);
      showToast("Failed to update document status. Please try again.", "error");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-gray-700">All Documents</h1>
      <DocumentsTable documents={documents} onStatusChange={handleStatusChange}/> 
    </div>
  );
};

export default AllDocuments;
