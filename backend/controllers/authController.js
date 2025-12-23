// backend/controllers/authController.js
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

/* Generate JWT */
function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

/* ---------------- Register ---------------- */
async function registerUser(req, res) {
  try {
    console.log("Ì¥π Body received in register:", req.body); // Debugging

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      console.log("‚ùå Missing fields in register:", { name, email, password });
      return res.status(400).json({ error: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log("‚ùå User already exists:", email);
      return res.status(400).json({ error: "User already exists" });
    }

    // Pre-save hook will hash the password
    const user = await User.create({ name, email, password });

    console.log(`‚úÖ Registration successful for ${email}`); // Success log

    res.status(201).json({
      success: true,
      message: `‚úÖ User registered successfully! Welcome, ${name}`,
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error("Register error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}

/* ---------------- Login ---------------- */
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    console.log("Ì¥π Login attempt:", { email });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    console.log(`‚úÖ Login successful for ${email}`);

    res.json({
      success: true,
      message: `‚úÖ Login successful! Welcome back, ${user.name}`,
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}

/* ---------------- Logout ---------------- */
async function logoutUser(req, res) {
  res.json({ success: true, message: "‚úÖ Logged out successfully" });
}

/* ---------------- Check Auth ---------------- */
async function checkAuth(req, res) {
  try {
    res.json({ success: true, user: req.user });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

/* ---------------- Forgot Password ---------------- */
async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // TODO: send email with token link
    console.log(`Ì¥π Password reset token generated for ${email}: ${resetToken}`);

    res.json({ success: true, message: "‚úÖ Password reset token generated", token: resetToken });
  } catch (err) {
    console.error("Forgot password error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}

/* ---------------- Reset Password ---------------- */
async function resetPassword(req, res) {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    if (!user) return res.status(400).json({ error: "Invalid or expired token" });

    // Pre-save hook will hash password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    console.log(`‚úÖ Password reset successful for ${user.email}`);

    res.json({ success: true, message: "‚úÖ Password reset successful" });
  } catch (err) {
    console.error("Reset password error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  checkAuth,
  forgotPassword,
  resetPassword
};

