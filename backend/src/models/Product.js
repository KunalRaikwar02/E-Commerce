const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["T-Shirt", "Shirt", "Jeans", "Cap", "Accessories", "Anime"],
    },
    animeTag: {
      type: String,
      default: null,
    },
    sizes: {
      type: [String],
      default: ["S", "M", "L", "XL", "XXL"],
    },
    badge: {
      type: String,
      enum: ["NEW", "LIMITED", "SPECIAL"],
      default: "NEW",
    },
    brand: {
      type: String,
      default: "VELTORN",
    },
    stock: {
      type: Number,
      default: 100,
      min: 0,
    },
    images: {
      type: [String],
      default: [],
    },
    imageFileIds: {
      type: [String],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);