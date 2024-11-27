import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  createProduct,
  editProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getFilteredProducts,
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

router.route("/edit-product/:productId").patch(
  verifyJWT,
  upload.fields([
    {
      name: "productImages",
      maxCount: 5,
    },
  ]),
  editProduct
);
router.route("/delete-product/:productId").delete(verifyJWT, deleteProduct);
router.route("/get-all-products").get(getAllProducts);
router.route("/get-product/:productId").get(getProductById);
router.route("/get-filtered-products").get(getFilteredProducts);

export default router;
