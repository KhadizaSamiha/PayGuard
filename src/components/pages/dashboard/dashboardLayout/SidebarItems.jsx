import React from "react";
import { Link, useLocation } from "react-router-dom";
import { TfiDashboard } from "react-icons/tfi";
import { CiCreditCard1 } from "react-icons/ci";
import { MdOutlineAttachFile } from "react-icons/md";

// SidebarItems Component
const SidebarItems = ({ role }) => {
  const location = useLocation();
  
  const adminItems = [
    { to: "/dashboard", label: "Dashboard", icon: <TfiDashboard /> },
    { to: "/dashboard/all-payments", label: "All Payments", icon: <CiCreditCard1 /> },
    { to: "/dashboard/all-documents", label: "All Documents", icon: <MdOutlineAttachFile /> },
  ];

  const userItems = [
    { to: "/dashboard/my-payments", label: "My Payments", icon: <CiCreditCard1 /> },
    { to: "/dashboard/my-documents", label: "My Documents", icon: <MdOutlineAttachFile /> },
  ];

  const getLinkClass = (path) => {
    return location.pathname === path
      ? "block p-2 mb-2 bg-gray-600 border-b-[1px] border-gray-600 rounded-md"
      : "block p-2 mb-2 hover:bg-gray-600 border-b-[1px] border-gray-600 rounded-md";
  };

  return (
    <ul>
      {role === "admin"
        ? adminItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={getLinkClass(item.to)}
              >
                <div className="flex items-center gap-1">
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </div>
              </Link>
            </li>
          ))
        : role === "user"
        ? userItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={getLinkClass(item.to)}
              >
                <div className="flex items-center gap-1">
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </div>
              </Link>
            </li>
          ))
        : null}
    </ul>
  );
};

export default SidebarItems;
