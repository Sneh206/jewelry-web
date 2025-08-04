import mongoose from "mongoose";
import { type } from "os";

const productSchema = new mongoose.Schema({
   title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Inactive',
  },
  category: {
    type: String,
    required : true
  },
  description : {type : String}, 
  createdAt: { type: Date, default: Date.now },
});

export const Product = mongoose.model("Product", productSchema);
