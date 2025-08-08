import jwt from "jsonwebtoken";
import { AdminUser } from "../admin/models/user.models.js";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(403).json({ message: "Not logged in" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await AdminUser.findById(decoded.id);
    if (!admin) return res.status(403).json({ message: "Admin not found" });

    req.user = admin;
    next();
  } catch (error) {
    res.status(500).json({ message: "Auth failed", error });
  }
};

export const adminAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, "your_secret_key");
    const user = await User.findById(decoded.id);

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Not an admin." });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
