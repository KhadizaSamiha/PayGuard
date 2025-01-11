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

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
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
        {/* Dashboard with nested routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="all-payments" element={<AllPayments />} />
          <Route path="all-documents" element={<AllDocuments />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
