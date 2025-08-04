import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    image: '',
    status: 'Active',
  });

  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/adminproduct/product/${id}`, {
        withCredentials: true,
      });
      if (res.data && res.data.product) {
        setFormData(res.data.product);
      } else {
        alert('Product not found');
        navigate('/adminapp/products');
      }
      setLoading(false);
    } catch (err) {
      console.error('Error loading product:', err);
      alert('Could not connect to the backend. Make sure the server is running.');
      setLoading(false);
    }
  };
  fetchProduct();
}, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8000/adminproduct/edit-product/${id}`,
        formData,
        { withCredentials: true }
      );
      alert('Product updated successfully!');
      navigate('/adminapp/admin');
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update product.');
    }
  };

  if (loading) {
    return <div className="p-6">Loading product data...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-xl bg-white p-6 rounded shadow border"
      >
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            
          >
            <option value="">Select Category</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
