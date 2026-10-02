const express = require("express");
const multer = require("multer");

const {
  submitCareerApplication,
} = require("../controllers/careerController");

const router = express.Router();

/* =========================================================
   MULTER CONFIGURATION

   Files remain in memory only.
   They are NOT saved to localStorage,
   disk storage, or your CRM.
   ========================================================= */

const storage =
  multer.memoryStorage();

const upload = multer({
  storage,

  limits: {
    fileSize:
      10 * 1024 * 1024,
    files: 2,
  },

  fileFilter: (
    req,
    file,
    cb,
  ) => {
    if (file.fieldname === "photo") {
      const allowedPhotoTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
      ];

      if (
        !allowedPhotoTypes.includes(
          file.mimetype,
        )
      ) {
        return cb(
          new Error(
            "Passport photo must be JPG, JPEG, or PNG.",
          ),
        );
      }

      return cb(null, true);
    }

    if (file.fieldname === "cv") {
      const isPdf =
        file.mimetype ===
          "application/pdf" ||
        file.originalname
          .toLowerCase()
          .endsWith(".pdf");

      if (!isPdf) {
        return cb(
          new Error(
            "CV must be uploaded in PDF format only.",
          ),
        );
      }

      return cb(null, true);
    }

    return cb(
      new Error(
        "Invalid file field.",
      ),
    );
  },
});

/* =========================================================
   POST /api/career/apply
   ========================================================= */

router.post(
  "/apply",
  (req, res, next) => {
    upload.fields([
      {
        name: "photo",
        maxCount: 1,
      },
      {
        name: "cv",
        maxCount: 1,
      },
    ])(
      req,
      res,
      (error) => {
        if (!error) {
          return next();
        }

        console.error(
          "❌ CAREER UPLOAD ERROR:",
          error,
        );

        if (
          error.code ===
          "LIMIT_FILE_SIZE"
        ) {
          return res.status(400).json({
            success: false,
            error:
              "Each uploaded file must not exceed 10 MB.",
          });
        }

        return res.status(400).json({
          success: false,
          error:
            error.message ||
            "Invalid uploaded file.",
        });
      },
    );
  },
  submitCareerApplication,
);

module.exports = router;