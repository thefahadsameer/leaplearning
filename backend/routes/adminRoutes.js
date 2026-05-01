const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
});

const adminController = require("../controllers/adminController");

/* ============================
   ADMIN LOGIN
============================ */
router.post(
  "/login",
  adminController.adminLogin
);

/* ============================
   INVOICE UPLOAD
============================ */
router.post(
  "/upload-invoice/:studentId",
  upload.single("invoice"),
  adminController.uploadInvoice
);

module.exports = router;