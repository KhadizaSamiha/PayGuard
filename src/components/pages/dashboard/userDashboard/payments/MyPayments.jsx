import React, { useEffect, useState } from "react"; 
import { useAuth } from "@/features/auth/useAuth";
import MyPaymentsTable from "./MyPaymentsTable";

const MyPayments = () => {
  const [payments, setPayments] = useState([]);
  const { user } = useAuth(); 
  
  useEffect(() => {
    if (user && user.id) {
      fetch(`http://localhost:3000/payments/${user.id}`)  // Pass user._id in the URL
        .then((response) => response.json())
        .then((data) => setPayments(data))
        .catch((error) => console.error("Error fetching payments:", error));
    }
  }, [user]); 

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Payments</h1>
      <MyPaymentsTable payments={payments} />
    </div>
  );
};

export default MyPayments;
