const express = require("express");
const router = express.Router();
const SupportMessage = require("../models/SupportMessage");
const { protect } = require("../middleware/auth.middleware");
const { adminOnly } = require("../middleware/admin.middleware");

// POST /api/support — user sends message (auth required)
router.post("/", protect, async (req, res) => {
  try {
    const { subject, message } = req.body;
    if (!message) return res.status(400).json({ message: "Message is required" });

    const msg = await SupportMessage.create({
      user: req.user._id,
      name: req.user.name,
      email: req.user.email,
      subject: subject || "General Query",
      message,
    });
    res.status(201).json({ message: "Message sent successfully", data: msg });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/support — admin sees all messages
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const msgs = await SupportMessage.find()
      .sort({ createdAt: -1 })
      .populate("user", "name email");
    res.json(msgs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/support/:id/resolve — admin marks resolved
router.put("/:id/resolve", protect, adminOnly, async (req, res) => {
  try {
    const msg = await SupportMessage.findByIdAndUpdate(
      req.params.id,
      { status: "resolved" },
      { new: true }
    );
    if (!msg) return res.status(404).json({ message: "Message not found" });
    res.json({ message: "Marked as resolved", data: msg });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/support/:id — admin deletes
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    await SupportMessage.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;