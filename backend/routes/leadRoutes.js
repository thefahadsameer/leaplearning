const express = require("express");
const router = express.Router();

const multer = require("multer");

/* 🔥 FIX: DEFINE MULTER HERE */
const upload = multer({ storage: multer.memoryStorage() });

const leadController = require("../controllers/leadController");

/* ============================
   GET ROUTES
============================ */
router.get("/", leadController.getLeads);
router.get("/:id", leadController.getLeadById);

/* ============================
   CREATE STUDENT (NEW)
============================ */
router.post("/:id/create-student", leadController.createStudentFromLead);

/* ============================
   UPDATE STAGE ROUTES
============================ */
router.put("/stage", leadController.updateLeadStage);
router.put("/:id/stage", leadController.updateLeadStage);

/* ============================
   UPDATE LEAD
============================ */
router.put("/:id", leadController.updateLead);

/* ============================
   UPLOAD DOCUMENT (FIXED)
============================ */
router.post(
  "/:id/upload-id",
  upload.single("document"), // ✅ FIXED HERE
  leadController.uploadLeadDocument
);

/* ============================
   DELETE
============================ */
router.delete("/:id", leadController.deleteLead);

module.exports = router;