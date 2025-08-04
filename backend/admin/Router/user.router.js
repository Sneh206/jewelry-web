import express from "express";
import { adminall, adminDelete, adminLogin, adminLogout, adminregister, changePassword, me } from "../controllers/user.controllers.js";
import { isAuth } from "../../utils/isAuth.js";
const router = express.Router();

router.post('/register',adminregister);
router.post('/login',adminLogin);
router.get('/logout',isAuth,adminLogout);
router.delete("/account/delete/:id", isAuth, adminDelete);
router.get('/all',adminall);
router.post('/change-password',isAuth,changePassword);
// router.post('/forgot-Password',forgotPassword);
router.get('/me',isAuth,me);

export default router;