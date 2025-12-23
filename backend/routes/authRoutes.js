// backend/routes/authRoutes.js
const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  checkAuth,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

// Ì¥ê Auth Routes
router.post("/register", registerUser);       // Create new user
router.post("/login", loginUser);             // Login + get token
router.post("/logout", logoutUser);           // Logout (invalidate token)

// Ì¥ë Protected route (check if user is authenticated)
router.get("/check-auth", protect, checkAuth);

// Ì¥Ñ Password Reset Flow
router.post("/forgot-password", forgotPassword);       // Request reset link
router.post("/reset-password/:token", resetPassword);  // Reset with token

module.exports = router;

