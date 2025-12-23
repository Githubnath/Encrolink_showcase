// backend/routes/messageRoutes.js
const express = require("express");
const router = express.Router();

const {
  sendMessage,
  getMessages,
  getMessageById,
  deleteMessage,
  markAsRead,
} = require("../controllers/messageController");

const { protect } = require("../middleware/authMiddleware");

// Messaging Endpoints
router.post("/", protect, sendMessage);
router.get("/", protect, getMessages);
router.get("/:id", protect, getMessageById);
router.delete("/:id", protect, deleteMessage);
router.put("/:id/read", protect, markAsRead);

module.exports = router;

