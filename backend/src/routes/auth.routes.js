const express = require("express");
const router = express.Router();
const { register, login, adminRegister, getMe, updateProfile } = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");

router.post("/register", register);
router.post("/login", login);
router.post("/admin-register", adminRegister);
router.get("/me", protect, getMe);
router.put("/profile", protect, updateProfile);  // NEW — save profile

module.exports = router;