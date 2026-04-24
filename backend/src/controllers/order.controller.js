const Order = require("../models/Order");
const mongoose = require("mongoose");

// Helper — check karo ki value valid MongoDB ObjectId hai ya nahi
const isValidObjectId = (id) => {
  if (!id) return false;
  return mongoose.Types.ObjectId.isValid(id);
};

// @POST /api/orders — Place order
const placeOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, coupon, discount } = req.body;

    if (!items || items.length === 0)
      return res.status(400).json({ message: "No items in order" });

    const subtotal = items.reduce(
      (sum, item) => sum + Number(item.price) * Number(item.quantity), 0
    );
    const gst = parseFloat((subtotal * 0.18).toFixed(2));
    const shippingCharge = subtotal > 1500 ? 0 : 100;
    const discountAmount = Number(discount) || 0;
    const total = Math.max(0, subtotal + gst + shippingCharge - discountAmount);

    const orderData = {
      items: items.map((item) => ({

        product: isValidObjectId(item.product || item.id)
          ? (item.product || item.id)
          : null,
        name: item.name,
        price: Number(item.price),
        img: item.img,
        size: item.size,
        quantity: Number(item.quantity),
      })),
      shippingAddress,
      paymentMethod,
      subtotal,
      gst,
      shippingCharge,
      discount: discountAmount,
      coupon: coupon || "",
      total,
      user: req.user._id,
    };

    const order = await Order.create(orderData);
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error("placeOrder error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// @GET /api/orders/my — Logged-in user ke orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .lean();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @GET /api/orders/:id — Single order
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .lean();

    if (!order) return res.status(404).json({ message: "Order not found" });

    const isOwner = String(order.user?._id || order.user) === String(req.user._id);
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin)
      return res.status(403).json({ message: "Not authorized" });

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { placeOrder, getMyOrders, getOrderById };