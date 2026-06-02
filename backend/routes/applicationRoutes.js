const express = require("express");

const router = express.Router();

const applicationController = require(
  "../controllers/applicationController"
);

router.post(
  "/",
  applicationController.createApplication
);

router.get(
  "/",
  applicationController.getApplications
);

/* MUST COME BEFORE /:id */
router.get(
  "/:id/audit",
  applicationController.getApplicationAuditLogs
);

router.get(
  "/:id",
  applicationController.getApplicationById
);

router.put(
  "/:id/status",
  applicationController.updateApplicationStatus
);

router.delete(
  "/:id",
  applicationController.softDeleteApplication
);

module.exports = router;