import Product from "../models/product.model.js";
import { validateProduct } from "../utils/validator.js";

const createProduct = async (req, res) => {
  try {
    validateProduct(req);
  } catch (error) {
    res.status(500).send("Internal Server Error: " + error.message);
  }
};

export { createProduct };
