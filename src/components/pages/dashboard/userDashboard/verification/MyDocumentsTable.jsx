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
import moment from "moment";
import { IoSwapVertical } from "react-icons/io5"; // Switch icon for sorting

const MyDocumentsTable = ({ documents }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [selectedDocument, setSelectedDocument] = useState(null); // Selected document
  const [sortOrder, setSortOrder] = useState("asc"); // Sorting order state

  const handleViewDocument = (document) => {
    setSelectedDocument(document); // Set the selected document for the modal
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedDocument(null); // Reset the selected document
  };

  // Function to toggle sorting order and sort the documents
  const toggleSortOrder = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  // Sort documents based on the selected order
  const sortedDocuments = [...documents].sort((a, b) => {
    const dateA = moment(a.uploaded_at);
    const dateB = moment(b.uploaded_at);
    if (sortOrder === "asc") {
      return dateA.isBefore(dateB) ? -1 : 1; // Ascending order
    }
    return dateB.isBefore(dateA) ? -1 : 1; // Descending order
  });

  return (
    <div>
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Document</TableHead>
            <TableHead>
              <div className="flex items-center">
                Date
                <span
                  onClick={toggleSortOrder}
                  className="cursor-pointer ml-1 text-lg"
                >
                  <IoSwapVertical /> {/* Switch icon */}
                </span>
              </div>
            </TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedDocuments.length > 0 ? (
            sortedDocuments.map((document) => (
              <TableRow key={document.id}>
                <TableCell>
                  <button
                    onClick={() => handleViewDocument(document)}
                    className="bg-green-400 px-3 py-1.5 rounded-lg text-white"
                  >
                    View Document
                  </button>
                </TableCell>
                <TableCell>
                  {moment(document?.uploaded_at).format("DD-MM-YYYY")}
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
              <TableCell colSpan="3" className="text-center">
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
