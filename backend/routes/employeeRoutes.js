const express = require("express");
const router = express.Router();

const {
  loginEmployee,
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getAssignedApplications,
} = require("../controllers/employeeController");

router.post("/login", loginEmployee);

router.get("/", getEmployees);

router.post("/", createEmployee);

router.get("/:employeeId/applications", getAssignedApplications);

router.put("/:id", updateEmployee);

router.delete("/:id", deleteEmployee);

module.exports = router;
