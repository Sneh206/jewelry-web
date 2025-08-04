import React from "react";
import Sidebar from "./Slider";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Slider />
      <main className="flex-1 ml-64 p-6 bg-[#fffaf9]">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
