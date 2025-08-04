import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Bracelets = () => {
  const [bracelets, setBracelets] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchBracelets = async () => {
    try {
      const res = await axios.get("http://localhost:8000/adminproduct/", {
        params: { title: "bracelets" }, // 👈 filtering by title
        withCredentials: true,
      });

      const data = res.data.products || res.data;

      if (Array.isArray(data)) {
        setBracelets(data);
      } else {
        setError("Invalid data format received.");
      }
    } catch (err) {
      console.error("Failed to fetch bracelets:", err);
      setError("Could not load bracelets. Please try again.");
    }
  };

  useEffect(() => {
    fetchBracelets();
  }, []);

  const handleCardClick = (productId) => {
    navigate(`/OrderPage/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-yellow-100 py-10 px-4">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
        🪙 Bracelets Collection
      </h2>

      {error && (
        <div className="text-center text-red-500 font-medium mb-4">{error}</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {bracelets.length > 0 ? (
          bracelets.map((item) => (
            <div
              onClick={() => handleCardClick(item._id)}
              key={item._id}
              className="bg-white rounded-2xl border border-yellow-100 shadow hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <img

                src={`http://localhost:8000/uploads/${item.image}`}
                alt={item.title}
                className="w-full h-56 object-cover rounded-t-2xl"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {item.description || "No description available"}
                </p>
                <p className="mt-2 text-yellow-600 font-bold text-lg">
                  ₹{item.price}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 text-lg">
            No bracelets found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Bracelets;
