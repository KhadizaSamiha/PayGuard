import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/pages/Register.jsx";
import Home from "./components/pages/home/Home.jsx";
import Payment from "./components/pages/payment/Payment.jsx";
import DocumentForm from "./components/pages/payment/DocumentVerification/DocumentForm.jsx";
import DashboardLayout from "./components/pages/dashboard/dashboardLayout/DashboardLayout.jsx";
import AllPayments from "./components/pages/dashboard/adminDashboard/payments/AllPayments.jsx";
import AllDocuments from "./components/pages/dashboard/adminDashboard/verification/AllDocuments.jsx"; 
import { useAuth } from "@/features/auth/useAuth"; 
import MyPayments from "./components/pages/dashboard/userDashboard/payments/MyPayments.jsx";
import MyDocuments from "./components/pages/dashboard/userDashboard/verification/MyDocuments.jsx";
import Dashboard from "./components/pages/dashboard/dashboardLayout/Dashboard.jsx";
import Loader from "./components/pages/Loader.jsx";

function App() {
  const { userData, loading } = useAuth(); 

  if (loading) {
    return <div><Loader/></div>;
  }

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/payment" element={<Payment />} />
        <Route
          path="/payment-verify"
          element={<DocumentForm />}
        />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout userData={userData}/>}>
          <Route index element={<Dashboard />} />

          {userData?.role === "admin" ? (
            <>
              {/* Admin Routes */}
              <Route path="/dashboard/all-payments" element={<AllPayments />} />
              <Route path="/dashboard/all-documents" element={<AllDocuments />} />
            </>
          ) : userData?.role === "user" ? (
            <>
              {/* User Routes */}
              <Route path="/dashboard/my-payments" element={<MyPayments />} />
              <Route path="/dashboard/my-documents" element={<MyDocuments />} />
            </>
          ) : null}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
