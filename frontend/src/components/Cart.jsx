import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    if (storedCart.length === 0) {
      setCartItems([]);
      return;
    }

    const orderIds = storedCart.map((item) => item.orderId);

    axios
      .post("http://localhost:8000/orders/check-cart", { orderIds })
      .then((res) => {
        setCartItems(res.data);
        localStorage.setItem("cart", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.error("Error checking cart:", err);
        setCartItems(storedCart);
      });
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, order) => {
      return (
        total +
        order.items.reduce(
          (orderSum, item) => orderSum + (item.price || 0) * (item.quantity || 1),
          0
        )
      );
    }, 0);
  };

  const getStatusClasses = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "text-yellow-700 bg-yellow-100";
      case "processing":
        return "text-indigo-700 bg-indigo-100";
      case "shipped":
        return "text-teal-700 bg-teal-100";
      case "delivered":
        return "text-green-700 bg-green-100";
      case "cancelled":
        return "text-red-700 bg-red-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied: " + text);
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 rounded-2xl shadow-2xl bg-white">
      <h2 className="text-3xl font-bold mb-8 text-center text-black-700 drop-shadow-lg">
        🛒 Your Cart
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg italic">Your cart is empty.</p>
      ) : (
        cartItems.map((order) => (
          <div
            key={order._id || order.orderId}
            className="mb-10 border border-pink-200 p-6 rounded-2xl shadow-inner hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 bg-white"
          >
            {/* Order ID & Customer ID */}
            <div className="mb-4 space-y-1">
              <p className="text-lg font-semibold text-purple-700">
                Order ID:{" "}
                <span
                  className="font-mono text-indigo-600 cursor-pointer hover:underline"
                  onClick={() => copyToClipboard(order.orderId)}
                  title="Click to copy"
                >
                  {order.orderId || order._id}
                </span>
              </p>
              <p className="text-lg font-semibold text-purple-700">
                Customer ID:{" "}
                <span
                  className="font-mono text-pink-600 cursor-pointer hover:underline"
                  onClick={() => copyToClipboard(order.customerId)}
                  title="Click to copy"
                >
                  {order.customerId || "N/A"}
                </span>
              </p>
            </div>

            {/* Order Status */}
            {order.status && (
              <div className="mb-6">
                <span
                  className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${getStatusClasses(
                    order.status
                  )}`}
                >
                  Order Status: {order.status}
                </span>
              </div>
            )}

            {/* Completed Button */}
            <div className="flex justify-end mb-4">
              <Link
                to="/Order-Completed"
                className="px-6 py-3 bg-red-400 font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transform transition duration-200 ease-in-out flex items-center space-x-2"
              >
                <span>✅</span>
                <span>Completed</span>
              </Link>
            </div>

            {/* Items List */}
            {order.items.map((item) => (
              <div
                key={item._id || item.orderId}
                className="flex items-center justify-between border-b border-pink-200 py-4 last:border-b-0"
              >
                <div className="flex items-center space-x-6">
                  <img
                    src={`http://localhost:8000/uploads/${item.image}`}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-lg border border-purple-200 shadow-lg"
                  />
                  <div>
                    <h4 className="font-semibold text-purple-700 text-lg">{item.title}</h4>
                    <p className="text-indigo-700 font-semibold">₹{item.price ?? "N/A"}</p>
                    <p className="text-gray-600">Qty: {item.quantity || 1}</p>
                    {item.status && (
                      <p className="text-sm text-green-600 mt-1 font-medium">Item Status: {item.status}</p>
                    )}
                  </div>
                </div>
                <div className="text-xl font-bold text-indigo-700">
                  ₹{(item.price || 0) * (item.quantity || 1)}
                </div>
              </div>
            ))}

            {/* Order Total */}
            <div className="text-right mt-6 font-bold text-2xl text-purple-700">
              Order Total: ₹
              {order.items.reduce(
                (orderSum, item) => orderSum + (item.price || 0) * (item.quantity || 1),
                0
              )}
            </div>
          </div>
        ))
      )}

      {/* Grand Total */}
      {cartItems.length > 0 && (
        <div className="text-right mt-12 border-t pt-8 text-3xl font-extrabold text-pink-700 drop-shadow-lg">
          Grand Total: ₹{calculateTotal()}
        </div>
      )}
    </div>
  );
};

export default Cart;
