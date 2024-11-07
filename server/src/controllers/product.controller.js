import mongoose from "mongoose";
import Product from "../models/product.model.js";
import { validateProduct } from "../utils/validator.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

const createProduct = async (req, res) => {
  try {
    validateProduct(req);

    const { name, description, price, brand, gender, sizes } = req.body;

    const existedProduct = await Product.findOne({ name });
    if (existedProduct) {
      return res.status(409).send("Product already exists.");
    }

    if (
      !req.files ||
      !req.files.productImages ||
      req.files.productImages.length === 0
    ) {
      return res.status(400).send("Product images are required.");
    }

    const imageUrls = await Promise.all(
      req.files.productImages.map(async (file) => {
        const imageUrl = await uploadOnCloudinary(file.path, "productImages");
        return imageUrl;
      })
    );

    const product = await Product.create({
      name,
      description,
      price,
      brand,
      gender,
      sizes,
      productImages: imageUrls,
    });

    return res.status(201).json({
      message: "Product created successfully.",
      product,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error: " + error.message);
  }
};

// const updateProduct = async (req, res) => {
//   try {
//     const { productId } = req.params;
//   } catch (error) {
//     res.status(500).send("Internal Server Error: " + error.message);
//   }
// };

const getAllProducts = async (_, res) => {
  try {
    const products = await Product.find({});

    if (!products.length) {
      return res.send(404).send("No products found.");
    }

    return res.status(200).json({
      message: "Products fetched successfully.",
      products: products,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error: " + error.message);
  }
};

const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).send("Invalid product ID.");
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send("No product found.");
    }

    return res.status(200).json({
      message: "Product fetched successfully.",
      product: product,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error: " + error.message);
  }
};

export { createProduct, getAllProducts, getProductById };
