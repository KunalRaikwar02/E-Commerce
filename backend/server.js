const express  = require("express");
const cors     = require("cors");
const dotenv   = require("dotenv");
const path     = require("path");

dotenv.config();

const connectDB = require("./src/config/db");
connectDB();

const app = express();

/* CORS */
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "https://www.veltorn.store",
  "http://localhost:5173",
  "http://localhost:4173",
  "http://localhost:3000",
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("CORS: origin not allowed — " + origin), false);
  },
  credentials: true,
}));

/* Body Parsers */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

/* API Routes */
app.use("/api/auth",          require("./src/routes/auth.routes"));
app.use("/api/products",      require("./src/routes/product.routes"));
app.use("/api/orders",        require("./src/routes/order.routes"));
app.use("/api/admin",         require("./src/routes/admin.routes"));
app.use("/api/payment",       require("./src/routes/payment.routes"));
app.use("/api/page-products", require("./src/routes/pageProducts.routes"));
app.use("/api/support",       require("./src/routes/support.routes"));
app.use("/api/ai",            require("./src/routes/ai.routes"));

/* Health check */
app.get("/", (req, res) =>
  res.json({ message: "VELTORN API Running ✅", version: "1.0.0", env: process.env.NODE_ENV || "development" })
);
app.get("/api/health", (req, res) =>
  res.json({ status: "ok", uptime: Math.floor(process.uptime()) + "s" })
);

app.use((req, res) =>
  res.status(404).json({ message: "Route not found — " + req.originalUrl })
);

/* Global Error Handler */
app.use((err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE")
    return res.status(400).json({ message: "File too large. Max size: 10MB" });
  if (err.name === "MulterError")
    return res.status(400).json({ message: "Upload error: " + err.message });
  if (err.message?.startsWith("CORS"))
    return res.status(403).json({ message: err.message });
  console.error("❌ Unhandled Error:", err.stack || err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

/* Start Server */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("━".repeat(45));
  console.log(`✅  VELTORN Server  →  http://localhost:${PORT}`);
  console.log(`📦  Mode            →  ${process.env.NODE_ENV || "development"}`);
  console.log(`🌐  CORS Origins    →  ${allowedOrigins.join(", ")}`);
  console.log("━".repeat(45));
});

module.exports = app;