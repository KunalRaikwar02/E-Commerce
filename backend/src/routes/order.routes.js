// // ==================== order.routes.js ====================
// const express = require("express");
// const router = express.Router();
// const { placeOrder, getMyOrders, getOrderById } = require("../controllers/order.controller");
// const { protect } = require("../middleware/auth.middleware");

// router.post("/", placeOrder);                    // Guest bhi order kar sakta hai
// router.get("/my", protect, getMyOrders);         // Login hona zaruri
// router.get("/:id", protect, getOrderById);

// module.exports = router;



const express = require("express");
const router = express.Router();
const { placeOrder, getMyOrders, getOrderById } = require("../controllers/order.controller");
const { protect } = require("../middleware/auth.middleware");

// CRITICAL: /my MUST be before /:id
// Otherwise Express treats "my" as an :id param and tries to find order with id="my"
router.post("/", protect, placeOrder);
router.get("/my", protect, getMyOrders);
router.get("/:id", protect, getOrderById);

module.exports = router;