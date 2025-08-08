import { AdminUser } from "../../admin/models/user.models.js";
import bcrypt from "bcrypt";
import generateToken from "../../utils/generateToken.js";

// Register Admin
export const adminRegister = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone)
      return res.status(400).json({ message: "All fields are required" });

    const existing = await AdminUser.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await AdminUser.create({ name, email, password: hashed, phone });

    res.status(201).json({ message: "Admin registered", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error registering admin", error });
  }
};

// Login Admin
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await AdminUser.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(admin._id, res);
    res.status(200).json({ message: "Login successful", user: admin });
  } catch (error) {
    res.status(500).json({ message: "Login error", error });
  }
};

// Logout Admin
export const adminLogout = (req, res) => {
  res.cookie("token", "", { maxAge: 0 });
  res.status(200).json({ message: "Admin logged out" });
};

// Delete Account Admin
export const deleteAdmin = async (req, res) => {
  try {
    const admin = await AdminUser.findByIdAndDelete(req.user._id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    res.clearCookie("token");
    res.status(200).json({ message: "Admin deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete error", error });
  }
};

// All Admin 
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await AdminUser.find().select("-password");
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admins", error });
  }
};

// changePassword Admin
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const admin = await AdminUser.findById(req.user._id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Current password is incorrect" });

    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Password change error:", error);
    res.status(500).json({ message: "Server error while changing password" });
  }
};


export const me = async (req, res) => {
  const admin = await AdminUser.findById(req.adminId).select('-password');
  if (!admin) return res.status(404).json({ message: 'Admin not found' });
  res.json({ admin });
};