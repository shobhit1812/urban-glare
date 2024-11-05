import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    pictures: [
      {
        type: String,
        required: true,
        validate: {
          validator: function (v) {
            return /^(http|https):\/\/[^ "]+$/.test(v); // Ensure it's a URL
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
