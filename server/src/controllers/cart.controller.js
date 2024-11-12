import mongoose from "mongoose";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!isValidObjectId(userId)) {
      return res.status(400).send("Invalid user ID.");
    }

    if (!isValidObjectId(productId) || !quantity || quantity <= 0) {
      return res.status(400).send("Invalid product ID or quantity.");
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send("Product not found.");
    }

    const totalAmount = product.price * quantity;

    const user = await User.findById(userId);
    const cartItemIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (cartItemIndex > -1) {
      user.cart[cartItemIndex].quantity = quantity;
      user.cart[cartItemIndex].totalAmount = totalAmount;
    } else {
      user.cart.push({ productId, quantity, totalAmount });
    }

    await user.save();
    return res.status(200).json({
      message: "Product added to cart successfully.",
      cart: user.cart,
    });
  } catch (error) {
    res.status(500).send(`Error adding to cart: ${error.message}`);
  }
};

const deleteFromCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId } = req.body;

    // Validate user ID and product ID
    if (!isValidObjectId(userId) || !validateObjectId(productId)) {
      return res.status(404).send("Invalid user ID or product ID.");
    }

    // Find user and update their cart
    const user = await User.findById(userId);
    user.cart = user.cart.filter(
      (item) => item.productId.toString() !== productId
    );

    await user.save();
    return res.status(200).json({
      message: "Product removed from cart successfully.",
      cart: user.cart,
    });
  } catch (error) {
    res.status(500).send("Error deleting from cart: ", error.message);
  }
};

const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate user ID
    if (!isValidObjectId(userId)) {
      return res.status(400).send("Invalid user ID.");
    }

    // Find user and clear their cart
    const user = await User.findById(userId);
    user.cart = [];

    await user.save();
    res.status(200).json({ message: "Cart cleared", cart: user.cart });
  } catch (error) {
    res.status(500).send("Internal Server Error: ", error.message);
  }
};

const toggleFavorite = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const user = await User.findById(userId);
    const favoriteIndex = user.favorites.indexOf(productId);

    if (favoriteIndex === -1) {
      user.favorites.push(productId);
    } else {
      user.favorites.splice(favoriteIndex, 1);
    }

    await user.save();
    return res.status(200).json({ message: "Favorites updated." });
  } catch (error) {
    res.status(500).send("Error updating favorites: ", error.message);
  }
};

export { addToCart, deleteFromCart, clearCart, toggleFavorite };
