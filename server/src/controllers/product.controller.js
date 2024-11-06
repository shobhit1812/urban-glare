import Product from "../models/product.model.js";
import { validateProduct } from "../utils/validator.js";

const createProduct = async (req, res) => {
  try {
    validateProduct(req);

    const { name, description, price, category, pictures } = req.body;

    if (!req.files || !req.files.pictures || !req.files.pictures[0]) {
      throw new ApiError(400, "Pictures file is required");
    }

    const picturesLocalPath = req.files.pictures[0].path;

    const folder_name = "e-bazaar";
    const picture = await uploadOnCloudinary(picturesLocalPath, folder_name);

    if (!picture) {
      return res
        .status(500)
        .send("Something went wrong while uploading avatar");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error: " + error.message);
  }
};

export { createProduct };
