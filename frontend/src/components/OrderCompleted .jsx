import React, { useState } from "react";
import axios from "axios";

const OrderCompleted = () => {
  const [orderId, setOrderId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [message, setMessage] = useState("");
  const [responseMsg, setResponseMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:8000/completed-orders/completed-orders-create",
        {
          orderId,
          customerId,
          customerName,
          message,
        }
      );

      setResponseMsg("✅ Completed order created successfully!");
      setOrderId("");
      setCustomerId("");
      setCustomerName("");
      setMessage("");
    } catch (error) {
      console.error(error);
      setResponseMsg("❌ Error creating order");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Create Completed Order</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Customer ID"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Create Order
        </button>
      </form>
      {responseMsg && (
        <p className="mt-3 text-center font-medium">{responseMsg}</p>
      )}
    </div>
  );
};

export default OrderCompleted;
