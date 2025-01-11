import { useAuth } from "@/features/auth/useAuth";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const { userData } = useAuth();

  // Check if the user has data and role
  if (!userData) {
    return <div>Loading...</div>; // Optionally handle loading state or user not found
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white">
        <nav className="p-4">
          <ul>
            {/* Admin Routes */}
            {userData.role === "admin" && (
              <>
                <li>
                  <Link
                    to={"/dashboard/all-payments"}
                    className="block p-2 hover:bg-gray-700"
                  >
                    All Payments
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/dashboard/all-documents"}
                    className="block p-2 hover:bg-gray-700"
                  >
                    All Documents
                  </Link>
                </li>
              </>
            )}

            {/* User Routes */}
            {userData.role === "user" && (
              <>
                <li>
                  <Link
                    to={"/dashboard/my-payments"}
                    className="block p-2 hover:bg-gray-700"
                  >
                    My Payments
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/dashboard/verification"}
                    className="block p-2 hover:bg-gray-700"
                  >
                    Verification
                  </Link>
                </li>
              </>
            )}
          </ul>
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
