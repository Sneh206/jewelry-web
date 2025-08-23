import mongoose from "mongoose";

const completedOrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId, // store the original order _id
      ref: "Order",
      required: true
    },
    customerId: {
      type: String,
      required: true
    },
    customerName: {
      type: String,
      required: true
    },
    message: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

export const CompletedOrder = mongoose.model("CompletedOrder", completedOrderSchema);
