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
      // Naruto, Solo Leveling, Demon Slayer, One Piece etc.
    },
    // ── FIX: No enum on sizes — accept any string (S, M, L, XL, XXL, 28, 30, 32, 34, Free Size, etc.)
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