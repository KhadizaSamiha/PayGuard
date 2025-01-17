import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/useAuth";
import { logout } from "@/features/auth/authService";
import { Link, useNavigate } from "react-router-dom";
import { showToast } from "@/utils/toastUtils";
import { CiLogout } from "react-icons/ci";
import { TfiDashboard } from "react-icons/tfi";
import { AiOutlineFile } from "react-icons/ai";
import { AiOutlineCreditCard } from "react-icons/ai"; 
import Avatar from "/avatar.png";
import Guard from "/guard.png";
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, userData } = useAuth(); 
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
          <div className="flex items-center md:gap-2 gap-1">
            <img src={Guard} alt="logo" className="h-11 w-11" />
            <h1 className="text-3xl italic font-semibold mb-2 bg-gradient-to-r from-blue-300 to-blue-400 bg-clip-text text-transparent">
              PayGuard
            </h1>
          </div>
          <div className="flex gap-2 items-center">
            {user ? (
              <div className="relative">
                {/* Avatar */}
                <img
                  src={Avatar}
                  alt="User Avatar"
                  className="h-8 w-8 rounded-full cursor-pointer"
                  onClick={toggleDropdown}
                />
                {dropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute z-10 right-0 mt-2 w-40 bg-gray-100 text-blue-500 text-md rounded-md"
                  >
                    <ul className="space-y-1.5 p-2">
                      {userData?.role === "admin" && (
                        <>
                          <li>
                            <Link to="/dashboard" className="flex items-center gap-1">
                              <TfiDashboard />
                              Dashboard
                            </Link>
                          </li>
                          <li>
                            <button
                              className="flex items-center gap-1"
                              onClick={logoutHandler}
                            >
                              <CiLogout />
                              Logout
                            </button>
                          </li>
                        </>
                      )}
                      {userData?.role === "user" && (
                        <>
                          <li>
                            <Link to="/dashboard/my-payments" className="flex items-center gap-1">
                              <AiOutlineCreditCard />
                              My Payments
                            </Link>
                          </li>
                          <li>
                            <Link to="/dashboard/my-documents" className="flex items-center gap-1">
                              <AiOutlineFile />
                              My Documents
                            </Link>
                          </li>
                          <li>
                            <button
                              className="flex items-center gap-1"
                              onClick={logoutHandler}
                            >
                              <CiLogout />
                              Logout
                            </button>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <Button className="bg-blue-500">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
