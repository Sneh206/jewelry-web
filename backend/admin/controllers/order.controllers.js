import { Order } from "../models/orders.models.js";

// CREATE order
export const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    const savedOrder = await order.save();

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: savedOrder,
    });
  } catch (error) {
    console.error('Create Order Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Internal Server Error',
    });
  }
};


// GET all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("customerId","email"); // ✅ populate email from UserAdmin
    res.json({ orders });
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


// UPDATE order
export const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json({ success: true, updatedOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// DELETE order
export const deleteOrder = async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Order not found' });
    res.status(200).json({ success: true, message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get item sales data for chart
export const sell = async (req, res) => {
  try {
    const orders = await Order.find(); // Fetch all orders

    const itemSales = {};

    // ✅ Loop through the actual data, not the model
    orders.forEach(order => {
      order.items.forEach(item => {
        const title = item.title.toLowerCase();
        itemSales[title] = (itemSales[title] || 0) + item.quantity;
      });
    });

    res.json({ itemSales });
  } catch (error) {
    console.error('Error fetching sales chart:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
