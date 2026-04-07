const Order = require("../models/Order");

// @POST /api/orders  — Place order
const placeOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, guestInfo } = req.body;

    if (!items || items.length === 0)
      return res.status(400).json({ message: "No items in order" });

    // Calculations
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const gst = parseFloat((subtotal * 0.18).toFixed(2));
    const shippingCharge = subtotal > 1500 ? 0 : 100;
    const total = subtotal + gst + shippingCharge;

    const orderData = {
      items,
      shippingAddress,
      paymentMethod,
      subtotal,
      gst,
      shippingCharge,
      total,
    };

    // Logged in user ho toh attach karo
    if (req.user) orderData.user = req.user._id;
    else if (guestInfo) orderData.guestInfo = guestInfo;

    const order = await Order.create(orderData);

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (req.user.role !== "admin" && String(order.user?._id) !== String(req.user._id))
      return res.status(403).json({ message: "Not authorized" });

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { placeOrder, getMyOrders, getOrderById };