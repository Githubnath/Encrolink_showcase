// backend/controllers/userController.js
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");

/**
 * GET /api/users/profile
 */
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json({ user });
});

/**
 * PUT /api/users/profile
 */
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  await user.save();
  const returned = await User.findById(user._id).select("-password");
  res.json({ user: returned });
});

/**
 * POST /api/users/avatar
 * expects multer middleware upload.single("avatar")
 */
const uploadAvatar = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("No file uploaded");
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    fs.unlinkSync(req.file.path);
    res.status(404);
    throw new Error("User not found");
  }

  // delete previous avatar if stored locally
  if (user.avatar && user.avatar.includes("/uploads/")) {
    try {
      const prevFilename = path.basename(user.avatar);
      const prevPath = path.join(__dirname, "..", "uploads", prevFilename);
      if (fs.existsSync(prevPath)) fs.unlinkSync(prevPath);
    } catch (e) {
      console.warn("Failed to delete previous avatar:", e.message);
    }
  }

  // ✅ Build proper URL depending on environment
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.BACKEND_URL || "https://encrolink-backend.onrender.com"
      : `${req.protocol}://${req.get("host")}`;

  const avatarUrl = `${baseUrl}/uploads/${req.file.filename}`;

  user.avatar = avatarUrl;
  await user.save();

  const returned = await User.findById(user._id).select("-password");
  res.json({ user: returned });
});

/**
 * DELETE /api/users/avatar
 */
const deleteAvatar = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user.avatar && user.avatar.includes("/uploads/")) {
    try {
      const filename = path.basename(user.avatar);
      const filePath = path.join(__dirname, "..", "uploads", filename);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    } catch (e) {
      console.warn("Error deleting avatar file:", e.message);
    }
    user.avatar = undefined;
    await user.save();
  }

  const returned = await User.findById(user._id).select("-password");
  res.json({ user: returned });
});

/**
 * DELETE /api/users/account
 */
const deleteAccount = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user.avatar && user.avatar.includes("/uploads/")) {
    const filename = path.basename(user.avatar);
    const filePath = path.join(__dirname, "..", "uploads", filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }

  await user.deleteOne();
  res.json({ message: "Account deleted" });
});

module.exports = {
  getProfile,
  updateProfile,
  uploadAvatar,
  deleteAvatar,
  deleteAccount,
};

