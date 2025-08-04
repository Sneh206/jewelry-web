import React from 'react';
import AdminHeader from './AdminHeader';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import Product from './product';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader/>
      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar />
        <main className="flex-1 p-4 md:ml-64 overflow-x-auto">
          <Outlet />
          <div>
            <Product/>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;