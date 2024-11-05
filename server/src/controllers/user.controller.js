import User from "../models/user.model.js";

const getAllUsers = async (_, res) => {
  try {
    const users = await User.find({}).select("_id fullName email");

    return res.status(200).json({
      message: "Users fetched successfully.",
      users: users,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error: " + error.message);
  }
};

const getUserById = async (_, res) => {
  try {
  } catch (error) {
    res.status(500).send("Internal Server Error: " + error.message);
  }
};

export { getAllUsers, getUserById };
