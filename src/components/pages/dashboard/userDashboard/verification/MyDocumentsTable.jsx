// DocumentsTable.js
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Import ShadCN table components
import DocumentPreview from "../../DocumentPreview";

const MyDocumentsTable = ({ documents}) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [selectedDocument, setSelectedDocument] = useState(null); // Selected document

  const handleViewDocument = (document) => {
    setSelectedDocument(document); // Set the selected document for the modal
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedDocument(null); // Reset the selected document
  };

  return (
    <div>
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead>User Id</TableHead>
            <TableHead>Document</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.length > 0 ? (
            documents.map((document) => (
              <TableRow key={document.id}>
                <TableCell>{document.user_id}</TableCell>
                <TableCell>
                  <button
                    onClick={() => handleViewDocument(document)}
                    className="bg-green-400 px-3 py-1.5 rounded-lg text-white"
                  >
                    View Document
                  </button>
                </TableCell>
                <TableCell
                  className={`${
                    document.status === "approved"
                      ? "text-green-500"
                      : document.status === "pending"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {document.status}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="4" className="text-center">
                No documents found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Conditionally render the modal */}
      {isModalOpen && selectedDocument && (
        <DocumentPreview document={selectedDocument} onClose={closeModal} />
      )}
    </div>
  );
};

export default MyDocumentsTable;
