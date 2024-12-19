import Order from "../models/order.model.js";

const createOrder = async (req, res) => {
  try {
    const { _id } = req.user;

    const { products, totalItem, totalPrice, paymentMethod, shippingDetails } =
      req.body;

    const order = await Order.create({
      owner: _id,
      products,
      totalItem,
      totalPrice,
      paymentMethod,
      shippingDetails,
    });

    return res.status(201).json({
      message: "Order Placed successfully.",
      Order: order,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error: " + error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
  } catch (error) {}
};

const getAllOrder = async (req, res) => {
  try {
  } catch (error) {}
};

export { createOrder, getOrderById, getAllOrder };
