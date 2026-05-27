const { createClient } = require("@supabase/supabase-js");
const { Resend } = require("resend");

// ================= SUPABASE =================
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ================= RESEND =================
const resend = new Resend(process.env.RESEND_API_KEY);

// ================= LOGO URL =================
// IMPORTANT:
// Put your logo inside frontend/public folder
// Example:
// leep-learning/public/logo.png
const LOGO_URL = "https://leaplearning.co.in/logo.png";

// ================= CONTACT CONTROLLER =================
exports.submitContact = async (req, res) => {
  try {
    console.log("🔥 CONTACT API HIT");
    console.log("BODY:", req.body);

    const { name, email, phone, message, timeSlot } = req.body;

    // ================= SAVE TO DATABASE =================
    const { error } = await supabase.from("contacts").insert([
      {
        name,
        email,
        phone,
        message,
        time_slot: timeSlot,
      },
    ]);

    if (error) {
      console.error("❌ Supabase Error:", error);
      return res.status(500).json({ error: "Database error" });
    }

    // ====================================================
    // ADMIN EMAIL
    // ====================================================
    try {
      await resend.emails.send({
        from: "Leap Learning <support@leaplearning.co.in>",
        to: "support@leaplearning.co.in",
        reply_to: email,
        subject: "New Contact Inquiry",

        html: `
          <div style="
            font-family: Arial, sans-serif;
            background:#f8fafc;
            padding:40px;
          ">

            <div style="
              max-width:700px;
              margin:auto;
              background:#ffffff;
              border-radius:18px;
              overflow:hidden;
              box-shadow:0 10px 35px rgba(0,0,0,0.08);
            ">

              <!-- HEADER -->
              <div style="
                background:linear-gradient(135deg,#0f172a,#1e293b);
                padding:35px;
                text-align:center;
              ">

                <img
                  src="${LOGO_URL}"
                  alt="Leap Learning"
                  style="
                    width:170px;
                    margin-bottom:20px;
                    display:block;
                    margin-left:auto;
                    margin-right:auto;
                  "
                />

                <h1 style="
                  color:white;
                  margin:0;
                  font-size:28px;
                ">
                  New Inquiry Received
                </h1>

              </div>

              <!-- BODY -->
              <div style="padding:40px;">

                <div style="
                  background:#f8fafc;
                  border:1px solid #e2e8f0;
                  border-radius:14px;
                  padding:25px;
                ">

                  <p style="margin:0 0 18px 0;">
                    <strong>Name:</strong> ${name}
                  </p>

                  <p style="margin:0 0 18px 0;">
                    <strong>Email:</strong> ${email}
                  </p>

                  <p style="margin:0 0 18px 0;">
                    <strong>Phone:</strong> ${phone}
                  </p>

                  <p style="margin:0 0 18px 0;">
                    <strong>Preferred Time:</strong> ${timeSlot}
                  </p>

                  <p style="margin:0;">
                    <strong>Message:</strong><br/><br/>
                    ${message}
                  </p>

                </div>

              </div>

              <!-- FOOTER -->
              <div style="
                background:#f1f5f9;
                padding:20px;
                text-align:center;
                font-size:14px;
                color:#475569;
              ">
                support@leaplearning.co.in
                &nbsp;&nbsp;|&nbsp;&nbsp;
                +44 7428 278975
              </div>

            </div>

          </div>
        `,
      });

      console.log("✅ ADMIN EMAIL SENT");

    } catch (adminEmailError) {
      console.error("❌ ADMIN EMAIL ERROR:", adminEmailError);
    }

    // ====================================================
    // USER CONFIRMATION EMAIL
    // ====================================================
    try {
      await resend.emails.send({
        from: "Leap Learning <support@leaplearning.co.in>",
        to: email,
        subject: "Thank You For Contacting Leap Learning",

        html: `
          <div style="
            font-family: Arial, sans-serif;
            background:#f8fafc;
            padding:40px;
          ">

            <div style="
              max-width:720px;
              margin:auto;
              background:#ffffff;
              border-radius:20px;
              overflow:hidden;
              box-shadow:0 10px 40px rgba(0,0,0,0.08);
            ">

              <!-- TOP -->
              <div style="
                padding:45px 35px 25px 35px;
                text-align:center;
              ">

                <!-- LOGO -->
                <img
                  src="${LOGO_URL}"
                  alt="Leap Learning"
                  style="
                    width:190px;
                    display:block;
                    margin:auto;
                    margin-bottom:30px;
                  "
                />

                <!-- SUCCESS ICON -->
                <div style="
                  width:100px;
                  height:100px;
                  margin:auto;
                  border-radius:50%;
                  background:#ecfdf5;
                  text-align:center;
                  line-height:100px;
                ">
                  <div style="
                    font-size:50px;
                    color:#22c55e;
                    font-weight:bold;
                  ">
                    ✓
                  </div>
                </div>

                <!-- TITLE -->
                <h1 style="
                  margin-top:35px;
                  margin-bottom:18px;
                  color:#0f172a;
                  font-size:52px;
                  font-weight:800;
                ">
                  Thank You!
                </h1>

                <!-- TEXT -->
                <p style="
                  color:#475569;
                  font-size:21px;
                  line-height:1.8;
                  margin:0;
                ">
                  We've received your inquiry.<br/>
                  Our advisory team will connect with you very soon.
                </p>

              </div>

              <!-- FEATURES -->
              <div style="
                padding:20px 35px 10px 35px;
              ">

                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  style="
                    border:1px solid #e2e8f0;
                    border-radius:18px;
                    background:#ffffff;
                  "
                >
                  <tr>

                    <!-- FEATURE 1 -->
                    <td align="center" style="padding:30px 20px;">

                      <div style="
                        width:70px;
                        height:70px;
                        border-radius:50%;
                        background:#f8fafc;
                        margin:auto;
                        line-height:70px;
                        font-size:32px;
                        color:#0f172a;
                        font-weight:bold;
                      ">
                        ⦿
                      </div>

                      <p style="
                        margin-top:18px;
                        font-size:16px;
                        color:#0f172a;
                        font-weight:700;
                        line-height:1.5;
                      ">
                        Expert Counselors
                      </p>

                    </td>

                    <!-- FEATURE 2 -->
                    <td align="center" style="padding:30px 20px;">

                      <div style="
                        width:70px;
                        height:70px;
                        border-radius:50%;
                        background:#f8fafc;
                        margin:auto;
                        line-height:70px;
                        font-size:32px;
                        color:#0f172a;
                        font-weight:bold;
                      ">
                        ▲
                      </div>

                      <p style="
                        margin-top:18px;
                        font-size:16px;
                        color:#0f172a;
                        font-weight:700;
                        line-height:1.5;
                      ">
                        Global Universities
                      </p>

                    </td>

                    <!-- FEATURE 3 -->
                    <td align="center" style="padding:30px 20px;">

                      <div style="
                        width:70px;
                        height:70px;
                        border-radius:50%;
                        background:#f8fafc;
                        margin:auto;
                        line-height:70px;
                        font-size:32px;
                        color:#0f172a;
                        font-weight:bold;
                      ">
                        ◆
                      </div>

                      <p style="
                        margin-top:18px;
                        font-size:16px;
                        color:#0f172a;
                        font-weight:700;
                        line-height:1.5;
                      ">
                        End-to-End Support
                      </p>

                    </td>

                  </tr>
                </table>

              </div>

              <!-- BUTTON -->
              <div style="
                text-align:center;
                padding:35px 30px;
              ">

                <a
                  href="https://leaplearning.co.in"
                  style="
                    display:inline-block;
                    background:#0f172a;
                    color:#ffffff;
                    text-decoration:none;
                    padding:20px 55px;
                    border-radius:14px;
                    font-size:20px;
                    font-weight:700;
                  "
                >
                  We will be in touch!
                </a>

              </div>

              <!-- TEAM -->
              <div style="
                text-align:center;
                padding:0 30px 40px 30px;
              ">

                <p style="
                  color:#475569;
                  font-size:18px;
                  line-height:1.8;
                ">
                  Warm Regards,
                </p>

                <h2 style="
                  margin-top:10px;
                  color:#0f172a;
                  font-size:44px;
                  font-weight:800;
                ">
                  Leap Learning Team
                </h2>

              </div>

              <!-- FOOTER -->
              <div style="
                background:#f8fafc;
                border-top:1px solid #e2e8f0;
                padding:24px;
                text-align:center;
                font-size:15px;
                color:#64748b;
              ">

                support@leaplearning.co.in
                &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                +44 7428 278975

              </div>

            </div>

          </div>
        `,
      });

      console.log("✅ USER EMAIL SENT");

    } catch (userEmailError) {
      console.error("❌ USER EMAIL ERROR:", userEmailError);
    }

    return res.json({ success: true });

  } catch (err) {
    console.error("❌ SERVER ERROR:", err);
    return res.status(500).json({ error: "Server error" });
  }
};