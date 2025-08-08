import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Photo = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/adminproduct/photo", { withCredentials: true })
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleCardClick = (productId) => {
    navigate(`/OrderPage/${productId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 bg-gradient-to-br from-yellow-50 to-white">
      <h2 className="text-4xl font-extrabold mb-12 text-center text-yellow-800 drop-shadow-md">
        7D Showcase Gallery
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              onClick={() => handleCardClick(product._id)}
              className="relative cursor-pointer group rounded-3xl shadow-2xl overflow-hidden bg-white border border-yellow-300 transform transition-all duration-700 hover:scale-105 hover:rotate-[1.5deg] hover:-translate-y-3"
              style={{
                perspective: "2000px",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Floating sparkles / lighting effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-yellow-100/10 opacity-0 group-hover:opacity-50 transition duration-500 z-10 pointer-events-none blur-md" />

              {/* Inner image section */}
              <div className="relative w-full h-64 overflow-hidden rounded-t-3xl bg-gradient-to-br from-yellow-50 to-white">
                <img
                  src={`http://localhost:8000/uploads/${product.image}`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default.jpg";
                  }}
                  alt={product.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 transform group-hover:scale-110 group-hover:rotate-1"
                />
              </div>

              {/* Card content */}
              <div className="p-5 text-center relative z-20">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-yellow-600 transition">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                <p className="text-xl font-bold text-yellow-700">₹{product.price}</p>
              </div>

              {/* Shadow below card */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-3/4 h-3 bg-yellow-300 rounded-full blur-md opacity-70 group-hover:scale-110 transition duration-500 z-0" />
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Photo;
