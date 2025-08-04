// components/AdminHeader.jsx

import React from 'react';
import { Bell, UserCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const AdminHeader = () => {
  const navigate = useNavigate();

  const logoutButton = async () => {
    try {
      await axios.get('http://localhost:8000/admin/logout', {
        withCredentials: true,
      });
      navigate('/adminapp/adminlogin');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
<header className="sticky top-0 z-50 bg-[#f5f3ea] shadow-sm px-6 py-4 flex justify-between items-center  mb-5">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-[#1a1a1a] font-serif tracking-wide">
        ELORIA Admin
      </Link>

      {/* Navigation */}
      <nav className="hidden md:flex gap-8 text-[#1a1a1a] font-semibold text-sm tracking-wide ">
        <Link to="/adminapp/AdminDashboard" className="hover:underline">Dashboard</Link>
        <Link to="/adminapp/order" className="hover:underline">Orders</Link>
        <Link to="/adminapp/admin" className="hover:underline">Products</Link>
      </nav>

      {/* Admin Section */}
      <div className="flex items-center gap-4">
        <Bell className="w-5 h-5 text-[#1a1a1a] hover:text-yellow-600 cursor-pointer transition" />
        <div className="flex items-center gap-2">
          <UserCircle className="w-6 h-6 text-[#1a1a1a]" />
          <span
            onClick={logoutButton}
            className="text-sm text-[#1a1a1a] hover:text-yellow-600 cursor-pointer transition font-medium"
          >
            Logout
          </span>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
