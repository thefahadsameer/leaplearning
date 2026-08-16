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
      "https://leaplearning.onrender.com",
    ],
    credentials: true,
  }),
);

/* ================= ROUTES IMPORT ================= */

const paymentRoutes = require("./routes/paymentRoutes");
const studentRoutes = require("./routes/studentRoutes");
const contactRoutes = require("./routes/contactRoutes");

/* ================= CHATBOT ROUTES ================= */

const chatRoutes = require("./routes/chatRoutes");

/* ================= APPLICATION ROUTES ================= */

const applicationRoutes = require("./routes/applicationRoutes");

/* ================= NORMAL JSON ================= */

app.use(express.json());

/* ================= CHATBOT ROUTES ================= */

app.use("/api/chat", chatRoutes);

/* ===================================================
   PAYMENT WEBHOOK

   Raw body must be available before express.json()
=================================================== */

app.use(
  "/api/payments/webhook",
  express.raw({
    type: "application/json",
  }),
);

/* ================= STATIC FILES ================= */

app.use(
  "/invoices",
  express.static(
    path.join(__dirname, "invoices"),
  ),
);

/* ===================================================
   CONTACT ROUTES

   → /api/contact
=================================================== */

app.use(
  "/api/contact",
  contactRoutes,
);

/* ===================================================
   APPLICATION ROUTES

   → /api/applications
=================================================== */

app.use(
  "/api/applications",
  applicationRoutes,
);

/* ================= STUDENT ROUTES ================= */

app.use(
  "/api/students",
  studentRoutes,
);

/* ================= PAYMENT ROUTES ================= */

app.use(
  "/api/payments",
  paymentRoutes,
);

/* ================= HEALTH CHECK ================= */

app.get("/", (req, res) => {
  res.json({
    message: "API running",
  });
});

/* ================= SERVER ================= */

const PORT =
  process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`,
  );
});