import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { createProduct } from "../controllers/product.controller.js";

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

export default router;
