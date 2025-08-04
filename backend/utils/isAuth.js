// middleware/isAuth.js
import jwt from "jsonwebtoken";
import { AdminUser } from "../admin/models/user.models.js";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(403).json({ message: "Please Login" });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData) {
      return res.status(403).json({ message: "Token expired" });
    }

    const user = await AdminUser.findById(decodedData.id);
    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Error:", error);
    res.status(500).json({ message: "Please Login" });
  }
};
