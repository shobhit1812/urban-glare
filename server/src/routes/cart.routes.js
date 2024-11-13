import { Router } from "express";
import {
  addToCart,
  incrementCartQuantity,
  decrementFromCart,
  clearCart,
  getCartItems,
} from "../controllers/cart.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/add-to-cart").post(verifyJWT, addToCart);
router
  .route("/increment-cart-quantity")
  .patch(verifyJWT, incrementCartQuantity);
router.route("/decrement-from-cart").patch(verifyJWT, decrementFromCart);
router.route("/clear-cart").delete(verifyJWT, clearCart);
router.route("/get-cart-items").get(verifyJWT, getCartItems);

export default router;
