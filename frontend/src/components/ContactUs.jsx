import React, { useState } from "react";
import axios from "axios";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setError("All fields are required.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/contactUs/create", formData,{withCredentials : true});
      if (res.status === 201 || res.status === 200) {
        setSuccess("Thank you! Your message has been sent.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "General Inquiry",
          message: "",
        });
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-10"
    >
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-sm shadow-lg rounded-lg p-8">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Contact Us</h2>

        {success && <p className="text-green-600 mb-4">{success}</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Subject</label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-400"
              required
            >
              <option>General Inquiry</option>
              <option>Custom jewelry</option>
              <option>Repair services</option>
              <option>Schedule Appointment</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-400"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded font-semibold transition"
          >
            ✉️ Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
