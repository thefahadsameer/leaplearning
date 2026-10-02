const express = require("express");
const multer = require("multer");

const {
  submitCareerApplication,
} = require("../controllers/careerController");

const router = express.Router();

/* =========================================================
   MULTER CONFIGURATION
========================================================= */

const storage = multer.memoryStorage();

const upload = multer({
  storage,

  limits: {
    // Maximum 10 MB per uploaded file
    fileSize: 10 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    /* =====================================================
       PASSPORT PHOTO
    ===================================================== */

    if (file.fieldname === "photo") {
      const allowedPhotoTypes = [
        "image/jpeg",
        "image/png",
      ];

      if (!allowedPhotoTypes.includes(file.mimetype)) {
        return cb(
          new Error(
            "Passport-size photo must be a JPG or PNG image."
          )
        );
      }

      return cb(null, true);
    }

    /* =====================================================
       CV
    ===================================================== */

    if (file.fieldname === "cv") {
      const isPdfMimeType =
        file.mimetype === "application/pdf";

      const isPdfExtension =
        /\.pdf$/i.test(file.originalname);

      if (!isPdfMimeType || !isPdfExtension) {
        return cb(
          new Error(
            "CV must be uploaded in PDF format only."
          )
        );
      }

      return cb(null, true);
    }

    return cb(
      new Error(
        "Invalid file field. Please upload a passport photo and CV."
      )
    );
  },
});

/* =========================================================
   SUBMIT CAREER APPLICATION
========================================================= */

router.post(
  "/",

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
    ])(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            success: false,
            error:
              "Each uploaded file must be 10 MB or smaller.",
          });
        }

        return res.status(400).json({
          success: false,
          error:
            err.message || "File upload failed.",
        });
      }

      if (err) {
        return res.status(400).json({
          success: false,
          error:
            err.message || "Invalid file upload.",
        });
      }

      next();
    });
  },

  submitCareerApplication
);

/* =========================================================
   EXPORT ROUTER
========================================================= */

module.exports = router;