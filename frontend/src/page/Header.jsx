import React, { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import axios from "axios"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navigate = useNavigate();

  const logoutdata = async() => {
    try{
      await axios.get('http://localhost:8000/user/logout', {
        withCredentials: true,
      });
      navigate('/login');
    }catch(error){
      console.error('Logout failed',error);
    }
  }

  return (
    <header className="bg-white shadow-lg border-b border-yellow-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-serif font-bold text-yellow-700 tracking-wide">
              Gold Glam
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 font-medium text-yellow-800">
            <Link to="/Bracelets" className="hover:text-yellow-600 transition">Bracelets</Link>
            <Link to="/categories" className="hover:text-yellow-600 transition">Categories</Link>
            <Link to="/products" className="hover:text-yellow-600 transition">Products</Link>
            <Link to="/ContactUs" className="hover:text-yellow-600 transition">Contact Us</Link>
            <button className="text-red-600 hover:text-red-700 transition">Logout</button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu}>
              {isOpen ? <X className="w-6 h-6 text-yellow-800" /> : <Menu className="w-6 h-6 text-yellow-800" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <nav className="flex flex-col space-y-2 text-yellow-800 font-medium">
            <Link to="/bracelets" className="hover:text-yellow-600">Bracelets</Link>
            <Link to="/categories" className="hover:text-yellow-600">Categories</Link>
            <Link to="/products" className="hover:text-yellow-600">Products</Link>
            <Link to="/contact" className="hover:text-yellow-600">Contact Us</Link>
            <button onClick={logoutdata} className="text-red-600 hover:text-red-700">Logout</button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
