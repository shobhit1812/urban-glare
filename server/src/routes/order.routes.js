import { Router } from "express";
import {
  createOrder,
  getAllOrder,
  getUserOrder,
} from "../controllers/order.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create-order").post(verifyJWT, createOrder);
router.route("/get-all-order").get(verifyJWT, getAllOrder);
router.route("/get-user-order").get(verifyJWT, getUserOrder);

export default router;
