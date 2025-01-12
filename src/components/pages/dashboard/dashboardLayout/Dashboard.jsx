import React, { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/useAuth";
import Chart from "./Chart";

const Dashboard = () => {
  const {userData} = useAuth();

  const [payments, setPayments] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:3000/payments")
      .then((response) => response.json())
      .then((data) => {
        setPayments(data);
      });
  }, []);
  return (
    <div>
      <Chart data={payments}/>
    </div>
  );
};

export default Dashboard;
