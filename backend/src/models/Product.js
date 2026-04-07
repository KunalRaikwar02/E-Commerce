const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    images: [{ type: String }],        // ImageKit URLs (frontend ke liye)
    imageFileIds: [{ type: String }],  // ImageKit FileIds (delete ke liye)
    category: {
      type: String,
      required: true,
      enum: ["T-Shirt", "Shirt", "Jeans", "Cap", "Accessories", "Anime"],
    },
    animeTag: {
      type: String,
      enum: ["Naruto", "Solo Leveling", "Demon Slayer", "One Piece", null],
      default: null,
    },
    sizes: [{ type: String, enum: ["XS", "S", "M", "L", "XL", "XXL", "Free Size"] }],
    badge: { type: String, enum: ["NEW", "LIMITED", "SPECIAL", null], default: "NEW" },
    brand: { type: String, default: "VELTORN" },
    stock: { type: Number, default: 100 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);