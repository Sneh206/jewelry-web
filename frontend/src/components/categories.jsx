import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const [title, setTitle] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [category, setCategory] = useState('');
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:8000/adminproduct/', {
        withCredentials: true,
        params: { title, maxPrice, category },
      });
      setProducts(res.data.products || res.data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [title, maxPrice, category]);

  const handleCardClick = (productId) => {
    navigate(`/OrderPage/${productId}`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
        Explore Jewelry
      </h1>

      {/* Filter Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-10 shadow-md hover:shadow-lg transition duration-300">
        <div className="flex flex-col sm:flex-row gap-6 sm:items-end sm:justify-between">
          <div className="flex flex-col w-full sm:w-1/3">
            <label className="text-sm font-medium text-blue-900 mb-1">Search by Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Ring, Necklace..."
              className="p-2.5 border border-blue-200 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col w-full sm:w-1/4">
            <label className="text-sm font-medium text-blue-900 mb-1">Max Price</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="e.g. 1000"
              className="p-2.5 border border-blue-200 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col w-full sm:w-1/4">
            <label className="text-sm font-medium text-blue-900 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-2.5 border border-blue-200 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">All Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((p) => (
            <div
              key={p._id}
              onClick={() => handleCardClick(p._id)}
              className="relative cursor-pointer bg-white border border-yellow-300 rounded-3xl shadow-[0_10px_30px_rgba(255,204,0,0.3)] transform transition-transform duration-500 hover:scale-105 hover:-rotate-1 hover:shadow-[0_15px_40px_rgba(255,204,0,0.5)] group perspective"
              style={{ perspective: '1200px' }}
            >
              {/* Reflection/Glow Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent opacity-0 group-hover:opacity-25 rounded-3xl z-10 pointer-events-none" />

              <div className="rounded-t-3xl overflow-hidden h-56 bg-gradient-to-br from-yellow-50 to-white relative z-0">
                <img
                  src={`http://localhost:8000/uploads/${p.image}`}
                  alt={p.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/default.jpg';
                  }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-5 relative z-10">
                <h3 className="text-lg font-semibold text-gray-800 truncate">{p.title}</h3>
                <p className="text-sm text-gray-500 mb-1">Category: {p.category}</p>
                <p className="text-sm text-gray-500 mb-2">
                  {p.description || 'No description available'}
                </p>
                <p className="text-yellow-600 font-bold text-base">₹{p.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Categories;
