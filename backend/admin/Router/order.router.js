import express from 'express';
import {
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
  sell,
  getUserOrders,
} from '../controllers/order.controllers.js';

const router = express.Router();

router.post('/create', createOrder);
router.get('/all', getAllOrders);
router.put('/update/:id', updateOrder);
router.delete('/delete/:id', deleteOrder);
router.get('/sales-chart',sell);
router.get('/user/:userId',getUserOrders);

export default router;
