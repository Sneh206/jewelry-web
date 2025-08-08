import React, { useEffect, useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orderStatus, setOrderStatus] = useState(null);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const storedStatus = localStorage.getItem("orderStatus");

    setCartItems(storedCart);
    setOrderStatus(storedStatus);
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Cart</h2>

      {orderStatus && (
        <div className="mb-4 p-3 bg-blue-100 border-l-4 border-blue-500 text-blue-800 font-medium rounded">
          Order Status: {orderStatus}
        </div>
      )}

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item._id} className="flex items-center justify-between border p-4 rounded">
              <div className="flex items-center space-x-4">
                <img
                  src={`http://localhost:8000/uploads/${item.image}`}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="font-bold">{item.title}</h3>
                  <p>₹{item.price}</p>
                  <p>Qty: {item.quantity || 1}</p>
                </div>
              </div>
              <div className="text-lg font-semibold">
                ₹{item.price * (item.quantity || 1)}
              </div>
            </div>
          ))}

          <div className="text-right mt-6 border-t pt-4 text-xl font-bold">
            Total: ₹{calculateTotal()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
