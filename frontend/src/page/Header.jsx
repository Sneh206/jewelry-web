import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import axios from "axios";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const logoutdata = async () => {
    try {
      await axios.get("http://localhost:8000/user/logout", {
        withCredentials: true,
      });
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="bg-white shadow-[0_4px_10px_rgba(0,0,0,0.15)] border-b border-yellow-300 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 transform hover:scale-105 transition-transform duration-300">
            <Link to="/" className="text-2xl font-serif font-bold text-yellow-700 tracking-wide drop-shadow">
              Gold Glam
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 items-center font-medium text-yellow-800">
            {["bracelets", "categories", "products", "contactus"].map((item) => (
              <Link
                key={item}
                to={`/${item}`}
                className="hover:text-yellow-600 hover:translate-y-[1px] transform transition duration-300"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            ))}

            {/* Cart */}
            <Link
              to="/cart"
              className="flex items-center space-x-1 text-yellow-800 hover:text-yellow-600 transform hover:scale-105 transition"
            >
              <ShoppingCart size={20} />
              <span>Cart</span>
            </Link>

            {/* Logout */}
            <button
              className="text-red-600 hover:text-red-700 transform hover:scale-105 transition"
              onClick={logoutdata}
            >
              Logout
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="hover:scale-110 transition-transform duration-200">
              {isOpen ? (
                <X className="w-6 h-6 text-yellow-800" />
              ) : (
                <Menu className="w-6 h-6 text-yellow-800" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 bg-white shadow-inner transition-all duration-300">
          <nav className="flex flex-col space-y-2 text-yellow-800 font-medium">
            {["bracelets", "categories", "products", "contactus", "cart"].map((item) => (
              <Link
                key={item}
                to={`/${item}`}
                className="hover:text-yellow-600 hover:translate-x-1 transform transition duration-200"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            ))}
            <button onClick={logoutdata} className="text-red-600 hover:text-red-700 transition">
              Logout
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
