import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/adminproduct/products", {
        withCredentials: true,
      });

      const fetchedProducts = res.data.products || res.data;

      if (Array.isArray(fetchedProducts)) {
        setProducts(fetchedProducts);
      } else {
        setError("Invalid data format from server.");
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("Unable to fetch products. Please try again.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCardClick = (productId) => {
    navigate(`/OrderPage/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-yellow-100 py-10 px-4">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
        💍 Our Jewelry Collection
      </h2>

      {error && (
        <div className="text-center text-red-500 font-semibold mb-4">{error}</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              onClick={() => handleCardClick(product._id)}
              className="bg-white rounded-xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition duration-300"
            >
              <div className="overflow-hidden rounded-t-2xl">
                <img
                  src={
                    product.image
                      ? `http://localhost:8000/uploads/${product.image}`
                      : "/default.jpg"
                  }
                  alt={product.title}
                  className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.title}
                </h3>
                <p className="text-yellow-600 font-bold mt-2">
                  ₹{product.price}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 text-lg">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Products;
