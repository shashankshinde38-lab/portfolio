const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
require("dotenv").config();

const { testConnection } = require("./config/db");
const contactRoutes = require("./routes/contact");

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──
const allowedOrigins = [
  "http://localhost:8080",
  "http://127.0.0.1:8080",
  "http://localhost:3000",
  "http://localhost:5173",
  "https://shashankportfolio-jet.vercel.app",
  ...(process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",").map((s) => s.trim()) : []),
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      return callback(null, allowedOrigins.includes(origin));
    },
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Request logger ──
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// ── Routes ──
app.use("/api/contact", contactRoutes);

// ── Health check ──
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// ── 404 handler ──
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.url} not found`,
  });
});

// ── Error handler ──
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// ── Start server ──
async function start() {
  await testConnection();
  app.listen(PORT, () => {
    console.log(`\n▸ Server running on http://localhost:${PORT}`);
    console.log(`▸ Health check:    http://localhost:${PORT}/api/health`);
    console.log(`▸ Contact API:     http://localhost:${PORT}/api/contact\n`);
  });
}

start();
