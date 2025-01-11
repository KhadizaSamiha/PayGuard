import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; // Import ShadCN table components

const AllPaymentsTable = ({ payments , onStatusChange}) => {
  return (
    <Table className="min-w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className='ps-16'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payments.length > 0 ? (
          payments.map((payment) => (
            <TableRow key={payment._id}>
              <TableCell>{payment.title}</TableCell>
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
                <button onClick={() => onStatusChange(payment._id, "approved")} className="bg-blue-400 px-3 py-1.5 rounded-lg text-white me-2">Approve</button>
                <button onClick={() => onStatusChange(payment._id, "rejected")} className="bg-red-400 px-3 py-1.5 rounded-lg text-white">Reject</button>
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
