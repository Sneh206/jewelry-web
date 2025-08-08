import mongoose from "mongoose";

const userschema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 3 },
  phone: { type: Number, required: true },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
});

export const AdminUser = mongoose.model('UserAdmin', userschema);
