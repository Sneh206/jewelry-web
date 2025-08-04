import React, { useEffect, useState } from 'react';
import axios from 'axios';

const subjectColor = {
  "General Inquiry": "bg-blue-100 text-blue-800",
  "Custom jewelry": "bg-green-100 text-green-800",
  "Repair services": "bg-yellow-100 text-yellow-800",
  "Schedule Appointment": "bg-purple-100 text-purple-800",
};

const AdminContactUs = () => {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null); // Track the contact being edited
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const fetchContacts = async () => {
    try {
      const res = await axios.get('http://localhost:8000/contactUs/all');
      setContacts(res.data);
    } catch (err) {
      console.error("Error fetching contacts:", err);
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm("Are you sure to delete this entry?")) return;
    try {
      await axios.delete(`http://localhost:8000/contactUs/delete/${id}`, {
        withCredentials: true,
      });
      setContacts(prev => prev.filter(c => c._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const startEdit = (contact) => {
    setEditingContact(contact._id);
    setEditFormData({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      subject: contact.subject,
      message: contact.message,
    });
  };

  const cancelEdit = () => {
    setEditingContact(null);
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const saveEdit = async () => {
    try {
      const res = await axios.put(`http://localhost:8000/contactUs/update/${editingContact}`, editFormData, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setContacts(prev =>
          prev.map(c => (c._id === editingContact ? { ...c, ...editFormData } : c))
        );
        setEditingContact(null);
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2 text-center">
        📬 Contact Us Submissions
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider text-center">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Subject</th>
              <th className="p-4">Message</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length > 0 ? (
              contacts.map((c) => (
                <tr key={c._id} className="text-center align-middle hover:bg-gray-100 transition">
                  {editingContact === c._id ? (
                    <>
                      <td className="p-2">
                        <input
                          type="text"
                          name="name"
                          value={editFormData.name}
                          onChange={handleEditChange}
                          className="border border-gray-300 p-1 rounded w-full"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="email"
                          name="email"
                          value={editFormData.email}
                          onChange={handleEditChange}
                          className="border border-gray-300 p-1 rounded w-full"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          name="phone"
                          value={editFormData.phone}
                          onChange={handleEditChange}
                          className="border border-gray-300 p-1 rounded w-full"
                        />
                      </td>
                      <td className="p-2">
                        <select
                          name="subject"
                          value={editFormData.subject}
                          onChange={handleEditChange}
                          className="border border-gray-300 p-1 rounded w-full"
                        >
                          <option>General Inquiry</option>
                          <option>Custom jewelry</option>
                          <option>Repair services</option>
                          <option>Schedule Appointment</option>
                        </select>
                      </td>
                      <td className="p-2">
                        <textarea
                          name="message"
                          value={editFormData.message}
                          onChange={handleEditChange}
                          className="border border-gray-300 p-1 rounded w-full"
                        ></textarea>
                      </td>
                      <td className="p-2 space-x-2">
                        <button
                          onClick={saveEdit}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-sm"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded-full text-sm"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-4">{c.name}</td>
                      <td className="p-4">
                        <a href={`mailto:${c.email}`} className="text-blue-600 underline">{c.email}</a>
                      </td>
                      <td className="p-4">{c.phone}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${subjectColor[c.subject] || 'bg-gray-200 text-gray-800'}`}>
                          {c.subject}
                        </span>
                      </td>
                      <td className="p-4 text-sm">{c.message}</td>
                      <td className="p-4 space-x-2">
                        <button
                          onClick={() => startEdit(c)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteContact(c._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr className="text-center">
                <td colSpan="6" className="p-8 text-gray-500 text-lg">
                  💤 No submissions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminContactUs;
