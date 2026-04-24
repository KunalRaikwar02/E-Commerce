const express = require("express");
const router = express.Router();
const { placeOrder, getMyOrders, getOrderById } = require("../controllers/order.controller");
const { protect } = require("../middleware/auth.middleware");

router.post("/", protect, placeOrder);
router.get("/my", protect, getMyOrders);
router.get("/:id", protect, getOrderById);

module.exports = router;