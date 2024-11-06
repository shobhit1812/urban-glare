import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 0,
    },
    description: {
      type: String,
      trim: true,
      default: "",
      minLength: 0,
      maxLength: 150,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
      default: "e-bazaar",
    },
    gender: {
      type: String,
      required: true,
      enum: {
        values: ["male", "female", "kids"],
        message: "{VALUE} is not a valid category type",
      },
    },
    size: [
      {
        type: String,
        required: true,
        enum: {
          values: ["XS", "S", "M", "L", "XL"],
          message: "{VALUE} is not a valid size type",
        },
      },
    ],
    pictures: [
      {
        type: String,
        required: true,
        validate: {
          validator: function (v) {
            return /^(http|https):\/\/[^ "]+$/.test(v);
          },
          message: (props) => `${props.value} is not a valid URL!`,
        },
      },
    ],
  },

  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
