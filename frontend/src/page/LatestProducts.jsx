import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LatestProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/adminproduct/latest")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleCardClick = (productId) => {
    navigate(`/OrderPage/${productId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-14 bg-gradient-to-br from-yellow-50 to-white">
      <h2 className="text-4xl font-bold mb-12 text-center text-yellow-800 drop-shadow-lg">
        🌟 Latest 7D Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              onClick={() => handleCardClick(product._id)}
              className="cursor-pointer group perspective transform-style-3d transition-transform duration-500 hover:-rotate-x-2 hover:rotate-y-2 hover:scale-105"
            >
              <div
                className="bg-white rounded-3xl border border-yellow-400 shadow-2xl p-4 hover:shadow-yellow-300 transition-all duration-500 transform hover:scale-105 relative overflow-hidden"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 rounded-3xl border-2 border-yellow-400 animate-pulse blur-sm opacity-10 pointer-events-none z-0"></div>

                <div className="w-full h-56 rounded-2xl overflow-hidden z-10 relative">
                  <img
                    src={`http://localhost:8000/uploads/${product.image}`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/default.jpg";
                    }}
                    alt={product.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                  />
                </div>

                <div className="p-4 text-center space-y-1 z-10 relative">
                  <h3 className="font-bold text-lg text-gray-800 truncate drop-shadow-sm">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                  <p className="text-yellow-600 font-bold text-lg">
                    ₹{product.price}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No latest products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default LatestProducts;
