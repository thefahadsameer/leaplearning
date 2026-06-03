const express = require("express");

const router = express.Router();

const applicationController = require("../controllers/applicationController");

/* ============================
   CREATE APPLICATION
============================ */
router.post("/", applicationController.createApplication);

/* ============================
   GET RECYCLE BIN APPLICATIONS
   MUST COME BEFORE /:id
============================ */
router.get("/recycle-bin", applicationController.getDeletedApplications);

/* ============================
   GET ALL APPLICATIONS
============================ */
router.get("/", applicationController.getApplications);

/* ============================
   GET AUDIT LOGS
   MUST COME BEFORE /:id
============================ */
router.get("/:id/audit", applicationController.getApplicationAuditLogs);

/* ============================
   BULK SOFT DELETE
============================ */
router.delete("/bulk-delete", applicationController.softDeleteApplication);

/* ============================
   RESTORE APPLICATION
============================ */
router.put("/:id/restore", applicationController.restoreApplication);

/* ============================
   PERMANENT DELETE
============================ */
router.delete(
  "/:id/permanent-delete",
  applicationController.permanentDeleteApplication,
);

/* ============================
   GET SINGLE APPLICATION
============================ */
router.get("/:id", applicationController.getApplicationById);

/* ============================
   UPDATE APPLICATION STATUS
============================ */
router.put("/:id/status", applicationController.updateApplicationStatus);

module.exports = router;
