// backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const path = require("path");

// Config + DB
const config = require("./config/config");
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const adminRoutes = require("./routes/adminRoutes");
const contactRoutes = require("./routes/contact");

// Middleware
const errorHandler = require("./middleware/errorHandler");

const app = express();

/* ---------------- CORS ---------------- */
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:10000",
  "https://encrolink.netlify.app",
  config.clientUrl || "",
  config.frontendUrl || "",
].filter(Boolean);

app.use(
  cors({
    origin(origin, cb) {
      if (!origin || allowedOrigins.includes(origin)) {
        cb(null, true);
      } else {
        cb(new Error("❌ Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ---------------- Force HTTPS in Production ---------------- */
app.use((req, res, next) => {
  if (
    process.env.NODE_ENV === "production" &&
    req.headers["x-forwarded-proto"] !== "https"
  ) {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
});

/* ---------------- Core Middleware ---------------- */
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

/* ---------------- Static Uploads ---------------- */
// ✅ Serve uploaded avatars/images correctly
app.use(
  "/uploads",
  cors({ origin: allowedOrigins, credentials: true }),
  express.static(path.join(__dirname, "uploads"))
);

/* ---------------- Public Routes ---------------- */
app.get("/health", (_req, res) => res.status(200).send("✅ Backend is healthy!"));
app.get("/", (_req, res) => res.send("✅ Welcome to EncroLink API"));

/* ---------------- API Routes ---------------- */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);

/* ---------------- 404 Handler ---------------- */
app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

/* ---------------- Error Handler ---------------- */
app.use(errorHandler);

/* ---------------- Server Init ---------------- */
(async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 10000;
    app.listen(PORT, () => {
      console.log(
        `✅ Server running on ${
          process.env.NODE_ENV === "production"
            ? `https://encrolink-backend.onrender.com`
            : `http://localhost:${PORT}`
        }`
      );
    });
  } catch (err) {
    console.error("❌ Failed to connect to DB:", err.message);
    process.exit(1);
  }
})();

