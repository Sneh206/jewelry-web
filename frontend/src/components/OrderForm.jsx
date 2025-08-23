import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const OrderForm = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?._id;
  const userEmail = storedUser?.email;

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: userEmail || "",
    address: "",
    city: "",
    pincode: "",
    state: "",
    country: "",
  });

  // Quantity state added
  const [quantity, setQuantity] = useState(1);

  // Coupon states
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountError, setDiscountError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/adminproduct/one/${productId}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [productId]);

  const validCoupons = {
    SNEH: 10,
    SNEH20: 20,
    VIP30: 30,
  };

  const applyCoupon = () => {
    const couponUpper = couponCode.trim().toUpperCase();
    if (validCoupons[couponUpper]) {
      setDiscountPercent(validCoupons[couponUpper]);
      setDiscountError("");
    } else {
      setDiscountPercent(0);
      setDiscountError("Invalid coupon code");
    }
  };

  // Calculate discounted price for one item
  const discountedUnitPrice = product
    ? product.price - (product.price * discountPercent) / 100
    : 0;

  // Calculate total price = discountedUnitPrice * quantity
  const discountedPrice = discountedUnitPrice * quantity;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle quantity change, ensure minimum 1
  const handleQuantityChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (val >= 1) {
      setQuantity(val);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("Please log in to place an order.");
      return;
    }

    if (!product || loading) return;

    setLoading(true);

    const orderData = {
      customerId: userId,
      customerName: formData.customerName,
      items: [
        {
          productId: product._id,
          title: product.title,
          quantity: quantity,
          price: discountedUnitPrice, // price per unit
          image: product.image,
        },
      ],
      totalAmount: discountedPrice,
      shippingAddress: {
        address: formData.address,
        city: formData.city,
        pincode: formData.pincode,
        state: formData.state,
        country: formData.country,
      },
      couponApplied: discountPercent > 0 ? couponCode.toUpperCase() : null,
      discountPercent: discountPercent,
    };

    try {
      await axios.post("http://localhost:8000/orders/create", orderData, {
        withCredentials: true,
      });

      // Add ordered item to cart in localStorage
      const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
      const newCartItem = {
        _id: product._id,
        title: product.title,
        price: discountedUnitPrice,
        image: product.image,
        quantity: quantity,
        status: "Ordered",
        couponApplied: discountPercent > 0 ? couponCode.toUpperCase() : null,
        discountPercent: discountPercent,
      };
      const updatedCart = [...existingCart, newCartItem];
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      setSuccess(true);
      setTimeout(() => {
        setLoading(false);
        navigate("/cart");
      }, 2000);
    } catch (err) {
      console.error("Order error:", err);
      setLoading(false);
      alert("Failed to place order.");
    }
  };

  if (!product) return <p className="text-center mt-10">Loading product...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Order Form</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Customer info */}
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
            readOnly
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

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

        {/* Quantity input */}
        <div>
          <label className="block font-semibold mb-1">Quantity</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            className="w-24 border p-2 rounded"
          />
        </div>

        {/* Coupon input */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Coupon Code</label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 flex-grow"
            />
            <button
              type="button"
              onClick={applyCoupon}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded"
            >
              Apply
            </button>
          </div>
          {discountError && (
            <p className="text-red-600 mt-1 text-sm">{discountError}</p>
          )}
          {discountPercent > 0 && (
            <p className="text-green-600 mt-1 text-sm font-semibold">
              Coupon applied! You saved {discountPercent}%.
            </p>
          )}
        </div>

        {/* Product summary */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-2">Product Summary</h3>
          <p className="mb-1">
            <strong>Product:</strong> {product.title}
          </p>
          <p className="mb-1">
            <strong>Category:</strong> {product.category}
          </p>
          <p className="mb-1">
            <strong>Qty:</strong> {quantity}
          </p>
          {product.images && product.images.length > 0 && (
            <img
              src={
                product.images.length > 1 ? product.images[1] : product.images[0]
              }
              alt={product.title}
              className="w-24 mt-2 rounded"
            />
          )}
          <p className="text-yellow-700 font-bold mt-2">
            <strong>Total Amount:</strong> ₹{discountedPrice.toFixed(2)}
          </p>
        </div>

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
