import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const OrderPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  // Coupon related state
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountError, setDiscountError] = useState("");

  useEffect(() => {
    if (productId) {
      axios
        .get(`http://localhost:8000/adminproduct/one/${productId}`)
        .then((res) => setProduct(res.data))
        .catch(() => {});
    }
  }, [productId]);

  if (!product) return <div className="text-center mt-10">Loading...</div>;

  // Hardcoded example coupons (could be fetched from backend)
  const validCoupons = {
    SNEH: 10,  // 10% discount
    SNEH20: 20,  // 20% discount
    VIP30: 30,   // 30% discount
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

  const discountedPrice = product.price - (product.price * discountPercent) / 100;

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

          <div className="mb-4">
            <p className="text-yellow-700 text-xl font-semibold">
              Price: ₹{discountPercent > 0 ? (
                <>
                  <span className="line-through text-gray-400 mr-2">₹{product.price}</span>
                  <span>₹{discountedPrice.toFixed(2)}</span>
                </>
              ) : (
                product.price
              )}
            </p>
          </div>

          {/* Coupon input */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 mr-2 w-48 focus:outline-yellow-500"
            />
            <button
              onClick={applyCoupon}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded"
            >
              Apply
            </button>
            {discountError && (
              <p className="text-red-600 mt-1 text-sm">{discountError}</p>
            )}
            {discountPercent > 0 && (
              <p className="text-green-600 mt-1 text-sm font-semibold">
                Coupon applied! You saved {discountPercent}%.
              </p>
            )}
          </div>

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
