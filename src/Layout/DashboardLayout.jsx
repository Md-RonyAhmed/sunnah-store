// src/layouts/DashboardLayout.jsx

import { Outlet } from "react-router-dom";
import { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md"; // Importing menu and close icons
import { DashNav } from "../pages/Dashboard/DashNav";
import Sidebar from "../pages/Dashboard/Sidebar";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <DashNav />

      {/* Overlay for Mobile when Sidebar is Open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        ></div>
      )}

      {/* Main Content Area with Sidebar */}
      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} />

        {/* Toggle Button for Sidebar on Mobile */}
        <button
          onClick={toggleSidebar}
          className=" m-4 text-gray-800 focus:outline-none z-[999] absolute top-0 left-0"
          aria-label="Toggle Sidebar"
        >
          {isSidebarOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
        </button>

        {/* Content */}
        <main className="container">
          {<Outlet />}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
