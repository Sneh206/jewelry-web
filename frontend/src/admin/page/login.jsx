import React, { useState } from 'react';
import axios from 'axios';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useAuth } from '../../AuthProvider';
import { useNavigate, Link } from 'react-router-dom';

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

      console.log(response.data.admin); // Save to cookie
      setSuccess('✅ Login successful!');
      navigate('/adminapp/admin');
    } catch (err) {
      setError(err.response?.data?.message || '❌ Server error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 px-4">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-lg space-y-6 border border-white/20">
        <h2 className="text-3xl font-bold text-center text-white">Admin Login</h2>

        {error && <p className="text-red-400 text-center font-medium">{error}</p>}
        {success && <p className="text-green-400 text-center font-medium">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="flex items-center bg-white/10 border border-white/20 rounded-md px-4 py-2">
            <FaEnvelope className="text-white mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent text-white placeholder-white/70 outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center bg-white/10 border border-white/20 rounded-md px-4 py-2">
            <FaLock className="text-white mr-2" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-transparent text-white placeholder-white/70 outline-none"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="flex items-center bg-white/10 border border-white/20 rounded-md px-4 py-2">
            <FaLock className="text-white mr-2" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full bg-transparent text-white placeholder-white/70 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-lg font-semibold transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-white text-sm text-center mt-4">
          Don’t have an account?{' '}
          <a href="/adminregister" className="text-blue-400 hover:underline">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
