import React, { useState } from 'react';
import axios from 'axios';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('❌ Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/admin/login',
        {
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );

      console.log(response.data.admin);
      setSuccess('✅ Login successful!');
      navigate('/adminapp/admin');
    } catch (err) {
      setError(err.response?.data?.message || '❌ Server error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-900 via-zinc-800 to-gray-900 px-4">
      <div className="bg-white/5 backdrop-blur-2xl p-10 rounded-3xl shadow-2xl w-full max-w-lg space-y-6 border border-white/20 transition-all duration-500">
        <h2 className="text-4xl font-bold text-center text-white tracking-wide">Admin Login</h2>

        {error && <p className="text-red-400 text-center font-medium">{error}</p>}
        {success && <p className="text-green-400 text-center font-medium">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="flex items-center bg-white/10 border border-white/20 rounded-lg px-4 py-3 hover:border-blue-400 transition">
            <FaEnvelope className="text-white/80 mr-3" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent text-white placeholder-white/60 outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center bg-white/10 border border-white/20 rounded-lg px-4 py-3 hover:border-blue-400 transition">
            <FaLock className="text-white/80 mr-3" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-transparent text-white placeholder-white/60 outline-none"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="flex items-center bg-white/10 border border-white/20 rounded-lg px-4 py-3 hover:border-blue-400 transition">
            <FaLock className="text-white/80 mr-3" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full bg-transparent text-white placeholder-white/60 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2.5 rounded-lg text-lg font-semibold tracking-wide shadow-md hover:shadow-lg transition-all duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-white/80 text-sm text-center mt-6">
          Don’t have an account?{' '}
          <a href="/adminapp/adminregister" className="text-blue-400 hover:underline">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
