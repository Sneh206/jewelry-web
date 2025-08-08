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
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-[0_0_30px_rgba(255,255,255,0.1)] w-full max-w-xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]">
        <h2 className="text-4xl font-bold text-center text-white mb-6 drop-shadow-md">Admin Registration</h2>

        {error && <p className="text-red-400 text-center font-medium mb-2">{error}</p>}
        {success && <p className="text-green-400 text-center font-medium mb-2">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { icon: FaUser, name: "name", type: "text", placeholder: "Full Name" },
            { icon: FaEnvelope, name: "email", type: "email", placeholder: "Email Address" },
            { icon: FaLock, name: "password", type: "password", placeholder: "Password" },
            { icon: FaLock, name: "confirmPassword", type: "password", placeholder: "Confirm Password" },
            { icon: FaPhone, name: "phone", type: "tel", placeholder: "Phone Number" },
          ].map(({ icon: Icon, name, type, placeholder }) => (
            <div key={name} className="flex items-center bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
              <Icon className="text-white mr-3 text-lg" />
              <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                className="w-full bg-transparent text-white placeholder-white/60 outline-none"
                required
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 hover:shadow-lg text-white py-2.5 rounded-xl text-lg font-semibold transition-all duration-300 shadow-md"
          >
            Register
          </button>
        </form>

        <div className="flex justify-between text-sm mt-6 text-white">
          <p>
            Already have an account?{' '}
            <Link to="/adminapp/adminlogin" className="text-blue-400 hover:underline">
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
