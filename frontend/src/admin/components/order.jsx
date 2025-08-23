import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminHeader from '../page/AdminHeader.jsx';

const AdminOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [searchOrderId, setSearchOrderId] = useState(''); // Filter state

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:8000/orders/all', {
        withCredentials: true,
      });

      const enrichedOrders = res.data.orders.map(order => {
        const calculatedTotal = order.items.reduce((sum, item) => {
          return sum + item.quantity * item.price;
        }, 0);
        return { ...order, totalAmount: calculatedTotal };
      });

      setOrders(enrichedOrders);

      const revenue = enrichedOrders
        .filter(order => order.status.toLowerCase() !== 'processing')
        .reduce((sum, order) => sum + order.totalAmount, 0);

      setTotalRevenue(revenue);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/orders/delete/${id}`, {
        withCredentials: true,
      });
      fetchOrders();
    } catch (err) {
      console.error('Error deleting order:', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order =>
    (order.orderId || order._id)
      .toLowerCase()
      .includes(searchOrderId.toLowerCase())
  );

  return (
    <>
      <div className="top-0 z-50 shadow-md m-6">
        <AdminHeader />
      </div>

      <div className="min-h-screen flex justify-center bg-gradient-to-br from-gray-50 to-white px-4 py-8">
        <div className="max-w-7xl w-full space-y-8">

          {/* Total Revenue Card */}
          <div className="p-6 bg-yellow-100 border border-yellow-300 rounded-2xl shadow-2xl transform transition-all hover:scale-[1.02] duration-300">
            <h2 className="text-2xl font-bold text-yellow-800 text-center">
              💰 Total Payment Received
            </h2>
            <p className="text-4xl mt-3 font-extrabold text-green-600 text-center">
              ₹{totalRevenue.toFixed(2)}
            </p>
          </div>

          {/* Search Bar with 3D jewel style */}
          <div className="flex justify-end mb-6">
            <input
              type="text"
              placeholder="🔍 Search Order ID..."
              value={searchOrderId}
              onChange={(e) => setSearchOrderId(e.target.value)}
              className="w-64 p-3 rounded-2xl
                         bg-gradient-to-r from-yellow-50 via-pink-50 to-purple-50
                         text-purple-700 font-semibold placeholder-purple-400
                         border-2 border-pink-300 shadow-inner
                         focus:outline-none focus:ring-4 focus:ring-pink-400
                         hover:scale-105 hover:shadow-xl transition-all duration-300"
            />
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
            <h1 className="text-3xl font-bold py-6 bg-gray-100 text-center text-gray-800 shadow-sm">
              📦 All Orders
            </h1>

            <div className="overflow-x-auto">
              <table className="w-full table-auto text-sm text-left text-gray-700">
                <thead className="bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 text-gray-700 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Order ID</th>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Items</th>
                    <th className="px-4 py-3">Qty</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Total</th>
                    <th className="px-4 py-3">Payment</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Shipping</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Edit</th>
                    <th className="px-4 py-3">Delete</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {filteredOrders.length ? (
                    filteredOrders.map((order, idx) => (
                      <tr
                        key={order._id}
                        className="hover:scale-[1.02] hover:bg-gradient-to-r from-yellow-50 via-pink-50 to-purple-50 transition-all duration-300 shadow-inner"
                      >
                        <td className="px-4 py-3">{idx + 1}</td>
                        <td className="px-4 py-3 font-mono text-xs text-indigo-600 break-all">
                          {order.orderId || order._id}
                        </td>
                        <td className="px-4 py-3 font-semibold">{order.customerName}</td>
                        <td className="px-4 py-3 text-xs text-gray-500 break-all">
                          {order.customerEmail || 'N/A'}
                        </td>
                        <td className="px-4 py-3 space-y-2">
                          {order.items.map((item, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <img
                                src={
                                  item.image.startsWith('http')
                                    ? item.image
                                    : `http://localhost:8000/uploads/${item.image}`
                                }
                                alt={item.title}
                                className="h-10 w-10 rounded shadow object-cover border"
                              />
                              <p className="text-sm font-medium">{item.title}</p>
                            </div>
                          ))}
                        </td>
                        <td className="px-4 py-3 space-y-2">
                          {order.items.map((item, i) => (
                            <p key={i} className="text-sm">x {item.quantity}</p>
                          ))}
                        </td>
                        <td className="px-4 py-3 space-y-2">
                          {order.items.map((item, i) => (
                            <p key={i} className="text-sm">₹{item.price}</p>
                          ))}
                        </td>
                        <td className="px-4 py-3 text-green-600 font-bold">
                          ₹{order.totalAmount.toFixed(2)}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              order.paymentStatus === 'Paid'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {order.paymentStatus}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs font-medium">
                          <span
                            className={`px-2 py-1 rounded-full font-semibold text-xs ${
                              order.status.toLowerCase() === 'processing'
                                ? 'text-red-600 bg-red-100'
                                : order.status.toLowerCase() === 'shipped'
                                ? 'text-yellow-700 bg-yellow-100'
                                : order.status.toLowerCase() === 'delivered'
                                ? 'text-green-600 bg-green-100'
                                : order.status.toLowerCase() === 'cancelled'
                                ? 'text-red-600 bg-red-100'
                                : 'text-gray-600 bg-gray-100'
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-600">
                          {order.shippingAddress?.address}, {order.shippingAddress?.city}
                          <br />
                          {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <Link
                            to={`/adminapp/order/editorder/${order._id}`}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-xs rounded shadow"
                          >
                            Edit
                          </Link>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => deleteOrder(order._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-xs rounded shadow"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="15" className="text-center py-6 text-gray-400">
                        No orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminOrderPage;
