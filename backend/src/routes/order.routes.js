// ==================== order.routes.js ====================
const express = require("express");
const router = express.Router();
const { placeOrder, getMyOrders, getOrderById } = require("../controllers/order.controller");
const { protect } = require("../middleware/auth.middleware");

router.post("/", placeOrder);                    // Guest bhi order kar sakta hai
router.get("/my", protect, getMyOrders);         // Login hona zaruri
router.get("/:id", protect, getOrderById);

module.exports = router;