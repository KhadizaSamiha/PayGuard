import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/useAuth";
import { logout } from "@/features/auth/authService";
import { Link, useNavigate } from "react-router-dom";
import { showToast } from "@/utils/toastUtils";
import Avatar from '/avatar.png'
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, loading , userData} = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const logoutHandler = async () => {
    try {
      await logout();
      navigate("/login");
      showToast("Logout Success");
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between text-white gap-5">
          <div>
            <Link to="/payment">Payment</Link>
          </div>
          <div className="flex gap-2 items-center">
            {user ? (
              <div className="relative">
                {/* Avatar */}
                <img
                  src={Avatar}
                  alt="User Avatar"
                  className="h-10 w-10 rounded-full cursor-pointer"
                  onClick={toggleDropdown}
                />
                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div
                    ref={dropdownRef} 
                    className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg"
                  >
                    <ul className="space-y-2 p-2">
                      <li>
                        <Link to="/dashboard" className="">
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <button
                          className=""
                          onClick={logoutHandler}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
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
