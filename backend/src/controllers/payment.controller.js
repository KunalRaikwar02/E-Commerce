const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @POST /api/payment/create-order
// Frontend calls this to get a Razorpay order ID
const createRazorpayOrder = async (req, res) => {
  try {
    const { amount, currency = "INR", orderId } = req.body;

    if (!amount) return res.status(400).json({ message: "Amount is required" });

    const options = {
      amount: Math.round(amount * 100),
      currency,
      receipt: orderId || `rcpt_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    res.json({
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("Razorpay create order error:", err);
    res.status(500).json({ message: "Payment gateway error: " + err.message });
  }
};

// @POST /api/payment/verify
// Frontend calls this after Razorpay payment success to verify signature
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      internalOrderId,
    } = req.body;

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed — invalid signature" });
    }

    // Update order payment status
    if (internalOrderId) {
      await Order.findByIdAndUpdate(internalOrderId, {
        paymentStatus: "paid",
        orderStatus: "confirmed",
      });
    }

    res.json({
      success: true,
      message: "Payment verified successfully",
      paymentId: razorpay_payment_id,
    });
  } catch (err) {
    console.error("Razorpay verify error:", err);
    res.status(500).json({ message: "Verification error: " + err.message });
  }
};

module.exports = { createRazorpayOrder, verifyPayment };