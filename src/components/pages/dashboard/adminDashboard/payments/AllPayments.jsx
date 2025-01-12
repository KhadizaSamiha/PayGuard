import React, { useEffect, useState } from "react";
import AllPaymentsTable from "./AllPaymentsTable"; // Import the child component
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // ShadCN Select component

const AllPayments = () => {
  const [payments, setPayments] = useState([]);
  const [filterStatus, setFilterStatus] = useState(""); // State for the selected filter
  const [filteredPayments, setFilteredPayments] = useState([]); // State for filtered payments

  useEffect(() => {
    fetch("http://localhost:3000/payments")
      .then((response) => response.json())
      .then((data) => {
        setPayments(data);
        setFilteredPayments(data); // Set initial filtered payments
      });
  }, []);

  useEffect(() => {
    // Filter payments based on selected status
    if (filterStatus) {
      setFilteredPayments(
        payments.filter((payment) => payment.status === filterStatus)
      );
    } else {
      setFilteredPayments(payments); // Show all if no filter is selected
    }
  }, [filterStatus, payments]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3000/payments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();
      if (response.ok) {
        setPayments((prevPayments) =>
          prevPayments.map((payment) =>
            payment._id === id ? { ...payment, status: newStatus } : payment
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
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-5">All Payments</h1>

        {/* Filter by status */}
        <div className="mb-4">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter By Status" />{" "}
            </SelectTrigger>
            <SelectContent>
              <div className="space-y-2">
                <SelectItem value={null}>All</SelectItem> {/* Use null here */}
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </div>
            </SelectContent>
          </Select>
        </div>
      </div>

      <AllPaymentsTable
        payments={filteredPayments}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default AllPayments;
