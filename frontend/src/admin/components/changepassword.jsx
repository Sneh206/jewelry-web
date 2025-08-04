import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const naviget = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { currentPassword, newPassword, confirmPassword } = formData;

    if (newPassword !== confirmPassword) {
      return setMessage('New password and confirm password do not match');
    }

    try {
      const res = await axios.post('http://localhost:8000/admin/change-password',
        {
          currentPassword,
          newPassword,
        },
        { withCredentials: true } // ✅ Sends cookie
      );
      setMessage(res.data.message);
      naviget('/')
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Change Password</h2>

        {message && (
          <p className="mb-4 text-center text-sm text-red-500 font-medium">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            className="w-full p-3 border border-gray-300 rounded-lg"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            className="w-full p-3 border border-gray-300 rounded-lg"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            className="w-full p-3 border border-gray-300 rounded-lg"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
