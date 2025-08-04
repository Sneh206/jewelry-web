
import express from "express"
import dotenv from "dotenv"
import ConnectDB from "./db/index.js";
import RouteradminRegister from "./admin/Router/user.router.js";
import Routeradminproduct from "./admin/Router/product.router.js";
import OrderRoutes from "./admin/Router/order.router.js";
import ContactUsRouters from "./admin/Router/ContactUs.router.js"
import cookieParser from "cookie-parser";
import cors from 'cors';

// user penal
import UserRouter from "./routers/User.routers.js"
import { fileURLToPath } from 'url';
import path from "path";

// For ES Module __dirname support
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(express.json()); // Required to read req.body
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(
    ({
    origin: ['http://localhost:5173', 'http://localhost:5174'],// frontend URL
    credentials: true
})
))
app.use('/uploads', express.static('uploads'));



const port = process.env.PORT
ConnectDB();

// admin penal
app.use('/admin',RouteradminRegister);
app.use('/adminproduct',Routeradminproduct);
app.use('/orders', OrderRoutes);
app.use('/contactUs',ContactUsRouters);

// user penal
app.use('/user',UserRouter)

app.listen(port,()=>{
    console.log('port is RUN : ',port);
})