const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// ✅ User Management
router.get("/users", protect, adminOnly, adminController.getAllUsers);
router.get("/users/:id", protect, adminOnly, adminController.getUserById);
router.put("/users/:id/role", protect, adminOnly, adminController.updateUserRole);
router.delete("/users/:id", protect, adminOnly, adminController.deleteUser);

// ✅ Message Management
router.get("/messages", protect, adminOnly, adminController.getAllMessages);
router.delete("/messages/:id", protect, adminOnly, adminController.deleteMessage);

// ✅ Contact Submissions
router.get("/contacts", protect, adminOnly, adminController.getContacts);

// ✅ System Metrics
router.get("/stats", protect, adminOnly, adminController.systemStats);

module.exports = router;
