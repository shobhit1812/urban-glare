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
    res.status(500).send("Error adding to cart: ", error.message);
  }
};

const incrementCartQuantity = async (req, res) => {
  try {
    const { _id } = req.user;
    const { productId } = req.body;

    if (!isValidObjectId(_id) || !isValidObjectId(productId)) {
      return res.status(400).send("Invalid user ID or product ID.");
    }

    const user = await User.findById(_id);
    const cartItem = user.cart.find(
      (item) => item.productId.toString() === productId
    );

    if (!cartItem) {
      return res.status(404).send("Product not found in cart.");
    }

    // Increment quantity and update total amount
    cartItem.quantity += 1;
    const product = await Product.findById(productId);
    cartItem.totalAmount = product.price * cartItem.quantity;

    await user.save();
    return res.status(200).json({
      message: "Product quantity incremented successfully.",
      cart: user.cart,
    });
  } catch (error) {
    res
      .status(500)
      .send("Error incrementing quantity in cart: ", error.message);
  }
};

const decrementFromCart = async (req, res) => {
  try {
    const { _id } = req.user;
    const { productId } = req.body;

    if (!isValidObjectId(_id) || !isValidObjectId(productId)) {
      return res.status(400).send("Invalid user ID or product ID.");
    }

    const user = await User.findById(_id);
    const cartItemIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (cartItemIndex === -1) {
      return res.status(404).send("Product not found in cart.");
    }

    if (user.cart[cartItemIndex].quantity > 1) {
      // Decrease quantity and update total amount
      user.cart[cartItemIndex].quantity -= 1;
      const product = await Product.findById(productId);
      user.cart[cartItemIndex].totalAmount =
        product.price * user.cart[cartItemIndex].quantity;
    } else {
      // Remove product from cart if quantity is 1
      user.cart.splice(cartItemIndex, 1);
    }

    await user.save();
    return res.status(200).json({
      message:
        "Product quantity decremented or removed from cart successfully.",
      cart: user.cart,
    });
  } catch (error) {
    res
      .status(500)
      .send("Error decrementing/removing product from cart: ", error.message);
  }
};

const clearCart = async (req, res) => {
  try {
    const { _id } = req.user;

    if (!isValidObjectId(_id)) {
      return res.status(400).send("Invalid user ID.");
    }

    const user = await User.findById(_id);
    user.cart = [];

    await user.save();
    return res.status(200).json({ message: "Cart cleared.", cart: user.cart });
  } catch (error) {
    res.status(500).send("Internal Server Error: ", error.message);
  }
};

const getCartItems = async (req, res) => {
  try {
    const { _id } = req.user;

    if (!isValidObjectId(_id)) {
      return res.status(400).send("Invalid user ID.");
    }

    const user = await User.findById(_id).populate("cart.productId");
    // const user = await User.findById(_id)
    //   .select("fullName email token cart favorites")
    //   .populate({
    //     path: "cart",
    //     select: "productId quantity totalAmount",
    //   });

    if (!user) {
      return res.status(404).send("User not found.");
    }

    if (user.cart.length === 0) {
      return res.status(200).send("Cart is empty.");
    }

    return res.status(200).json({
      message: "Cart items retrieved successfully.",
      cart: user.cart,
    });
  } catch (error) {
    return res.status(500).send("Internal Server Error: ", error.message);
  }
};

const removeItemFromCart = async (req, res) => {
  try {
    const { _id } = req.user;
    const { productId } = req.body;

    if (!isValidObjectId(_id) || !isValidObjectId(productId)) {
      return res.status(400).send("Invalid user ID or product ID.");
    }

    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send("User not found.");
    }

    const cartItemIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (cartItemIndex === -1) {
      return res.status(404).send("Product not found in cart.");
    }

    user.cart.splice(cartItemIndex, 1);

    await user.save();

    return res.status(200).json({
      message: "Product removed from cart successfully.",
      cart: user.cart,
    });
  } catch (error) {
    return res
      .status(500)
      .send("Error removing item from cart: " + error.message);
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

export {
  addToCart,
  incrementCartQuantity,
  decrementFromCart,
  clearCart,
  getCartItems,
  removeItemFromCart,
  toggleFavorite,
};
