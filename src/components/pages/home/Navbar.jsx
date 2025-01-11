import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/useAuth";
import { logout } from "@/features/auth/authService";
import { Link, useNavigate } from "react-router-dom";
import { showToast } from "@/utils/toastUtils";

const Navbar = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logout();
      navigate("/login");
      showToast("Logout Success");
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between text-white gap-5">
          <div>
            <Link to="/payment">Payment</Link>
          </div>
          <div className="flex gap-2 items-center">
            <p>Email: {user?.email || "No User"}</p>
            {user ? (
              <Button onClick={logoutHandler}>Logout</Button>
            ) : (
              <Link to="/login">
                <Button className="bg-gray-600">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
