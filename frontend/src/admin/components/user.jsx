import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminHeader from '../page/AdminHeader';

const UserTable = () => {
  const [users, setuser] = useState([]);

  const useradmin = async () => {
    try {
      const res = await axios.get('http://localhost:8000/admin/all', {
        withCredentials: true,
      });
      setuser(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`http://localhost:8000/admin/delete/${id}`, {
        withCredentials: true,
      });
      useradmin();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete user.');
    }
  };

  useEffect(() => {
    useradmin();
  }, []);

  return (
    <>
      <AdminHeader />
      <div className="p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">User List</h2>
        <div className="overflow-x-auto shadow rounded-lg border border-gray-300">
          <table className="min-w-full text-sm sm:text-base text-left">
            <thead className="bg-gray-200 text-gray-800">
              <tr>
                <th className="px-4 py-2 border">Admin Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Password</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border text-center">Edit</th>
                <th className="px-4 py-2 border text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(users) && users.map((user, idx) => (
                <tr key={idx} className="hover:bg-gray-100 text-gray-700">
                  <td className="px-4 py-2 border break-words">{user.name}</td>
                  <td className="px-4 py-2 border break-words">{user.email}</td>
                  <td className="px-4 py-2 border break-words">{user.password}</td>
                  <td className="px-4 py-2 border break-words">{user.phone}</td>
                  <td className="px-4 py-2 border text-center">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs sm:text-sm">
                      Edit
                    </button>
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs sm:text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {(!Array.isArray(users) || users.length === 0) && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserTable;
