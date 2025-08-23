import express from "express";
import {
  completeOrder,
  getAllCompletedOrders,
//   getCompletedOrderDetails
} from "../controllers/OrderCompleted.js";

const router = express.Router();

router.post("/completed-orders-create", completeOrder);
router.get("/completed-orders-all", getAllCompletedOrders);
// router.get("/details/:id", getCompletedOrderDetails);

export default router;
