import React, { useEffect, useState } from "react";

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
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Payment ID</th>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Amount</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.length > 0 ? (
            payments.map((payment) => (
              <tr key={payment.id}>
                <td className="border border-gray-300 px-4 py-2">{payment.user_id}</td>
                <td className="border border-gray-300 px-4 py-2">{payment.title}</td>
                <td className="border border-gray-300 px-4 py-2">${payment.amount}</td>
                <td
                  className={`border border-gray-300 px-4 py-2 ${
                    payment.status === "approved"
                      ? "text-green-500"
                      : payment.status === "pending"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {payment.status}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                className="border border-gray-300 px-4 py-2 text-center"
                colSpan="4"
              >
                No payments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllPayments;
