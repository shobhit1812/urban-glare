import mongoose from "mongoose";
import User from "../models/user.model.js";
import Order from "../models/order.model.js";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const createOrder = async (req, res) => {
  try {
    const { _id } = req.user;

    if (!isValidObjectId(_id)) {
      return res.status(400).json({ message: "Invalid User ID." });
    }

    const { products, totalItem, totalPrice, paymentMethod, shippingDetails } =
      req.body;

    if (
      !products ||
      !Array.isArray(products) ||
      products.length === 0 ||
      !totalItem ||
      !totalPrice ||
      !paymentMethod ||
      !shippingDetails
    ) {
      return res.status(400).json({ message: "Incomplete order details." });
    }

    const order = await Order.create({
      owner: _id,
      products,
      totalItem,
      totalPrice,
      paymentMethod,
      shippingDetails,
    });

    const user = await User.findByIdAndUpdate(
      _id,
      {
        $push: { orders: order._id },
        $set: { cart: [] },
      },
      { new: true, select: "fullName email orders" }
    );

    if (!user) {
      return res.status(404).json({ message: "User does not exist." });
    }

    return res.status(201).json({
      message: "Order placed successfully.",
      order,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error: " + error.message });
  }
};

export default createOrder;

const getUserOrder = async (req, res) => {
  try {
    const { _id } = req.user;

    if (!isValidObjectId(_id)) {
      return res.status(400).json({ message: "Invalid User ID." });
    }

    const orders = await Order.find({ owner: _id }).lean();

    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for this user." });
    }

    return res.status(200).json({
      message: "Orders fetched successfully.",
      orders,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error: " + error.message });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const { isAdmin } = req.user;

    if (!isAdmin) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const orders = await Order.find({}).populate("owner", "fullName email");

    return res.status(200).json({
      message: "Orders fetched successfully.",
      orders,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error: " + error.message });
  }
};

export { createOrder, getUserOrder, getAllOrder };
