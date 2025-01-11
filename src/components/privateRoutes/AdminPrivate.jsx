import { useAuth } from "@/features/auth/useAuth";
import React from "react";
import { Navigate } from "react-router-dom";

const AdminPrivate = ({ children }) => {
  const {userData} = useAuth(); 

  if (!userData || userData.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminPrivate;
