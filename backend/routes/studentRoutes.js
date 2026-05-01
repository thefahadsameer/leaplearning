const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
});

const studentController = require("../controllers/studentController");
const authMiddleware = require("../middleware/authMiddleware");

/* ================= DEBUG ================= */
console.log("STUDENT CONTROLLER:", studentController);

/* ================= ROUTES ================= */

// Create student
router.post(
  "/create",
  (req, res, next) => {
    console.log("➡️ HIT: POST /api/students/create");
    next();
  },
  studentController.createStudent
);

// Login
router.post(
  "/login",
  (req, res, next) => {
    console.log("➡️ HIT: POST /api/students/login");
    console.log("BODY:", req.body);
    next();
  },
  studentController.studentLogin
);

// Get profile
router.get(
  "/profile",
  authMiddleware,
  (req, res, next) => {
    console.log("➡️ HIT: GET /api/students/profile");
    next();
  },
  studentController.getStudentProfile
);

// Update own profile
router.put(
  "/profile",
  authMiddleware,
  upload.single("profile_image"),
  (req, res, next) => {
    console.log("➡️ HIT: PUT /api/students/profile");
    next();
  },
  studentController.updateStudentProfile
);

/* ================= DOCUMENT UPLOAD ================= */

router.put(
  "/documents",
  authMiddleware,
  upload.single("document"),
  (req, res, next) => {
    console.log("➡️ HIT: PUT /api/students/documents");
    next();
  },
  studentController.uploadStudentDocument
);

/* ================= ADMIN STUDENT MANAGEMENT ================= */

// Get all students
router.get(
  "/all",
  (req, res, next) => {
    console.log("➡️ HIT: GET /api/students/all");
    next();
  },
  studentController.getAllStudents
);

// Update student by id
router.put(
  "/admin/:id",
  (req, res, next) => {
    console.log("➡️ HIT: PUT /api/students/admin/:id");
    next();
  },
  studentController.updateStudentById
);

// Delete student by id
router.delete(
  "/admin/:id",
  (req, res, next) => {
    console.log("➡️ HIT: DELETE /api/students/admin/:id");
    next();
  },
  studentController.deleteStudentById
);

/* ================= 404 SAFETY ================= */
router.use((req, res) => {
  res.status(404).json({
    message: "Student route not found",
  });
});

module.exports = router;