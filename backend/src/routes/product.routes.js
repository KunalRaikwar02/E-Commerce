const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteProductImage,
} = require("../controllers/product.controller");
const { protect } = require("../middleware/auth.middleware");
const { adminOnly } = require("../middleware/admin.middleware");
const { upload } = require("../config/imagekit"); // 'upload' use karo, 'uploadProductImage' nahi

// ─── Public Routes ───────────────────────────────────────────
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// ─── Admin Only Routes ────────────────────────────────────────
router.post(
  "/",
  protect,
  adminOnly,
  upload.array("images", 5),  // max 5 images
  createProduct
);

router.put(
  "/:id",
  protect,
  adminOnly,
  upload.array("images", 5),
  updateProduct
);

router.delete("/:id", protect, adminOnly, deleteProduct);
router.delete("/:id/image", protect, adminOnly, deleteProductImage);

module.exports = router;