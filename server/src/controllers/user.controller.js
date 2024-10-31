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

    const createdUser = await User.findById(user._id).select(
      "-fullName -username -password -isAdmin -createdAt -updatedAt -__v"
    );

    if (!createdUser) {
      return res
        .status(500)
        .send("Something went wrong while registering the user");
    }

    return res.status(201).json({
      status: 200,
      message: "User Registered Successfully",
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

    const loggedInUser = await User.findById(user._id).select(
      "-fullName -username -password -isAdmin -token -createdAt -updatedAt -__v"
    );

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    };

    return res.status(200).cookie("token", token, options).json({
      status: 200,
      message: "User logged in successfully.",
      token: token,
      user: loggedInUser,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error: " + error.message);
  }
};

export { registerUser, loginUser };
