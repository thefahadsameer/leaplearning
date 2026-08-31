const express = require("express");
const cors = require("cors");
const path = require("path");

/* ===================================================
   LOAD BACKEND ENVIRONMENT VARIABLES

   The backend .env is located at:
   /backend/.env

   This works correctly even when the command is
   executed from the project root.
=================================================== */

require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

const app = express();

/* ===================================================
   CORS
=================================================== */

app.use(
  cors({
    origin: [
      /* Leap Learning website */
      "https://www.leaplearning.co.in",
      "https://leaplearning.co.in",

      /* Local CRM frontend - Vite */
      "http://localhost:5173",
      "http://127.0.0.1:5173",

      /* Older React development server */
      "http://localhost:3000",

      /* Leap Learning backend */
      "https://leaplearning.onrender.com",

      /* LeapCRM production frontend */
      "https://leapcrm.vercel.app",
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

/* ================= LEAD ROUTES ================= */

const leadRoutes = require("./routes/leadRoutes");

/* ================= NORMAL JSON ================= */

app.use(express.json());

/* ================= CHATBOT ROUTES ================= */

app.use(
  "/api/chat",
  chatRoutes,
);

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
    path.join(
      __dirname,
      "invoices",
    ),
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

/* ===================================================
   LEAD ROUTES

   → /api/leads

   Used by the CRM Leads page for:

   - Getting leads
   - Creating leads
   - Updating leads
   - Deleting leads
=================================================== */

app.use(
  "/api/leads",
  leadRoutes,
);

/* ================= HEALTH CHECK ================= */

app.get(
  "/",
  (req, res) => {
    res.json({
      message: "API running",
    });
  },
);

/* ================= SERVER ================= */

const PORT =
  process.env.PORT || 10000;

app.listen(
  PORT,
  () => {
    console.log(
      `Server running on port ${PORT}`,
    );
  },
);