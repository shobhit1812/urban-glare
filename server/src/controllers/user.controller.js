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

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("fullName email token");

    if (!user) {
      return res.status(404).send("User not found.");
    }

    return res.status(200).json({
      message: "User fetched successfully.",
      user: user,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error: ", error.message);
  }
};

export { getAllUsers, getUserById };
