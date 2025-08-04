import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import axios from 'axios';
import AdminHeader from '../page/AdminHeader';

const Savechanges = () => {
  const [products, setProducts] = useState([]);
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/adminproduct/photo', { withCredentials: true })
      .then((res) => {
        const data = res.data || [];
        setProducts(data);
        combineProductQuantities(data);
      })
      .catch((err) => console.error('Product fetch error:', err));
  }, []);

  const combineProductQuantities = (productList) => {
    const grouped = {};

    productList.forEach((product) => {
      const title = product.title.trim();

      if (grouped[title]) {
        grouped[title].quantity += product.quantity || 0;
      } else {
        grouped[title] = {
          name: title,
          quantity: product.quantity || 0,
        };
      }
    });

    setCombinedData(Object.values(grouped));
  };

  return (
    <>
      <div className="top-0 z-50 shadow-md">
        <AdminHeader />
      </div>

      <div className="min-h-screen bg-white p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto bg-white bg-opacity-90 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-purple-700">
            Product Inventory Chart
          </h2>

          {/* Bar Chart */}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={combinedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="quantity" fill="#A855F7" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          {/* Product Summary - One Column */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mt-10">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Product Inventory Summary
            </h3>
            <div className="flex flex-col gap-4">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-purple-50 p-4 rounded-lg border border-purple-100 shadow hover:scale-[1.02] transform transition duration-300 ease-in-out"
                >
                  <p className="text-lg font-medium text-gray-700">{product.title}</p>
                  <p className="text-xl font-bold text-purple-700">Qty: {product.quantity}</p>
                  <p className="text-base font-semibold text-yellow-700">
                    ₹{product.price.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Savechanges;
