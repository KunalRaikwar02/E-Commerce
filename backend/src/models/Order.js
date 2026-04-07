const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // Guest checkout ke liye bhi kaam karega
    guestInfo: {
      name: String,
      email: String,
      phone: String,
    },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,       // Snapshot at time of order
        price: Number,      // Snapshot at time of order
        img: String,        // Snapshot at time of order
        size: String,
        quantity: Number,
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String },
      pincode: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "UPI", "CARD"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: ["placed", "confirmed", "shipped", "delivered", "cancelled"],
      default: "placed",
    },
    subtotal: Number,
    gst: Number,
    shippingCharge: Number,
    total: Number,
    orderId: { type: String, unique: true }, // e.g. VEL-4091A
  },
  { timestamps: true }
);

// Auto-generate orderId
orderSchema.pre("save", function (next) {
  if (!this.orderId) {
    const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
    this.orderId = `VEL-${rand}`;
  }
  next();
});

module.exports = mongoose.model("Order", orderSchema);