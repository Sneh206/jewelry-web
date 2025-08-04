import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import axios from "axios";
import AdminHeader from "../page/AdminHeader";

const Savechanges = () => {
  const [products, setProducts] = useState([]);
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/adminproduct/photo", {
        withCredentials: true,
      })
      .then((res) => {
        const data = res.data || [];
        setProducts(data);
        combineProductPrices(data); // Group and sum by title
      })
      .catch((err) => console.error("Product fetch error:", err));
  }, []);

  // Group products by title and sum prices
  const combineProductPrices = (productList) => {
    const grouped = {};

    productList.forEach((product) => {
      const title = product.title.trim();
      const price = product.price || 0;

      if (grouped[title]) {
        grouped[title].totalPrice += price;
      } else {
        grouped[title] = {
          name: title,
          totalPrice: price,
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
            Product Price Summary Chart
          </h2>

          {/* Bar Chart */}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={combinedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
              <Bar dataKey="totalPrice" fill="#A855F7" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          {/* Product List Summary */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mt-10">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Product Inventory Summary (Combined)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {combinedData.map((item, index) => (
                <div
                  key={index}
                  className="bg-purple-50 p-4 rounded-lg border border-purple-100 shadow hover:scale-[1.02] transform transition duration-300 ease-in-out"
                >
                  <p className="text-lg font-medium text-gray-700">
                    {item.name}
                  </p>
                  {item.quantity !== undefined && (
                    <p className="text-xl font-bold text-purple-700">
                      Total Qty: {item.quantity}
                    </p>
                  )}
                  {item.totalPrice !== undefined && (
                    <p className="text-base font-semibold text-yellow-700">
                      Total Price: ₹{item.totalPrice.toLocaleString()}
                    </p>
                  )}
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
