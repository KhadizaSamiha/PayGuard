import React, { useState, useRef, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import SidebarItems from "./SidebarItems";
import { IoHomeSharp } from "react-icons/io5";
import { HiMenuAlt1, HiX } from "react-icons/hi";
import Loader from "../../Loader";

const DashboardLayout = ({ userData }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  if (!userData) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className="flex h-screen">
      {/* Sidebar for Desktop */}
      <aside
        ref={sidebarRef}
        className={`fixed z-20 top-0 left-0 h-full bg-gray-800 text-white transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:w-64`}
      >
        <div className="flex flex-col">
          <Link to="/home">
            <div className="flex items-center justify-center mt-2">
              <IoHomeSharp className="h-7 w-7 mr-1 mb-2 text-blue-400" />
              <h1 className="text-3xl italic font-semibold mb-2 bg-gradient-to-r from-blue-300 to-blue-400 bg-clip-text text-transparent">
                PayGuard
              </h1>
            </div>
          </Link>
          <nav className="p-4">
            <SidebarItems role={userData?.role} />
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">
        <div className="md:hidden">
          <button
            onClick={toggleSidebar}
            className="text-gray-800 p-2 focus:outline-none"
          >
            {isSidebarOpen ? (
              <HiX className="h-6 w-6" />
            ) : (
              <HiMenuAlt1 className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Main Content Outlet */}
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
