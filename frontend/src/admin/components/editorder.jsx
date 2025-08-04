import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState('');

  const fetchOrder = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/orders/all`, {
        withCredentials: true,
      });
      setOrder(res.data.orders);
      setStatus(res.data.order.status);
    } catch (err) {
      console.error('Error fetching order:', err);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8000/orders/update/${id}`,
        { status },
        { withCredentials: true }
      );
      navigate('/adminapp/order');
    } catch (err) {
      console.error('Error updating order:', err);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  if (!order) return <p className="text-center p-10">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6">Edit Order Status</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Current Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="block w-full border px-3 py-2 rounded"
        >
          <option value="processing">Processing...</option>
          <option value="shipped">Shipped...</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <button
        onClick={handleUpdate}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Update Status
      </button>
    </div>
  );
};

export default EditOrder;
