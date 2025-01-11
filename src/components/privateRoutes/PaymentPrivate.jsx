import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/useAuth"; 

const PaymentPrivate = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useAuth(); 
  const [loading, setLoading] = useState(true); // Add loading state
  const isPaymentDone = localStorage.getItem("isPaymentDone");

  useEffect(() => {
    // Ensure both user and payment status are checked only when necessary
    if (!user) {
      navigate("/login");
    } else if (!isPaymentDone) {
      navigate("/payment");
    } else {
      setLoading(false); // Once the checks are done, set loading to false
    }
  }, [user, isPaymentDone, navigate]);

  // Show loading state or null until the user and payment status are validated
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !isPaymentDone) {
    return null; // Return null while redirecting or processing
  }

  return children; // If all checks pass, render the children
};

export default PaymentPrivate;
