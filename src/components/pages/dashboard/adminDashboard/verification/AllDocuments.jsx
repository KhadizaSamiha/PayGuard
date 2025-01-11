import React, { useEffect, useState } from "react";
import DocumentsTable from "./DocumentsTable";

const AllDocuments = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // Fetch documents data
    fetch("http://localhost:3000/documents")
      .then((response) => response.json())
      .then((data) => setDocuments(data));
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3000/documents/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
  
      const data = await response.json();
      if (response.ok) {
        setDocuments((prevDocuments) =>
          prevDocuments.map((document) =>
            document._id === id ? { ...document, status: newStatus } : document
          )
        );
      } else {
        alert(data.message); // Show any error message from the backend
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update status. Please try again.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Documents</h1>
      <DocumentsTable documents={documents} onStatusChange={handleStatusChange}/> {/* Pass documents as a prop */}
    </div>
  );
};

export default AllDocuments;
