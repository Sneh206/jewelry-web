import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('❌ Passwords do not match');
      setSuccess('');
      return;
    }

    if (formData.password.length < 6) {
      setError('❌ Password must be at least 6 characters');
      setSuccess('');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/admin/register',
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setError('');
        setSuccess('✅ Registered successfully! Redirecting...');
        navigate('/adminlogin');
      } else {
        setError(response.data.message || '❌ Registration failed');
        setSuccess('');
      }
    } catch (err) {
      setError(err.response?.data?.message || '❌ Server error');
      setSuccess('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 px-4">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-lg space-y-6 border border-white/20">
        <h2 className="text-3xl font-bold text-center text-white">Admin Registration</h2>

        {error && <p className="text-red-400 text-center font-medium">{error}</p>}
        {success && <p className="text-green-400 text-center font-medium">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center bg-white/10 border border-white/20 rounded-md px-4 py-2 focus-within:ring-2 focus-within:ring-blue-400">
            <FaUser className="text-white mr-2" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-transparent text-white placeholder-white/70 outline-none"
              required
            />
          </div>

          <div className="flex items-center bg-white/10 border border-white/20 rounded-md px-4 py-2 focus-within:ring-2 focus-within:ring-blue-400">
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

          <div className="flex items-center bg-white/10 border border-white/20 rounded-md px-4 py-2 focus-within:ring-2 focus-within:ring-blue-400">
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

          <div className="flex items-center bg-white/10 border border-white/20 rounded-md px-4 py-2 focus-within:ring-2 focus-within:ring-blue-400">
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

          <div className="flex items-center bg-white/10 border border-white/20 rounded-md px-4 py-2 focus-within:ring-2 focus-within:ring-blue-400">
            <FaPhone className="text-white mr-2" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-transparent text-white placeholder-white/70 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-lg font-semibold transition duration-300"
          >
            Register
          </button>
        </form>

        <div className="flex justify-between text-sm mt-4">
          <p className="text-white">
            Already have an account?{' '}
            <Link to="/adminlogin" className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>
          <Link to="/changepassword" className="text-blue-400 hover:underline">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
