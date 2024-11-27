import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import Product from "../models/product.model.js";
import { validateProduct } from "../utils/validator.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { extractPublicId } from "../utils/extractPublicId.js";

const createProduct = async (req, res) => {
  try {
    const { isAdmin } = req.user;

    if (!isAdmin) {
      return res
        .status(403)
        .send("You are not authorized to edit this product.");
    }

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

const editProduct = async (req, res) => {
  try {
    const { isAdmin } = req.user;

    if (!isAdmin) {
      return res
        .status(403)
        .send("You are not authorized to edit this product.");
    }

    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send("Product not found.");
    }

    const { name, description, price, brand, rating, gender, sizes } = req.body;

    let imageUrls = product.productImages;

    if (
      req.files &&
      req.files.productImages &&
      req.files.productImages.length > 0
    ) {
      imageUrls = await Promise.all(
        req.files.productImages.map(async (file) => {
          return await uploadOnCloudinary(file.path, "productImages");
        })
      );
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        $set: {
          name,
          description,
          price,
          brand,
          rating,
          gender,
          sizes,
          productImages: imageUrls,
        },
      },
      { new: true } // Return the updated document
    );

    return res.status(200).json({
      message: "Product updated successfully.",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error: " + error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { isAdmin } = req.user;

    if (!isAdmin) {
      return res
        .status(403)
        .send("You are not authorized to delete this product.");
    }

    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send("Product not found.");
    }

    const path = "urban-glare/productImages";

    if (product?.productImages && Array.isArray(product?.productImages)) {
      // Handle multiple images
      for (const imageUrl of product.productImages) {
        const publicId = extractPublicId(imageUrl);
        if (publicId) {
          try {
            await cloudinary.uploader.destroy(`${path}/${publicId}`);
          } catch (cloudinaryError) {
            console.error("Cloudinary error:", cloudinaryError.message);
            // Continue with deletion even if one image fails
          }
        }
      }
    } else if (typeof product.productImages === "string") {
      // Handle single image
      const publicId = extractPublicId(product.productImages);
      if (publicId) {
        await cloudinary.uploader.destroy(`${path}/${publicId}`);
      }
    }

    await product.deleteOne();

    return res.status(200).json({
      message: "Product deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    return res.status(500).send("Internal Server Error: " + error.message);
  }
};

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

export {
  createProduct,
  editProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getFilteredProducts,
};
