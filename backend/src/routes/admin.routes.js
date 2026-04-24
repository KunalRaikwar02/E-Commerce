const express = require("express");
const router = express.Router();
const { getDashboard, getAllOrders, updateOrderStatus, getAllUsers } = require("../controllers/admin.controller");
const { protect } = require("../middleware/auth.middleware");
const { adminOnly } = require("../middleware/admin.middleware");

router.use(protect, adminOnly);

router.get("/dashboard", getDashboard);
router.get("/orders", getAllOrders);
router.put("/orders/:id/status", updateOrderStatus);
router.get("/users", getAllUsers);

module.exports = router;