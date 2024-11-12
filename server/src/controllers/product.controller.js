import mongoose from "mongoose";
import Product from "../models/product.model.js";
import { validateProduct } from "../utils/validator.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

const createProduct = async (req, res) => {
  try {
    validateProduct(req);

    const { name, description, price, brand, rating, gender, sizes } = req.body;

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
      rating,
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

const getAllProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 9;
  const skip = (page - 1) * limit;

  try {
    const products = await Product.aggregate([
      { $skip: skip },
      { $limit: limit },
    ]);

    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    return res.status(200).json({
      message: "Products fetched successfully.",
      products,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error: " + error.message);
  }
};

const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    // BUG: use validator
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

const getFilteredProducts = async (req, res) => {
  try {
    const searchText = req.query.searchText || "";

    const searchQuery = searchText
      ? {
          $or: [
            { name: { $regex: searchText, $options: "i" } },
            { brand: { $regex: searchText, $options: "i" } },
            { gender: { $regex: searchText, $options: "i" } },
          ],
        }
      : {};

    const products = await Product.find(searchQuery);

    return res.status(200).json({
      message: "Filtered products fetched successfully.",
      products,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error: " + error.message);
  }
};

export { createProduct, getAllProducts, getProductById, getFilteredProducts };
