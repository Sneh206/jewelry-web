import express from "express"
import { login, logout, register } from "../controllers/User.controllers.js";
import { isAuth } from "../utils/isAuth.js";

const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.get('/logout',logout);
export default router;