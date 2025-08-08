import express from "express";
import {
  adminRegister,
  adminLogin,
  adminLogout,
  getAllAdmins,
  deleteAdmin,
  changePassword,
} from "../../admin/controllers/user.controllers.js";
import { isAuth } from "../../utils/isAuth.js";

const router = express.Router();

router.post("/register", adminRegister);
router.post("/login", adminLogin);
router.get("/logout", isAuth, adminLogout);
router.get("/all", isAuth, getAllAdmins);
router.delete("/delete", isAuth, deleteAdmin);
router.post("/change-password", isAuth, changePassword);

export default router;
