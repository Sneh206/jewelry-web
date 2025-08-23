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
        params: { title: "bracelets" },
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 py-8 px-3 sm:px-6 md:px-10">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-yellow-800 mb-8 drop-shadow-md">
        ✨ Bracelets Collection
      </h2>

      {error && (
        <div className="text-center text-red-500 font-semibold mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10 max-w-7xl mx-auto">
        {bracelets.length > 0 ? (
          bracelets.map((item) => (
            <div
              onClick={() => handleCardClick(item._id)}
              key={item._id}
              className="group bg-white/60 backdrop-blur-sm border border-yellow-100 rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl hover:scale-[1.02] sm:hover:scale-105 transform transition-all duration-500 ease-in-out cursor-pointer overflow-hidden"
            >
              <div className="relative">
                <img
                  src={`http://localhost:8000/uploads/${item.image}`}
                  alt={item.title}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-t-2xl md:rounded-t-3xl transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 px-2 py-0.5 sm:px-3 sm:py-1 text-xs rounded-full shadow-md font-semibold">
                  Bestseller
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-yellow-700 transition duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {item.description || "No description available"}
                </p>
                <p className="mt-3 sm:mt-4 text-yellow-700 font-extrabold text-lg sm:text-xl drop-shadow-sm">
                  ₹{item.price}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 text-base sm:text-lg">
            No bracelets found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Bracelets;
