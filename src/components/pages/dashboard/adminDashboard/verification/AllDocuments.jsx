import React, { useEffect, useState } from "react";
import DocumentsTable from "./DocumentsTable"; // Import the child component

const AllDocuments = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // Fetch documents data
    fetch("http://localhost:3000/documents")
      .then((response) => response.json())
      .then((data) => setDocuments(data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Documents</h1>
      <DocumentsTable documents={documents} /> {/* Pass documents as a prop */}
    </div>
  );
};

export default AllDocuments;
