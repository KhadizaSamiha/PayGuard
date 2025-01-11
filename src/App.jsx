import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/pages/Register.jsx";
import Home from "./components/pages/home/Home.jsx";
import Payment from "./components/pages/payment/Payment.jsx";
import DocumentForm from "./components/pages/payment/DocumentForm.jsx";
import PaymentPrivate from "./components/privateRoutes/PaymentPrivate.jsx";
import DashboardLayout from "./components/pages/dashboard/DashboardLayout.jsx";
import AllPayments from "./components/pages/dashboard/adminDashboard/AllPayments.jsx";
import AllDocuments from "./components/pages/dashboard/adminDashboard/AllDocuments.jsx";
import MyPayments from "./components/pages/dashboard/userDashboard/MyPayments.jsx"; // New user route
import Verification from "./components/pages/dashboard/userDashboard/Verification.jsx"; // New user route
import { useAuth } from "@/features/auth/useAuth"; // Assuming useAuth is in the same directory

function App() {
  const { userData, loading } = useAuth(); // Fetch user data and loading state

  // If user data is still loading, you might want to show a loading screen
  if (loading) {
    return <div>Loading...</div>;
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
          element={
            <PaymentPrivate>
              <DocumentForm />
            </PaymentPrivate>
          }
        />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
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
              <Route path="/dashboard/verification" element={<Verification />} />
            </>
          ) : null}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
