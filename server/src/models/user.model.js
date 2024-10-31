import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minLength: 4,
      maxLength: 24,
    },
    email: {
      type: String,
      required: [true, "EmailId is required"],
      index: true,
      unique: true,
      trim: true,
      lowercase: true,
      minLength: 4,
      maxLength: 38,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      index: true,
      unique: true,
      trim: true,
      lowercase: true,
      minLength: 4,
      maxLength: 24,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
    },
    // NOTE: Cart, Notifications etc.
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRY,
  });
};

const User = mongoose.model("User", userSchema);

export default User;
