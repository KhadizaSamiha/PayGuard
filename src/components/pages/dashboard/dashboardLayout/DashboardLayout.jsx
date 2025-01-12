import React from "react";
import { Link, Outlet } from "react-router-dom";
import SidebarItems from "./SidebarItems";
import { IoHomeSharp } from "react-icons/io5";
import Loader from "../../Loader";

const DashboardLayout = ({ userData }) => {
  if (!userData) {
    return <div><Loader/></div>;
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white">
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
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
