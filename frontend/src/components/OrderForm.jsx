import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const OrderForm = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
    country: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/adminproduct/one/${productId}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log("Error fetching product:", err));
  }, [productId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!product || loading) return;

    setLoading(true);

    // Simulate 2-second delay
    setTimeout(() => {
      const orderData = {
        customerId: "687dcac8bacd2ae0848134e1", // Replace with real user ID
        customerName: formData.customerName,
        items: [
          {
            productId: product._id,
            title: product.title,
            quantity: 1,
            price: product.price,
            image: product.image,
          },
        ],
        totalAmount: product.price,
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          pincode: formData.pincode,
          state: formData.state,
          country: formData.country,
        },
      };

      axios
        .post("http://localhost:8000/orders/create", orderData, {
          withCredentials: true,
        })
        .then(() => {
          setSuccess(true);
          setTimeout(() => {
            setLoading(false);
            navigate("/");
          }, 3000);
        })
        .catch((err) => {
          console.error("Order error:", err);
          setLoading(false);
          alert("Failed to place order.");
        });
    }, 2000);
  };

  if (!product) return <p className="text-center mt-10">Loading product...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Order Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Customer Name</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"
            name="customerEmail"
            value={formData.customerEmail}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block font-semibold mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
        </div>

        {/* Product Summary */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-2">Product Summary</h3>
          <p className="mb-1">
            <strong>Product:</strong> {product.title}
          </p>
          <p className="mb-1">
            <strong>Category:</strong> {product.category}
          </p>
          <img
            src={product.image}
            alt={product.title}
            className="w-24 mt-2 rounded"
          />
          <p className="text-yellow-700 font-bold mt-2">
            <strong>Total Amount:</strong> ₹{product.price}
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white px-6 py-2 rounded font-semibold transition 
            ${success ? "bg-green-600 hover:bg-green-700" : "bg-yellow-600 hover:bg-yellow-700"} 
            ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {success ? "Order Placed!" : loading ? "Processing..." : "Place Order"}
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
