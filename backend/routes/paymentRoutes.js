const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/paymentController");
const authMiddleware = require("../middleware/authMiddleware");

/* ================= DEBUG ================= */
console.log("PAYMENT CONTROLLER:", paymentController);

/* ================= ROUTES ================= */

// Get payments (by email)
router.get("/my", authMiddleware, paymentController.getMyPayments);

// 🔥 WEBHOOK (RAW BODY REQUIRED)
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  paymentController.handleWebhook
);

module.exports = router;