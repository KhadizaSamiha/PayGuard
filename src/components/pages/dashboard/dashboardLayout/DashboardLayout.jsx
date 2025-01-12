// DashboardLayout.jsx
import { useAuth } from "@/features/auth/useAuth";
import React from "react";
import { Outlet } from "react-router-dom";
import SidebarItems from "./SidebarItems"; 

const DashboardLayout = ({userData}) => {

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white">
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
