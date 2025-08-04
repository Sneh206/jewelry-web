import express from 'express';
import { upload } from '../../utils/Multer.js';
import { addProduct, createContact, deleteJewelry, filter,editProduct,getAllProducts, getLatestProducts, photo, statusdata, oneproduct } from '../../../backend/admin/controllers/product.controllers.js';
import { isAuth } from '../../utils/isAuth.js';

const router = express.Router();

// POST /admin/products
router.post('/add-product', upload.single('image'), addProduct);
router.put("/edit-product/:id", upload.single("image"), editProduct);
router.delete("/delete-product/:id", isAuth, deleteJewelry);
router.get("/products", isAuth, getAllProducts);
router.post("/contact", createContact);
router.put('/toggle-status/:id',statusdata);
router.get('/latest',getLatestProducts);
router.get('/photo',photo);
router.get('/',filter);
router.get("/one/:id",oneproduct);

export default router;
