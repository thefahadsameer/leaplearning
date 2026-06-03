const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

/* ================= CORS ================= */
app.use(
  cors({
    origin: [
      "https://www.leaplearning.co.in",
      "https://leaplearning.co.in",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

/* ================= ROUTES IMPORT ================= */
const paymentRoutes = require("./routes/paymentRoutes");
const studentRoutes = require("./routes/studentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const contactRoutes = require("./routes/contactRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

/* ================= NEW APPLICATION ROUTES ================= */
const applicationRoutes = require("./routes/applicationRoutes");

/* ===================================================
   WEBHOOK MUST USE RAW BODY BEFORE express.json()
=================================================== */
app.use(
  "/api/payments/webhook",
  express.raw({ type: "application/json" })
);

/* ================= NORMAL JSON ================= */
app.use(express.json());

/* ================= STATIC FILES ================= */
app.use(
  "/invoices",
  express.static(path.join(__dirname, "invoices"))
);

/* ===================================================
   CONTACT ROUTE (CONTROLLER HANDLES EVERYTHING)
   → /api/contact
=================================================== */
app.use("/api/contact", contactRoutes);

/* ===================================================
   APPLICATION ROUTES
   → /api/applications
=================================================== */
app.use("/api/applications", applicationRoutes);
app.use("/api/employees", employeeRoutes);

/* ================= EXISTING ROUTES ================= */
app.use("/api/students", studentRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/admin", adminRoutes);

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.json({
    message: "API running",
  });
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});