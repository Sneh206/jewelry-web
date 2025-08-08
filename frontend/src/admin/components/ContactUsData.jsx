import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "../page/AdminHeader";

const ContactUsData = () => {
  const [queries, setQueries] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const res = await axios.get("http://localhost:8000/contactUs/all", {
          withCredentials: true,
        });

        const data = res.data.success ? res.data.data : res.data;
        setQueries(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch contact queries:", err);
        setError("Unable to fetch contact messages.");
      }
    };

    fetchQueries();
  }, []);

  return (
    <>
      <div className="top-0 z-50 shadow-md">
        <AdminHeader />
      </div>

      <div className="min-h-screen bg-gradient-to-r from-gray-100 via-white to-gray-100 px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-10 border-b-4 border-blue-400 pb-2 drop-shadow-md">
            📨 Contact Messages Dashboard
          </h2>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-3 rounded shadow-lg mb-4">
              {error}
            </div>
          )}

          {queries.length === 0 && !error ? (
            <div className="text-center text-gray-500 mt-20 text-xl">
              No contact messages found.
            </div>
          ) : (
            <div className="overflow-x-auto bg-white rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-[1.01]">
              <table className="min-w-full text-sm text-left text-gray-700">
                <thead className="bg-gradient-to-r from-blue-100 to-blue-200 text-gray-700 text-sm shadow-md">
                  <tr>
                    <th className="p-5">👤 Name</th>
                    <th className="p-5">📧 Email</th>
                    <th className="p-5">📱 Phone</th>
                    <th className="p-5">📌 Subject</th>
                    <th className="p-5">📝 Message</th>
                    <th className="p-5">⏱️ Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {queries.map((q) => (
                    <tr
                      key={q._id}
                      className="border-b hover:bg-blue-50 transition-all duration-300"
                    >
                      <td className="p-5 font-semibold">{q.name}</td>
                      <td className="p-5">{q.email}</td>
                      <td className="p-5">{q.phone || "N/A"}</td>
                      <td className="p-5">{q.subject || "N/A"}</td>
                      <td className="p-5 max-w-xs break-words">{q.message}</td>
                      <td className="p-5 text-xs text-gray-500">
                        {new Date(q.submittedAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ContactUsData;
