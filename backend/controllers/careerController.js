const { Resend } = require("resend");

// ================= RESEND =================

const resend = new Resend(
  process.env.RESEND_API_KEY,
);

// ================= CONSTANTS =================

const HR_EMAIL =
  "hr@leaplearning.co.in";

const FROM_EMAIL =
  "Leap Learning <support@leaplearning.co.in>";

const MAX_FILE_SIZE =
  10 * 1024 * 1024;

// ================= HELPERS =================

const escapeHtml = (value = "") => {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    String(email).trim(),
  );
};

// ================= CAREER APPLICATION =================

exports.submitCareerApplication = async (
  req,
  res,
) => {
  try {
    console.log(
      "🔥 CAREER APPLICATION API HIT",
    );

    const {
      firstName,
      middleName,
      lastName,
      phone,
      email,
    } = req.body;

    // ====================================================
    // BASIC VALIDATION
    // ====================================================

    if (
      !firstName ||
      !lastName ||
      !phone ||
      !email
    ) {
      return res.status(400).json({
        success: false,
        error:
          "Please complete all required fields.",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error:
          "Please provide a valid email address.",
      });
    }

    // ====================================================
    // FILE VALIDATION
    // ====================================================

    const photo =
      req.files?.photo?.[0];

    const cv =
      req.files?.cv?.[0];

    if (!photo) {
      return res.status(400).json({
        success: false,
        error:
          "Passport size photo is required.",
      });
    }

    if (!cv) {
      return res.status(400).json({
        success: false,
        error:
          "CV in PDF format is required.",
      });
    }

    // ====================================================
    // PHOTO VALIDATION
    // ====================================================

    if (photo.size > MAX_FILE_SIZE) {
      return res.status(400).json({
        success: false,
        error:
          "Passport photo must not exceed 10 MB.",
      });
    }

    const allowedPhotoTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];

    if (
      !allowedPhotoTypes.includes(
        photo.mimetype,
      )
    ) {
      return res.status(400).json({
        success: false,
        error:
          "Passport photo must be JPG, JPEG, or PNG.",
      });
    }

    // ====================================================
    // CV VALIDATION
    // ====================================================

    if (cv.size > MAX_FILE_SIZE) {
      return res.status(400).json({
        success: false,
        error:
          "CV must not exceed 10 MB.",
      });
    }

    const isPdf =
      cv.mimetype === "application/pdf" ||
      cv.originalname
        .toLowerCase()
        .endsWith(".pdf");

    if (!isPdf) {
      return res.status(400).json({
        success: false,
        error:
          "CV must be uploaded in PDF format only.",
      });
    }

    // ====================================================
    // SANITIZED DATA
    // ====================================================

    const safeFirstName =
      escapeHtml(firstName.trim());

    const safeMiddleName =
      escapeHtml(
        middleName
          ? middleName.trim()
          : "",
      );

    const safeLastName =
      escapeHtml(lastName.trim());

    const safePhone =
      escapeHtml(phone.trim());

    const safeEmail =
      escapeHtml(email.trim());

    const fullName = [
      safeFirstName,
      safeMiddleName,
      safeLastName,
    ]
      .filter(Boolean)
      .join(" ");

    // ====================================================
    // PREPARE ATTACHMENTS
    // ====================================================

    const attachments = [
      {
        filename:
          photo.originalname ||
          "passport-photo",
        content:
          photo.buffer.toString(
            "base64",
          ),
        content_type:
          photo.mimetype,
      },
      {
        filename:
          cv.originalname ||
          "cv.pdf",
        content:
          cv.buffer.toString(
            "base64",
          ),
        content_type:
          "application/pdf",
      },
    ];

    // ====================================================
    // HR EMAIL
    // ====================================================

    try {
      const hrEmailResponse =
        await resend.emails.send({
          from: FROM_EMAIL,
          to: HR_EMAIL,
          reply_to: email,
          subject:
            "New Job Application - Business Development Executive",

          html: `
            <div style="
              margin:0;
              padding:40px 20px;
              background:#f4f7fb;
              font-family:Arial,Helvetica,sans-serif;
            ">

              <div style="
                max-width:720px;
                margin:0 auto;
                background:#ffffff;
                border-radius:18px;
                overflow:hidden;
                box-shadow:0 12px 35px rgba(15,23,42,0.08);
              ">

                <div style="
                  padding:32px;
                  background:linear-gradient(
                    135deg,
                    #0d2f66,
                    #1768ad
                  );
                  text-align:center;
                ">

                  <h1 style="
                    margin:0;
                    color:#ffffff;
                    font-size:28px;
                  ">
                    New Job Application
                  </h1>

                  <p style="
                    margin:10px 0 0;
                    color:rgba(255,255,255,0.82);
                    font-size:15px;
                  ">
                    Business Development Executive
                  </p>

                </div>

                <div style="
                  padding:32px;
                ">

                  <div style="
                    margin-bottom:25px;
                    padding:20px;
                    border:1px solid #e2e8f0;
                    border-radius:12px;
                    background:#f8fbff;
                  ">

                    <h2 style="
                      margin:0 0 18px;
                      color:#15233b;
                      font-size:19px;
                    ">
                      Applicant Details
                    </h2>

                    <p style="
                      margin:9px 0;
                      color:#475569;
                      font-size:14px;
                    ">
                      <strong>Name:</strong>
                      ${fullName}
                    </p>

                    <p style="
                      margin:9px 0;
                      color:#475569;
                      font-size:14px;
                    ">
                      <strong>Email:</strong>
                      ${safeEmail}
                    </p>

                    <p style="
                      margin:9px 0;
                      color:#475569;
                      font-size:14px;
                    ">
                      <strong>Phone:</strong>
                      ${safePhone}
                    </p>

                    <p style="
                      margin:9px 0;
                      color:#475569;
                      font-size:14px;
                    ">
                      <strong>Position:</strong>
                      Business Development Executive
                    </p>

                  </div>

                  <div style="
                    padding:18px;
                    border:1px solid #dbeafe;
                    border-radius:12px;
                    background:#eff6ff;
                  ">

                    <p style="
                      margin:0;
                      color:#1e40af;
                      font-size:14px;
                      line-height:1.6;
                    ">
                      The applicant's passport size photo
                      and CV are attached to this email.
                    </p>

                  </div>

                </div>

                <div style="
                  padding:20px 30px;
                  background:#f8fafc;
                  border-top:1px solid #e2e8f0;
                  text-align:center;
                ">

                  <p style="
                    margin:0;
                    color:#64748b;
                    font-size:13px;
                  ">
                    Leap Learning HR Department
                  </p>

                  <p style="
                    margin:7px 0 0;
                    color:#64748b;
                    font-size:13px;
                  ">
                    hr@leaplearning.co.in
                  </p>

                </div>

              </div>

            </div>
          `,

          attachments,
        });

      console.log(
        "✅ HR APPLICATION EMAIL SENT:",
        hrEmailResponse?.data?.id,
      );
    } catch (hrEmailError) {
      console.error(
        "❌ HR APPLICATION EMAIL ERROR:",
        hrEmailError,
      );

      return res.status(500).json({
        success: false,
        error:
          "Unable to send your application to the HR team. Please try again.",
      });
    }

    // ====================================================
    // APPLICANT CONFIRMATION EMAIL
    // ====================================================

    let confirmationSent = false;

    try {
      const confirmationResponse =
        await resend.emails.send({
          from: FROM_EMAIL,
          to: email,
          subject:
            "Application Received - Leap Learning",

          html: `
            <div style="
              margin:0;
              padding:40px 20px;
              background:#f4f7fb;
              font-family:Arial,Helvetica,sans-serif;
            ">

              <div style="
                max-width:700px;
                margin:0 auto;
                background:#ffffff;
                border-radius:18px;
                overflow:hidden;
                box-shadow:0 12px 35px rgba(15,23,42,0.08);
              ">

                <div style="
                  padding:35px 30px;
                  text-align:center;
                  background:#ffffff;
                ">

                  <div style="
                    width:72px;
                    height:72px;
                    margin:0 auto 22px;
                    border-radius:50%;
                    background:#ecfdf5;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                  ">

                    <span style="
                      color:#16a34a;
                      font-size:38px;
                      font-weight:700;
                    ">
                      ✓
                    </span>

                  </div>

                  <h1 style="
                    margin:0;
                    color:#0f172a;
                    font-size:30px;
                  ">
                    Application Received
                  </h1>

                  <p style="
                    margin:16px auto 0;
                    max-width:520px;
                    color:#64748b;
                    font-size:15px;
                    line-height:1.8;
                  ">
                    Dear ${safeFirstName},
                    <br/><br/>
                    Thank you for applying for the
                    <strong>
                      Business Development Executive
                    </strong>
                    position at Leap Learning.
                  </p>

                </div>

                <div style="
                  padding:0 30px 30px;
                ">

                  <div style="
                    padding:22px;
                    border:1px solid #e2e8f0;
                    border-radius:14px;
                    background:#f8fafc;
                  ">

                    <p style="
                      margin:0;
                      color:#334155;
                      font-size:14px;
                      line-height:1.8;
                    ">
                      Your application and submitted documents
                      have been received successfully by our
                      recruitment team.
                    </p>

                    <p style="
                      margin:15px 0 0;
                      color:#334155;
                      font-size:14px;
                      line-height:1.8;
                    ">
                      Our team will review your application and
                      contact you if your profile is shortlisted
                      for the next stage.
                    </p>

                  </div>

                </div>

                <div style="
                  padding:25px 30px;
                  text-align:center;
                  border-top:1px solid #e2e8f0;
                  background:#f8fafc;
                ">

                  <p style="
                    margin:0;
                    color:#64748b;
                    font-size:13px;
                  ">
                    Warm Regards,
                  </p>

                  <h2 style="
                    margin:7px 0 0;
                    color:#0f172a;
                    font-size:22px;
                  ">
                    Leap Learning
                  </h2>

                  <p style="
                    margin:10px 0 0;
                    color:#64748b;
                    font-size:13px;
                  ">
                    hr@leaplearning.co.in
                  </p>

                </div>

              </div>

            </div>
          `,
        });

      confirmationSent = true;

      console.log(
        "✅ APPLICANT CONFIRMATION EMAIL SENT:",
        confirmationResponse?.data?.id,
      );
    } catch (confirmationError) {
      console.error(
        "❌ APPLICANT CONFIRMATION EMAIL ERROR:",
        confirmationError,
      );
    }

    // ====================================================
    // RESPONSE
    // ====================================================

    return res.status(200).json({
      success: true,
      confirmationSent,
    });
  } catch (error) {
    console.error(
      "❌ CAREER APPLICATION SERVER ERROR:",
      error,
    );

    return res.status(500).json({
      success: false,
      error:
        "Something went wrong while processing your application.",
    });
  }
};