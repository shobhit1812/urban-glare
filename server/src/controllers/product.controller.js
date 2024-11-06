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
      !req.files.productImages.length === 0
    ) {
      return res.status(400).send("At least one product image is required.");
    }

    const imageUrls = await Promise.all(
      req.files.productImages.map(async (file) => {
        const imageUrl = await uploadOnCloudinary(file.path, "productImages");
        fs.unlinkSync(file.path);
        return imageUrl;
      })
    );

    if (imageUrls.length === 0) {
      return res.status(500).send("Failed to upload product images.");
    }

    const product = await Product.create({
      name,
      description,
      price,
      brand,
      gender,
      sizes,
      productImages: imageUrls,
    });

    const createdProduct = await Product.findById(product._id);

    return res.status(201).json({
      message: "Product created successfully.",
      product: createdProduct,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error: " + error.message);
  }
};

export { createProduct };
