import React, { useEffect, useState } from "react";

const AllDocuments = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/documents")
      .then((response) => response.json())
      .then((data) => setDocuments(data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Documents</h1>
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Document ID</th>
            <th className="border border-gray-300 px-4 py-2">User Id</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {documents.length > 0 ? (
            documents.map((document) => (
              <tr key={document.id}>
                <td className="border border-gray-300 px-4 py-2">{document.id}</td>
                <td className="border border-gray-300 px-4 py-2">{document.user_id}</td>
                <td
                  className={`border border-gray-300 px-4 py-2 ${
                    document.status === "approved"
                      ? "text-green-500"
                      : document.status === "pending"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {document.status}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                className="border border-gray-300 px-4 py-2 text-center"
                colSpan="4"
              >
                No documents found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllDocuments;
