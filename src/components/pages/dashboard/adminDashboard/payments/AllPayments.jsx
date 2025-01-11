import React, { useEffect, useState } from "react";
import PaymentsTable from "./PaymentsTable"; // Import the child component

const AllPayments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Fetch payments data
    fetch("http://localhost:3000/payments")
      .then((response) => response.json())
      .then((data) => setPayments(data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Payments</h1>
      <PaymentsTable payments={payments} /> {/* Pass payments as a prop */}
    </div>
  );
};

export default AllPayments;
