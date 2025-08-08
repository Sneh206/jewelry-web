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

  const [status, setStatus] = useState({ success: "", error: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setStatus({ success: "", error: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = formData;
    if (!name || !email || !phone || !message) {
      return setStatus({ success: "", error: "All fields are required." });
    }

    try {
      const res = await axios.post("http://localhost:8000/contactUs/create", formData, { withCredentials: true });
      if (res.status === 200 || res.status === 201) {
        setStatus({ success: "Thank you! Your message has been sent.", error: "" });
        setFormData({ name: "", email: "", phone: "", subject: "General Inquiry", message: "" });
      }
    } catch {
      setStatus({ success: "", error: "Something went wrong. Please try again." });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-cover bg-center">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-sm shadow-lg rounded-lg p-8">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Contact Us</h2>

        {status.success && <p className="text-green-600 mb-4">{status.success}</p>}
        {status.error && <p className="text-red-600 mb-4">{status.error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {["name", "email", "phone"].map((field) => (
            <div key={field}>
              <label className="block text-gray-700 font-semibold mb-1">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          ))}

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Subject</label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-400"
              required
            >
              {["General Inquiry", "Custom jewelry", "Repair services", "Schedule Appointment"].map((option) => (
                <option key={option}>{option}</option>
              ))}
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
