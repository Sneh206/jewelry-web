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
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-10 text-center text-yellow-800">
        Latest Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              onClick={() => handleCardClick(product._id)}
              className="cursor-pointer bg-white rounded-3xl border border-yellow-400 shadow hover:shadow-lg hover:-translate-y-1 transform transition-all duration-300"
            >
              <div className="w-full h-56 rounded-t-3xl overflow-hidden">
                <img
                  src={`http://localhost:8000/uploads/${product.image}`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default.jpg";
                  }}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg text-gray-800 truncate">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-500">{product.category}</p>
                <p className="text-yellow-600 font-bold text-base">₹{product.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No latest products found.</p>
        )}
      </div>
    </div>
  );
};

export default LatestProducts;
