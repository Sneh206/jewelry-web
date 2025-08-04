import React from 'react';
import { Home, ShoppingBag, Users, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="hidden md:block w-64 bg-[#1E1B2E] text-white p-6 shadow-lg fixed top-[88px] bottom-0 left-0 overflow-y-auto rounded-r-2xl">
      <h2 className="text-xl font-bold text-[#FACC15] mb-8">Admin Menu</h2>
      <nav className="flex flex-col gap-6">
        <Link to="/adminapp/AdminDashboard" className="flex items-center gap-3 hover:text-[#FACC15]">
          <Home className="w-5 h-5" /> Dashboard
        </Link>
        <Link to="/adminapp/admin" className="flex items-center gap-3 hover:text-[#FACC15]">
          <ShoppingBag className="w-5 h-5" /> Products
        </Link>
        <Link to="/adminapp/user" className="flex items-center gap-3 hover:text-[#FACC15]">
          <Users className="w-5 h-5" /> Users
        </Link>
        <Link to="/adminapp/setting" className="flex items-center gap-3 hover:text-[#FACC15]">
          <Settings className="w-5 h-5" /> Settings
        </Link>
        <Link to="/adminapp/LatestProductshow" className="flex items-center gap-3 hover:text-[#FACC15]">
          <ShoppingBag className="w-5 h-5" /> LatestProducts
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
