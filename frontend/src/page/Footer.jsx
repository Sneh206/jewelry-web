import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 transform transition-all duration-700 hover:scale-[1.02] hover:-rotate-x-1 hover:shadow-2xl">

        {/* About Store */}
        <div className="hover:scale-105 transition-transform duration-500 hover:shadow-lg hover:bg-yellow-50 p-3 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">About Our Store</h3>
          <p className="text-sm mb-4">
            Welcome to our store, where we pride ourselves on providing
            exceptional products and unparalleled customer service. Our store
            is a haven for those who appreciate quality, style, and innovation.
          </p>
          <div className="flex space-x-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Available_on_the_App_Store_%28black%29.png"
              alt="App Store"
              className="h-10 hover:scale-110 transition-transform duration-300"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="h-10 hover:scale-110 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Products */}
        <div className="hover:scale-105 transition-transform duration-500 hover:shadow-lg hover:bg-yellow-50 p-3 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">Products</h3>
          <ul className="space-y-2 text-sm">
            <li>Prices Drop</li>
            <li>New Products</li>
            <li>Best Sellers</li>
            <li>Contact Us</li>
            <li>Sitemap</li>
            <li>Accessories</li>
          </ul>
        </div>

        {/* Our Company */}
        <div className="hover:scale-105 transition-transform duration-500 hover:shadow-lg hover:bg-yellow-50 p-3 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">Our Company</h3>
          <ul className="space-y-2 text-sm">
            <li>Delivery</li>
            <li>Legal Notice</li>
            <li>Terms And Conditions</li>
            <li>Of Use</li>
            <li>About Us</li>
            <li>Secure Payment</li>
            <li>Stores</li>
          </ul>
        </div>

        {/* Your Account */}
        <div className="hover:scale-105 transition-transform duration-500 hover:shadow-lg hover:bg-yellow-50 p-3 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">Your Account</h3>
          <ul className="space-y-2 text-sm">
            <li>Order Tracking</li>
            <li>Sign In</li>
            <li>Create Account</li>
            <li>My Alerts</li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="hover:scale-105 transition-transform duration-500 hover:shadow-lg hover:bg-yellow-50 p-3 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <div className="space-y-4 text-sm">
            <div className="flex items-start space-x-2">
              <MapPin className="text-yellow-700 mt-1" size={18} />
              <p>
                Demo Store<br />
                507-Union Trade Center<br />
                123456<br />
                France
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="text-yellow-700" size={18} />
              <p>admin@localhost.com</p>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="text-yellow-700" size={18} />
              <p>(+91) 9876-543-210</p>
            </div>
          </div>
        </div>

      </div>

      <div className="bg-yellow-50 text-center text-sm py-4 text-gray-600 border-t">
        &copy; {new Date().getFullYear()} Demo Store. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
