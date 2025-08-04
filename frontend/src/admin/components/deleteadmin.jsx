import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

const DeleteAdmin = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const useradmin = async () => {
    try {
      const res = await axios.get('http://localhost:8000/admin/all', {
        withCredentials: true,
      });
      setUsers(res.data);
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
      alert("User deleted successfully");
      useradmin(); // Refresh list
      navigate('/adminapp/admin');
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete user.');
    }
  };

  useEffect(() => {
    useradmin();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-red-600 mb-4">Account Deletion Warning</h2>
      <p className="text-sm text-gray-700 mb-6">
        Confirming account deletion will permanently remove this account within 24 hours. This action cannot be undone.
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && <p className="text-center text-gray-500 mt-4">No users found.</p>}
      </div>
    </div>
  );
};

export default DeleteAdmin;
