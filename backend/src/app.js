const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/products", require("./routes/product.routes"));
app.use("/api/orders", require("./routes/order.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/payment", require("./routes/payment.routes"));
app.use("/api/page-products", require("./routes/pageProducts.routes"));
app.use("/api/support", require("./routes/support.routes")); // NEW

app.get("/", (req, res) => res.json({ message: "VELTORN API Running" }));
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

app.use((err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") return res.status(400).json({ message: "File too large. Max 10MB." });
  if (err.name === "MulterError") return res.status(400).json({ message: "Upload error: " + err.message });
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));