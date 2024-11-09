import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  createProduct,
  getAllProducts,
  getProductById,
} from "../controllers/product.controller.js";

const router = Router();

router.route("/create-product").post(
  verifyJWT,
  upload.fields([
    {
      name: "productImages",
      maxCount: 5,
    },
  ]),
  createProduct
);

// router.route("/get-all-products").get(verifyJWT, getAllProducts);
// router.route("/get-product/:productId").get(verifyJWT, getProductById);

router.route("/get-all-products").get(getAllProducts);
router.route("/get-product/:productId").get(getProductById);

export default router;
