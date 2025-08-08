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
    <header className="sticky top-0 z-50 bg-[#f5f3ea] shadow-xl px-8 py-5 flex justify-between items-center mb-6 rounded-b-xl border-b border-yellow-200">
      {/* Logo */}
      <Link
        to="/adminapp/admin"
        className="text-3xl font-extrabold text-[#1a1a1a] font-serif tracking-wide drop-shadow-lg transform hover:scale-105 transition duration-300"
      >
        ELORIA Admin
      </Link>

      {/* Navigation */}
      <nav className="hidden md:flex gap-8 text-[#1a1a1a] font-semibold text-sm tracking-wide">
        <Link
          to="/adminapp/AdminDashboard"
          className="hover:text-yellow-500 transform hover:scale-105 transition duration-300"
        >
          Dashboard
        </Link>
        <Link
          to="/adminapp/order"
          className="hover:text-yellow-500 transform hover:scale-105 transition duration-300"
        >
          Orders
        </Link>
        <Link
          to="/adminapp/admin"
          className="hover:text-yellow-500 transform hover:scale-105 transition duration-300"
        >
          Products
        </Link>
        <Link
          to="/adminapp/ContactUsData"
          className="flex items-center gap-2 hover:text-yellow-500 transform hover:scale-105 transition duration-300"
        >
          Contact Us
        </Link>
      </nav>

      {/* Admin Icons */}
      <div className="flex items-center gap-4">
        <Bell className="w-5 h-5 text-[#1a1a1a] hover:text-yellow-600 transition-transform transform hover:scale-125 cursor-pointer drop-shadow" />
        <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-md border border-gray-300">
          <UserCircle className="w-6 h-6 text-[#1a1a1a]" />
          <span
            onClick={logoutButton}
            className="text-sm text-[#1a1a1a] hover:text-yellow-600 cursor-pointer font-medium transition-transform transform hover:scale-105"
          >
            Logout
          </span>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
