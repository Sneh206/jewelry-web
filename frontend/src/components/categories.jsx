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

      {/* Filter Box with Hover */}
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

      {/* All Products Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">All Products</h2>

      {/* Product Grid with Hover */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((p) => (
            <div
              key={p._id}
              onClick={() => handleCardClick(p._id)}
              className="bg-white border border-yellow-200 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <img
                src={`http://localhost:8000/uploads/${p.image}`}
                alt={p.title}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{p.title}</h3>
                <p className="text-sm text-gray-600">Category: {p.category}</p>
                <p className="text-sm text-gray-500 mb-2">
  {p.description || 'No description available'}
</p>

                <p className="text-lg font-bold text-yellow-600">₹{p.price}</p>
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
