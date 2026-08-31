const express = require("express");

const {
  createLead,
  importLeads,
  getLeads,
  deleteLead,
  deleteLeads,
  assignLeads,
} = require("../controllers/leadController");

const router = express.Router();

/* =========================================================
   CREATE ONE LEAD

   POST /api/leads
========================================================= */

router.post(
  "/",
  createLead
);

/* =========================================================
   IMPORT MULTIPLE LEADS

   POST /api/leads/import
========================================================= */

router.post(
  "/import",
  importLeads
);

/* =========================================================
   GET ALL LEADS

   GET /api/leads
========================================================= */

router.get(
  "/",
  getLeads
);

/* =========================================================
   DELETE ONE LEAD

   DELETE /api/leads/:id
========================================================= */

router.delete(
  "/:id",
  deleteLead
);

/* =========================================================
   DELETE MULTIPLE LEADS

   POST /api/leads/bulk-delete
========================================================= */

router.post(
  "/bulk-delete",
  deleteLeads
);

/* =========================================================
   ASSIGN LEADS TO EMPLOYEE

   PUT /api/leads/assign
========================================================= */

router.put(
  "/assign",
  assignLeads
);

module.exports = router;