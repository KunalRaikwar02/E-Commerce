const express = require("express");
const router = express.Router();

const {
  getSectionProducts,
  setSectionProducts,
  removeFromSection,
} = require("../controllers/pageProducts.controller");

const { protect } = require("../middleware/auth.middleware");
const { adminOnly } = require("../middleware/admin.middleware");

// Public — frontend fetches section products (no auth needed)
router.get("/:section", getSectionProducts);

// Admin only — set or update section products
router.put("/:section", protect, adminOnly, setSectionProducts);

// Admin only — remove one product from a section
router.delete("/:section/product/:productId", protect, adminOnly, removeFromSection);

module.exports = router;