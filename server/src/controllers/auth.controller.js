import User from "../models/user.model.js";
import { validateLoginUser, validateRegisterUser } from "../utils/validator.js";

const registerUser = async (req, res) => {
  try {
    validateRegisterUser(req);

    const { fullName, email, username, password } = req.body;

    const existedUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existedUser) {
      return res.status(409).send("User already exists.");
    }

    const user = await User.create({
      fullName,
      email,
      username,
      password,
    });

    const token = user.generateToken();

    if (!token) {
      return res.status(500).send("Error while generating token.");
    }

    user.token = token;
    await user.save({ validateBeforeSave: false });

    const createdUser = await User.findById(user._id).select("email _id token");

    if (!createdUser) {
      return res
        .status(500)
        .send("Something went wrong while registering the user.");
    }

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    };

    return res.status(201).cookie("token", token, options).json({
      message: "User registered successfully.",
      user: createdUser,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error: " + error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    validateLoginUser(req);

    const { email, username, password } = req.body;

    const user = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (!user) {
      return res.status(404).send("Email or username does not exist.");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return res.status(401).send("Invalid Credentials.");
    }

    const token = user.generateToken();

    if (!token) {
      return res.status(500).send("Error while generating token.");
    }

    user.token = token;
    await user.save({ validateBeforeSave: false });

    const loggedInUser = await User.findById(user._id).select(
      "-fullName -username -password -isAdmin -token -createdAt -updatedAt -__v"
    );

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    };

    return res.status(200).cookie("token", token, options).json({
      message: "User logged in successfully.",
      user: loggedInUser,
      token: token,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error: " + error.message);
  }
};

const logoutUser = async (req, res) => {
  try {
    const { _id } = req.user;

    if (!_id) {
      return res.status(404).send("Not Found.");
    }

    await User.findByIdAndUpdate(
      _id,
      {
        $set: { token: null },
      },
      { new: true }
    );

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    };

    return res
      .status(200)
      .clearCookie("token", options)
      .json({ message: "User logged out successfully." });
  } catch (error) {
    res.status(500).send("Internal Server Error: " + error.message);
  }
};

export { registerUser, loginUser, logoutUser };
