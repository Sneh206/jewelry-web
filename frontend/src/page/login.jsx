import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/user/login", formData, {
        withCredentials: true,
      });

      // ✅ Store user info in localStorage
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setMessage("Login Successful!");
      setSuccess(true);

      navigate("/");
    } catch (error) {
      console.error(error);
      setMessage("Invalid credentials. Please try again.");
      setSuccess(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDF6F0] to-[#FCE8DE] flex items-center justify-center px-4">
      <div className="bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl max-w-md w-full border border-[#f2d7cd] animate-fadeIn">
        <h2 className="text-3xl font-bold text-center text-[#3C3C3C] mb-6">Welcome Back</h2>

        {message && (
          <div className={`text-center text-sm mb-4 font-medium ${success ? "text-green-600" : "text-red-600"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-[#3C3C3C]">
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
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border border-[#e6cfc7] rounded-lg bg-[#fffaf8] focus:outline-none focus:ring-2 focus:ring-[#B76E79]"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#B76E79] text-white py-3 rounded-lg font-semibold hover:bg-[#a55a65] transition duration-300"
          >
            Login
          </button>

          <p className="text-center mt-2 text-sm text-[#555]">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#B76E79] font-semibold hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
