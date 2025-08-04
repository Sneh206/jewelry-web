import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserAdmin',
      required: true,
    },

    customerName: {
      type: String,
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
        image: {
          type: String, // URL to product image
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['Paid', 'Pending', 'Failed'],
      default: 'Pending',
    },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    shippingAddress: {
      address: String,
      city: String,
      pincode: String,
      state: String,
      country: String,
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model('Order', orderSchema);

