import { CompletedOrder } from "../models/completedOrderSchema.js";
import { Order } from "../models/orders.models.js";
import mongoose from "mongoose";

export const completeOrder = async (req, res) => {
  try {
    const { orderId, message } = req.body;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: "Invalid Order ID format" });
    }

    const originalOrder = await Order.findById(orderId);
    if (!originalOrder) {
      return res.status(404).json({ message: "Original order not found" });
    }

    const newCompletedOrder = new CompletedOrder({
      orderId: originalOrder._id,   // ✅ store original order ID here
      customerId: originalOrder.customerId,
      customerName: originalOrder.customerName,
      message
    });

    await newCompletedOrder.save();
    res.status(201).json({ message: "Completed order created", order: newCompletedOrder });
  } catch (err) {
    res.status(500).json({ message: "Error creating completed order", error: err.message });
  }
};

// Get all completed orders
export const getAllCompletedOrders = async (req, res) => {
  try {
    const orders = await CompletedOrder.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch completed orders" });
  }
};
