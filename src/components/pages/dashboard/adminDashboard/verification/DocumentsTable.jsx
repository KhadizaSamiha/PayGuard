import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DocumentPreview from "../../DocumentPreview";
import moment from "moment";
import { FaExchangeAlt } from "react-icons/fa";
import { IoSwapVertical } from "react-icons/io5";

const DocumentsTable = ({ documents, onStatusChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleViewDocument = (document) => {
    setSelectedDocument(document);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDocument(null);
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
      return dateA.isBefore(dateB) ? -1 : 1;
    }
    return dateB.isBefore(dateA) ? -1 : 1;
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
                  <IoSwapVertical />
                </span>
              </div>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="ps-16">Actions</TableHead>
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
                <TableCell>
                  <div className="flex">
                    <button
                      onClick={() => onStatusChange(document._id, "approved")}
                      className="bg-blue-400 px-3 py-1.5 rounded-lg text-white me-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => onStatusChange(document._id, "rejected")}
                      className="bg-red-400 px-3 py-1.5 rounded-lg text-white"
                    >
                      Reject
                    </button>
                  </div>
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

export default DocumentsTable;
