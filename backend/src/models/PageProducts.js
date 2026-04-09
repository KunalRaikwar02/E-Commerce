const mongoose = require("mongoose");

const pageProductsSchema = new mongoose.Schema(
  {
    section: {
      type: String,
      required: true,
      unique: true,
      enum: [
        "hero",
        "new_arrivals",
        "accessories",
        "featured",
        "anime_picks",
        "anime_naruto",
        "anime_solo_leveling",
        "anime_demon_slayer",
        "anime_one_piece",
      ],
    },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        customName: { type: String, default: "" },
        customPrice: { type: String, default: "" },
        customImage: { type: String, default: "" },
        slot: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("PageProducts", pageProductsSchema);