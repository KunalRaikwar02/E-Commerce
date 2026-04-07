const express = require("express");
const router = express.Router();
const { createRazorpayOrder, verifyPayment } = require("../controllers/payment.controller");

// Create Razorpay order (get order ID from Razorpay)
router.post("/create-order", createRazorpayOrder);

// Verify payment after success
router.post("/verify", verifyPayment);

module.exports = router;