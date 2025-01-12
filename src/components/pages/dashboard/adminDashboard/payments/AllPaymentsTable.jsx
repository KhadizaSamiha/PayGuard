import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import moment from "moment";
import { IoSwapVertical } from "react-icons/io5";

const AllPaymentsTable = ({ payments, onStatusChange }) => {
  const [sortOrder, setSortOrder] = useState("asc"); // State for sorting order

  // Function to toggle sorting order and sort the payments
  const toggleSortOrder = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  // Sort payments based on the selected order
  const sortedPayments = [...payments].sort((a, b) => {
    const dateA = moment(a.created_at);
    const dateB = moment(b.created_at);
    if (sortOrder === "asc") {
      return dateA.isBefore(dateB) ? -1 : 1; // Ascending order
    }
    return dateB.isBefore(dateA) ? -1 : 1; // Descending order
  });

  return (
    <Table className="min-w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
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
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="ps-16">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedPayments.length > 0 ? (
          sortedPayments.map((payment) => (
            <TableRow key={payment._id}>
              <TableCell>{payment.title}</TableCell>
              <TableCell>
                {moment(payment?.created_at).format("DD-MM-YYYY")}
              </TableCell>
              <TableCell>${payment.amount}</TableCell>
              <TableCell
                className={`${
                  payment.status === "approved"
                    ? "text-green-500"
                    : payment.status === "pending"
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                {payment.status}
              </TableCell>
              <TableCell>
                <button
                  onClick={() => onStatusChange(payment._id, "approved")}
                  className="bg-blue-400 px-3 py-1.5 rounded-lg text-white me-2"
                >
                  Approve
                </button>
                <button
                  onClick={() => onStatusChange(payment._id, "rejected")}
                  className="bg-red-400 px-3 py-1.5 rounded-lg text-white"
                >
                  Reject
                </button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan="4" className="text-center">
              No payments found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default AllPaymentsTable;
