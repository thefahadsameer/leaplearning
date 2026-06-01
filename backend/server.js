// // const express = require("express");
// // const cors = require("cors");
// // const path = require("path");
// // require("dotenv").config();


// // /* ✅ NEW IMPORTS (ADDED ONLY) */
// // const nodemailer = require("nodemailer");
// // const { createClient } = require("@supabase/supabase-js");

// // const app = express();

// // /* ================= CORS ================= */
// // app.use(
// //   cors({
// //     origin: [
// //       "https://www.leaplearning.co.in",
// //       "https://leaplearning.co.in",
// //       "http://localhost:3000",
// //     ],
// //     credentials: true,
// //   })
// // );

// // /* ================= ROUTES IMPORT ================= */
// // const paymentRoutes = require("./routes/paymentRoutes");
// // const studentRoutes = require("./routes/studentRoutes");
// // const adminRoutes = require("./routes/adminRoutes");
// // const contactRoutes = require("./routes/contactRoutes");

// // /* ===================================================
// //    IMPORTANT:
// //    WEBHOOK MUST USE RAW BODY BEFORE express.json()
// // =================================================== */
// // app.use(
// //   "/api/payments/webhook",
// //   express.raw({ type: "application/json" })
// // );

// // /* ================= NORMAL JSON ================= */
// // app.use(express.json());

// // /* ================= STATIC INVOICE FILES ================= */
// // app.use(
// //   "/invoices",
// //   express.static(path.join(__dirname, "invoices"))
// // );

// // /* ================= CONTACT ================= */
// // app.use("/api/contact", contactRoutes);

// // /* ================= EXISTING ROUTES ================= */
// // app.use("/api/students", studentRoutes);
// // app.use("/api/payments", paymentRoutes);
// // app.use("/api/admin", adminRoutes);

// // /* ===================================================
// //    ✅ NEW: SUPABASE CONFIG
// // =================================================== */
// // const supabase = createClient(
// //   process.env.SUPABASE_URL,
// //   process.env.SUPABASE_SERVICE_ROLE_KEY
// // );

// // /* ===================================================
// //    ✅ NEW: EMAIL CONFIG (GMAIL)
// // =================================================== */
// // const transporter = nodemailer.createTransport({
// //   service: "gmail",
// //   auth: {
// //     user: process.env.EMAIL_USER,
// //     pass: process.env.EMAIL_PASS,
// //   },
// // });

// // /* ===================================================
// //    ✅ NEW: CONTACT API
// // =================================================== */
// // app.post("/api/contact", async (req, res) => {
// //   const { name, email, phone, message, timeSlot } = req.body;

// //   try {
// //     /* ---------- SAVE TO SUPABASE ---------- */
// //     const { error } = await supabase.from("contacts").insert([
// //       {
// //         name,
// //         email,
// //         phone,
// //         message,
// //         time_slot: timeSlot,
// //       },
// //     ]);

// //     if (error) {
// //       console.error("Supabase error:", error);
// //     }

// //     /* ---------- SEND EMAIL ---------- */
// //     await transporter.sendMail({
// //       from: process.env.EMAIL_USER,
// //       to: "support@leaplearning.co.in",
// //       subject: "New Inquiry from Leap Learning Website",
// //       html: `
// //         <h2>New Contact Inquiry</h2>
// //         <p><strong>Name:</strong> ${name}</p>
// //         <p><strong>Email:</strong> ${email}</p>
// //         <p><strong>Phone:</strong> ${phone}</p>
// //         <p><strong>Preferred Time:</strong> ${timeSlot}</p>
// //         <p><strong>Message:</strong><br/>${message}</p>
// //       `,
// //     });

// //     res.status(200).json({ success: true });

// //   } catch (err) {
// //     console.error("Contact API error:", err);
// //     res.status(500).json({ error: "Failed to send inquiry" });
// //   }
// // });

// // /* ================= HEALTH ================= */
// // app.get("/", (req, res) => {
// //   res.json({ message: "API running" });
// // });

// // /* ================= SERVER ================= */
// // const PORT = process.env.PORT || 10000;

// // app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// // });








// // const express = require("express");
// // const cors = require("cors");
// // const path = require("path");
// // require("dotenv").config();

// // const app = express();

// // /* ================= CORS ================= */
// // app.use(
// //   cors({
// //     origin: [
// //       "https://www.leaplearning.co.in",
// //       "https://leaplearning.co.in",
// //       "http://localhost:3000",
// //     ],
// //     credentials: true,
// //   })
// // );

// // /* ================= ROUTES IMPORT ================= */
// // const paymentRoutes = require("./routes/paymentRoutes");
// // const studentRoutes = require("./routes/studentRoutes");
// // const adminRoutes = require("./routes/adminRoutes");
// // const contactRoutes = require("./routes/contactRoutes");

// // /* ===================================================
// //    WEBHOOK MUST USE RAW BODY BEFORE express.json()
// // =================================================== */
// // app.use(
// //   "/api/payments/webhook",
// //   express.raw({ type: "application/json" })
// // );

// // /* ================= NORMAL JSON ================= */
// // app.use(express.json());

// // /* ================= STATIC FILES ================= */
// // app.use(
// //   "/invoices",
// //   express.static(path.join(__dirname, "invoices"))
// // );

// // /* ================= CONTACT ROUTE (ONLY THIS) ================= */
// // app.use("/api/contact", contactRoutes);

// // /* ================= OTHER ROUTES ================= */
// // app.use("/api/students", studentRoutes);
// // app.use("/api/payments", paymentRoutes);
// // app.use("/api/admin", adminRoutes);

// // /* ================= HEALTH ================= */
// // app.get("/", (req, res) => {
// //   res.json({ message: "API running" });
// // });

// // /* ================= SERVER ================= */
// // const PORT = process.env.PORT || 10000;

// // app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// // });


// const express = require("express");
// const cors = require("cors");
// const path = require("path");
// require("dotenv").config();

// const app = express();

// /* ================= CORS ================= */
// app.use(
//   cors({
//     origin: [
//       "https://www.leaplearning.co.in",
//       "https://leaplearning.co.in",
//       "http://localhost:3000",
//     ],
//     credentials: true,
//   })
// );

// /* ================= ROUTES IMPORT ================= */
// const paymentRoutes = require("./routes/paymentRoutes");
// const studentRoutes = require("./routes/studentRoutes");
// const adminRoutes = require("./routes/adminRoutes");
// const contactRoutes = require("./routes/contactRoutes");

// /* ===================================================
//    WEBHOOK MUST USE RAW BODY BEFORE express.json()
// =================================================== */
// app.use(
//   "/api/payments/webhook",
//   express.raw({ type: "application/json" })
// );

// /* ================= NORMAL JSON ================= */
// app.use(express.json());

// /* ================= STATIC FILES ================= */
// app.use(
//   "/invoices",
//   express.static(path.join(__dirname, "invoices"))
// );

// /* ===================================================
//    CONTACT ROUTE (CONTROLLER HANDLES EVERYTHING)
//    → /api/contact (POST)
// =================================================== */
// app.use("/api/contact", contactRoutes);

// /* ================= EXISTING ROUTES ================= */
// app.use("/api/students", studentRoutes);
// app.use("/api/payments", paymentRoutes);
// app.use("/api/admin", adminRoutes);

// /* ================= HEALTH CHECK ================= */
// app.get("/", (req, res) => {
//   res.json({ message: "API running" });
// });

// /* ================= SERVER ================= */
// const PORT = process.env.PORT || 10000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

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