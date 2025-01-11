import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; // Import ShadCN table components

const MyPaymentsTable = ({ payments}) => {
  return (
    <Table className="min-w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
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

export default MyPaymentsTable;
