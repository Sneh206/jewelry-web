// src/admin/components/ProductForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../page/AdminHeader';

const ProductForm = () => {

    const naviget = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category:'',
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('image', formData.image);
    data.append('category',formData.category);
    data.append('createdAt', new Date().toISOString());

    try {
      const res = await axios.post('http://localhost:8000/adminproduct/add-product', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log(res.data);
      
      setMessage('Product created successfully!');
      setFormData({
        title: '',
        description: '',
        price: '',
        image: null,
      });

      naviget('/adminapp/admin');


    } catch (error) {
      setMessage('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className=" top-0 z-50 shadow-md m-6">
        <AdminHeader />
      </div>
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>

      <div className="mb-4">
        <label className="block font-medium mb-1">Title</label>
        <input
          type="text"
          name="title"
          className="w-full border p-2 rounded"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Description</label>
        <textarea
          name="description"
          className="w-full border p-2 rounded"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Price ($)</label>
        <input
          type="number"
          name="price"
          className="w-full border p-2 rounded"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Image</label>
        <input
          type="file"
          name="image"
           className="w-full border p-2 rounded"
          accept="image/*"
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">category</label>
        <input
          type="text"
          name="category"
          className="w-full border p-2 rounded"
          value={formData.category}
          onChange={handleChange}
          required
        />
      </div>

      <button
        type="submit"
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Add Product'}
      </button>

      {message && <p className="mt-4 text-sm text-blue-600">{message}</p>}
    </form>
    </>
  );
};

export default ProductForm;
