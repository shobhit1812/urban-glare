import { Router } from "express";
import {
  addToCart,
  deleteFromCart,
  clearCart,
} from "../controllers/cart.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/add-to-cart").post(verifyJWT, addToCart);
router.route("/delete-from-cart").delete(verifyJWT, deleteFromCart);
router.route("/clear-cart").delete(verifyJWT, clearCart);

export default router;
