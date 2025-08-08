import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const OrderPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    productId &&
      axios
        .get(`http://localhost:8000/adminproduct/one/${productId}`)
        .then((res) => setProduct(res.data))
        .catch(() => {});
  }, [productId]);

  if (!product) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-6">
        <img
          src={`http://localhost:8000/uploads/${product.image}`}
          alt={product.title}
          className="w-full md:w-1/2 h-64 object-cover rounded-xl"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
          <p className="text-gray-600 mb-2">{product.category}</p>
          <p className="text-yellow-700 text-xl font-semibold mb-6">₹{product.price}</p>
          <button
            onClick={() => navigate(`/order-form/${product._id}`)}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
