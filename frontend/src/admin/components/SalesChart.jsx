import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import axios from 'axios';
import AdminHeader from '../page/AdminHeader';

const Savechanges = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/adminproduct/photo', { withCredentials: true })
      .then((res) => {
        setProducts(res.data || []);
      })
      .catch((err) => console.error('Product fetch error:', err));
  }, []);

  // Count how many times each product title appears
  const productTitleCounts = products.reduce((acc, product) => {
    const title = product.title.trim();
    acc[title] = (acc[title] || 0) + 1;
    return acc;
  }, {});

  // Prepare data for Recharts
  const chartData = Object.entries(productTitleCounts).map(([title, count]) => ({
    name: title,
    count: count,
  }));

  return (
    <>
      <div className="top-0 z-50 shadow-md">
        <AdminHeader />
      </div>

      <div className="min-h-screen bg-white p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto bg-white bg-opacity-90 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-indigo-700">
            Product Count by Title
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#6366F1" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default Savechanges;
