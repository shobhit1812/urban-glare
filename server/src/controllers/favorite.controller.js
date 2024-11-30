import User from "../models/user.model.js";
import Product from "../models/product.model.js";

const toggleFavorite = async (req, res) => {
  try {
    const { _id } = req.user;
    const { productId } = req.body;

    const product = await Product.findById(productId).select("name").lean();

    if (!product) {
      return res.status(404).send("Product is not available.");
    }

    const user = await User.findById(_id).select(
      "fullName email token favorites"
    );

    if (!user) {
      return res.status(404).send("Email does not exist.");
    }

    const favoriteIndex = user.favorites.indexOf(productId); // Returns -1 if the item is not in the array

    if (favoriteIndex === -1) {
      user.favorites.push(productId);
    } else {
      user.favorites.splice(favoriteIndex, 1);
    }

    await user.save({ validateBeforeSave: false });

    return res.status(200).json({
      message: "Favorites updated.",
      favorites: user.favorites,
      // stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error: " + error.message);
  }
};

const getUserFavorites = async (req, res) => {
  try {
    const { _id } = req.user;

    const user = await User.findById(_id)
      .select("fullName email token favorites")
      .populate({
        path: "favorites",
        select: "name price brand productImages",
      })
      .lean(); // Faster query execution

    if (!user) {
      return res.status(404).send("User not found.");
    }

    return res.status(200).json({
      message: "Favorite fetched successfully.",
      favorites: user.favorites,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error: " + error.message);
  }
};

export { toggleFavorite, getUserFavorites };
