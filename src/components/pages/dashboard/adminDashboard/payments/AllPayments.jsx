import React, { useEffect, useState } from "react";
import AllPaymentsTable from "./AllPaymentsTable"; // Import the child component

const AllPayments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/payments")
      .then((response) => response.json())
      .then((data) => setPayments(data));
  }, []);

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
      <h1 className="text-2xl font-bold mb-4">All Payments</h1>
      <AllPaymentsTable payments={payments} onStatusChange={handleStatusChange} />
    </div>
  );
};

export default AllPayments;
