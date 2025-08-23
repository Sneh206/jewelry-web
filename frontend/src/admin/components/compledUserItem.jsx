import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "../page/AdminHeader.jsx";

const CompletedOrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCompletedOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/completed-orders/completed-orders-all"
        );
        setOrders(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to fetch completed orders", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedOrders();
  }, []);

  const filteredOrders = orders.filter(order =>
    order.orderId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading)
    return (
      <div className="p-6 text-center text-gray-500">Loading completed orders...</div>
    );
  if (!orders.length)
    return (
      <div className="p-6 text-center text-gray-500">No completed orders found.</div>
    );

  return (
    <>
      <div className="top-0 z-50 shadow-md m-6">
        <AdminHeader />
      </div>

      <div className="p-6 bg-gradient-to-br from-gray-50 via-yellow-50 to-pink-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center text-pink-700 drop-shadow-lg">
          💎 Completed Orders
        </h1>

        {/* Filter Input */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="🔍 Search by Order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md p-3 rounded-2xl shadow-inner border-2 border-pink-300
                       bg-gradient-to-r from-yellow-50 via-pink-50 to-purple-50
                       text-purple-700 font-semibold placeholder-purple-400
                       focus:outline-none focus:ring-4 focus:ring-pink-400
                       focus:border-pink-500 transition-all duration-300
                       hover:scale-105 hover:shadow-xl"
          />
        </div>

        <div className="overflow-x-auto shadow-2xl rounded-3xl border border-pink-200">
          <table className="min-w-full border-collapse rounded-3xl overflow-hidden">
            <thead className="bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 text-gray-700 uppercase text-sm shadow-md">
              <tr>
                <th className="p-4 border-r border-pink-300">Order ID</th>
                <th className="p-4 border-r border-pink-300">Customer ID</th>
                <th className="p-4 border-r border-pink-300">Message</th>
                <th className="p-4">Created Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:scale-105 hover:bg-gradient-to-r from-yellow-50 via-pink-50 to-purple-50 transition-all duration-300 shadow-inner"
                >
                  <td className="p-4 border-r border-pink-100 font-mono text-purple-700">
                    {order.orderId || "N/A"}
                  </td>
                  <td className="p-4 border-r border-pink-100 font-semibold text-pink-600">
                    {order.customerId || "N/A"}
                  </td>
                  <td className="p-4 border-r border-pink-100 italic text-pink-500">
                    {order.message || "No message"}
                  </td>
                  <td className="p-4 text-sm text-gray-600 font-medium">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-6 text-center text-gray-400">
                    No orders match this Order ID.
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

export default CompletedOrdersList;
