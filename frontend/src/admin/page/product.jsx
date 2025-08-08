import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Product = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:8000/adminproduct/products', {
        withCredentials: true,
      });
      setProducts(res.data.products); // Adjust if backend sends differently
    } catch (error) {
      console.error('Error fetching products:', error.response?.data || error.message);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
      const res = await axios.put(
        `http://localhost:8000/adminproduct/toggle-status/${id}`,
        { status: newStatus },
        { withCredentials: true }
      );
      console.log('Update response:', res.data.status);
      fetchProducts();
    } catch (error) {
      console.error('Error toggling status:', error.response?.data || error.message);
    }
  };

  const deleteproduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/adminproduct/delete-product/${id}`, {
        withCredentials: true,
      });
      fetchProducts(); // Refresh data after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-full px-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">🛍️ All Products</h2>
        <Link
          to="/adminapp/producttable"
          className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded shadow mt-4 sm:mt-0"
        >
          + ADD
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-300 shadow-md bg-white rounded-md">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              {[
                'ID',
                'Title',
                'Description',
                'Price',
                'Image',
                'Category',
                'Status',
                'Created',
                'Edit',
                'Delete',
              ].map((heading, i) => (
                <th
                  key={i}
                  className="py-3 px-6 border text-center text-xs sm:text-sm font-semibold"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, idx) => (
                <tr key={product._id} className="text-center hover:bg-gray-50">
                  <td className="py-2 px-4 border">{idx + 1}</td>
                  <td className="py-2 px-4 border">{product.title || 'Untitled'}</td>
                  <td className="py-2 px-4 border">{product.Description || 'Untitled'}</td>
                  <td className="py-2 px-4 border">₹{product.price || '0.00'}</td>
                  <td className="py-2 px-4 border">
                    <img
                      src={`http://localhost:8000/uploads/${product.image}`}
                      alt="product"
                      className="h-10 w-10 object-cover mx-auto rounded"
                    />
                  </td>
                  <td className="py-2 px-4 border">
                    {product.category || 'Uncategorized'}
                  </td>
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() =>
                        toggleStatus(product._id, product.status || 'Inactive')
                      }
                      className={`px-2 w-full h-full py-1 rounded text-xs text-white font-semibold ${
                        (product.status || 'Inactive') === 'Active'
                          ? 'bg-green-500'
                          : 'bg-red-500'
                      }`}
                    >
                      {product.status || 'Inactive'}
                    </button>
                  </td>
                  <td className="py-2 px-4 border">
                    {product.createdAt
                      ? new Date(product.createdAt).toLocaleDateString()
                      : 'N/A'}
                  </td>
                  <td className="py-2 px-4 border">
                    <Link
                      to={`/adminapp/editproduct/${product._id}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Edit
                    </Link>
                  </td>
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => deleteproduct(product._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Product;
