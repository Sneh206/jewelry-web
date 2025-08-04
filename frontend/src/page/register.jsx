import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      setSuccess(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/user/register", formData);
      setMessage("Registered Successfully!");
      setSuccess(true);
    } catch (error) {
      setMessage("Something went wrong!");
      setSuccess(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDF6F0] to-[#FCE8DE] flex items-center justify-center px-4">
      <div className="bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl max-w-md w-full border border-[#f2d7cd] animate-fadeIn">
        <h2 className="text-3xl font-bold text-center text-[#3C3C3C] mb-6">Register for Elegance</h2>

        {message && (
          <div className={`text-center text-sm mb-4 font-medium ${success ? "text-green-600" : "text-red-600"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-[#3C3C3C]">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-[#e6cfc7] rounded-lg bg-[#fffaf8] focus:outline-none focus:ring-2 focus:ring-[#B76E79]"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-[#e6cfc7] rounded-lg bg-[#fffaf8] focus:outline-none focus:ring-2 focus:ring-[#B76E79]"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border border-[#e6cfc7] rounded-lg bg-[#fffaf8] focus:outline-none focus:ring-2 focus:ring-[#B76E79]"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border border-[#e6cfc7] rounded-lg bg-[#fffaf8] focus:outline-none focus:ring-2 focus:ring-[#B76E79]"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-3 border border-[#e6cfc7] rounded-lg bg-[#fffaf8] focus:outline-none focus:ring-2 focus:ring-[#B76E79]"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#B76E79] text-white py-3 rounded-lg font-semibold hover:bg-[#a55a65] transition duration-300"
          >
            Register
          </button>

          <p className="text-center mt-2 text-sm text-[#555]">
            Already have an account?{" "}
            <Link to="/login" className="text-[#B76E79] font-semibold hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
