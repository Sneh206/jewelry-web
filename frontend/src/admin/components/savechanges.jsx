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
        combineProductPrices(data);
      })
      .catch((err) => console.error("Product fetch error:", err));
  }, []);

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

      <div className="min-h-screen bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto bg-white bg-opacity-90 rounded-3xl p-6 shadow-2xl">
          <h2 className="text-3xl font-bold mb-8 text-center text-purple-700 drop-shadow-md">
            🧾 Product Price Summary Chart
          </h2>

          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-xl transform hover:scale-[1.01] transition duration-300">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={combinedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                <Bar
                  dataKey="totalPrice"
                  fill="#A855F7"
                  radius={[10, 10, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Product List Summary */}
          <div className="bg-white p-6 rounded-3xl shadow-2xl mt-10">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800 drop-shadow-sm">
              📦 Product Inventory Summary (Combined)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {combinedData.map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-purple-100 to-purple-200 p-6 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-lg border border-purple-300 transition-transform hover:translate-y-[-6px] hover:shadow-2xl duration-300"
                >
                  <p className="text-lg font-medium text-gray-800 mb-2">
                    {item.name}
                  </p>
                  {item.quantity !== undefined && (
                    <p className="text-xl font-bold text-purple-800">
                      Total Qty: {item.quantity}
                    </p>
                  )}
                  {item.totalPrice !== undefined && (
                    <p className="text-lg font-semibold text-yellow-700 mt-1">
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
