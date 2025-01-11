import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/useAuth"; 

const PaymentPrivate = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useAuth(); 
  const isPaymentDone = localStorage.getItem("isPaymentDone");

  useEffect(() => {
    if (!user) {
      navigate("/login"); 
    } else if (!isPaymentDone) {
      navigate("/payment"); 
    }
  }, [user, isPaymentDone, navigate]);

  if (!user || !isPaymentDone) {
    return null; 
  }

  return children;
};

export default PaymentPrivate;
