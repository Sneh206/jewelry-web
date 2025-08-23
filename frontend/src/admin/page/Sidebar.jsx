import React from 'react';
import { Home, ShoppingBag, Users, Settings,MessageCircle  } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="mt-[-32px] hidden md:block w-64 bg-gradient-to-b from-[#1E1B2E] to-[#111018] text-white p-6 shadow-[8px_8px_15px_rgba(0,0,0,0.6)] rounded-tr-3xl fixed top-[88px] bottom-0 left-0 overflow-y-auto transform-gpu">
      <h2 className="text-xl font-extrabold text-[#FACC15] mb-10 tracking-wide shadow-text-glow">
        Admin Menu
      </h2>
      <nav className="flex flex-col gap-6">
        <Link
          to="/adminapp/AdminDashboard"
          className="flex items-center gap-4 p-3 rounded-lg transition-all duration-300 bg-[#2A273E] hover:translate-x-1 hover:shadow-[4px_4px_10px_rgba(250,204,21,0.5)] hover:text-[#FACC15]"
        >
          <Home className="w-5 h-5" /> Dashboard
        </Link>

        <Link
          to="/adminapp/admin"
          className="flex items-center gap-4 p-3 rounded-lg transition-all duration-300 bg-[#2A273E] hover:translate-x-1 hover:shadow-[4px_4px_10px_rgba(250,204,21,0.5)] hover:text-[#FACC15]"
        >
          <ShoppingBag className="w-5 h-5" /> Products
        </Link>

        <Link
          to="/adminapp/user"
          className="flex items-center gap-4 p-3 rounded-lg transition-all duration-300 bg-[#2A273E] hover:translate-x-1 hover:shadow-[4px_4px_10px_rgba(250,204,21,0.5)] hover:text-[#FACC15]"
        >
          <Users className="w-5 h-5" /> Users
        </Link>

        <Link
          to="/adminapp/setting"
          className="flex items-center gap-4 p-3 rounded-lg transition-all duration-300 bg-[#2A273E] hover:translate-x-1 hover:shadow-[4px_4px_10px_rgba(250,204,21,0.5)] hover:text-[#FACC15]"
        >
          <Settings className="w-5 h-5" /> Settings
        </Link>

        <Link
          to="/adminapp/LatestProductshow"
          className="flex items-center gap-4 p-3 rounded-lg transition-all duration-300 bg-[#2A273E] hover:translate-x-1 hover:shadow-[4px_4px_10px_rgba(250,204,21,0.5)] hover:text-[#FACC15]"
        >
          <ShoppingBag className="w-5 h-5" /> Latest Products
        </Link>

        <Link
          to="/adminapp/ContactUsData"
          className="flex items-center gap-4 p-3 rounded-lg transition-all duration-300 bg-[#2A273E] hover:translate-x-1 hover:shadow-[4px_4px_10px_rgba(250,204,21,0.5)] hover:text-[#FACC15]"
        >
          <MessageCircle className="w-5 h-5" /> Contact Us
        </Link>

        <Link to="/adminapp/CompledUserItem"
          className="flex items-center gap-4 p-3 rounded-lg transition-all duration-300 bg-[#2A273E] hover:translate-x-1 hover:shadow-[4px_4px_10px_rgba(250,204,21,0.5)] hover:text-[#FACC15]"
        >
          <MessageCircle className="w-5 h-5" /> CompledUserItem
        </Link>

      </nav>
    </aside>
  );
};

export default Sidebar;
