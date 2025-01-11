import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/pages/Register.jsx";
import Home from "./components/pages/home/Home.jsx";
import Payment from "./components/pages/payment/Payment.jsx";
import DocumentForm from "./components/pages/payment/DocumentForm.jsx";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/payment", component: Payment },
  { path: "/payment-verify", component: DocumentForm },
];

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        {routes.map(({ path, component: Component }, index) => (
          <Route key={index} path={path} element={<Component />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
