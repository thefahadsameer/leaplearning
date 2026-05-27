const { createClient } = require("@supabase/supabase-js");
const { Resend } = require("resend");

// ================= SUPABASE =================
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

// ================= RESEND =================
const resend = new Resend(process.env.RESEND_API_KEY);

// ================= LOGO URL =================
const LOGO_URL = "https://leaplearning.co.in/email-logo.png";

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
                    display:block;
                    margin:auto;
                    margin-bottom:20px;
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

                  <p><strong>Name:</strong> ${name}</p>

                  <p><strong>Email:</strong> ${email}</p>

                  <p><strong>Phone:</strong> ${phone}</p>

                  <p><strong>Preferred Time:</strong> ${timeSlot}</p>

                  <p>
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
              border-radius:22px;
              overflow:hidden;
              box-shadow:0 10px 40px rgba(0,0,0,0.08);
            ">

              <!-- TOP -->
              <div style="
                padding:50px 35px 30px 35px;
                text-align:center;
              ">

                <!-- LOGO -->
                <img
                  src="${LOGO_URL}"
                  alt="Leap Learning"
                  style="
                    width:220px;
                    display:block;
                    margin:auto;
                    margin-bottom:35px;
                  "
                />

                <!-- SUCCESS ICON -->
                <div style="
                  width:110px;
                  height:110px;
                  margin:auto;
                  border-radius:50%;
                  background:#ecfdf5;
                  text-align:center;
                  line-height:110px;
                ">
                  <span style="
                    font-size:54px;
                    color:#22c55e;
                    font-weight:bold;
                  ">
                    ✓
                  </span>
                </div>

                <!-- TITLE -->
                <h1 style="
                  margin-top:40px;
                  margin-bottom:20px;
                  color:#0f172a;
                  font-size:54px;
                  font-weight:800;
                ">
                  Thank You!
                </h1>

                <!-- TEXT -->
                <p style="
                  color:#475569;
                  font-size:21px;
                  line-height:1.9;
                  margin:0;
                ">
                  We've received your inquiry.<br/>
                  Our advisory team will connect with you very soon.
                </p>

              </div>

              <!-- FEATURES -->
              <div style="
                padding:15px 35px 10px 35px;
              ">

                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  style="
                    border:1px solid #e2e8f0;
                    border-radius:20px;
                    background:#ffffff;
                  "
                >
                  <tr>

                    <!-- FEATURE 1 -->
                    <td align="center" width="33%" style="
                      padding:35px 20px;
                      border-right:1px solid #e2e8f0;
                    ">

                      <div style="
                        width:72px;
                        height:72px;
                        margin:auto;
                        border-radius:50%;
                        background:#f8fafc;
                        text-align:center;
                        margin-bottom:16px;
                      ">

                        <img
                          src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png"
                          width="28"
                          style="
                            display:block;
                            margin:22px auto 0 auto;
                          "
                        />

                      </div>

                      <div style="
                        width:36px;
                        height:2px;
                        background:#0f172a;
                        margin:0 auto 12px auto;
                        border-radius:20px;
                      "></div>

                      <p style="
                        margin:0;
                        font-size:15px;
                        color:#0f172a;
                        font-weight:700;
                      ">
                        Expert Counselors
                      </p>

                      <p style="
                        margin-top:10px;
                        color:#64748b;
                        font-size:12px;
                        line-height:1.7;
                      ">
                        Personalized academic guidance
                      </p>

                    </td>

                    <!-- FEATURE 2 -->
                    <td align="center" width="33%" style="
                      padding:35px 20px;
                      border-right:1px solid #e2e8f0;
                    ">

                      <div style="
                        width:76px;
                        height:76px;
                        margin:auto;
                        border-radius:50%;
                        background:#f8fafc;
                        text-align:center;
                        margin-bottom:16px;
                      ">

                        <img
                          src="https://cdn-icons-png.flaticon.com/512/8074/8074809.png"
                          width="42"
                          style="
                            display:block;
                            margin:15px auto 0 auto;
                          "
                        />

                      </div>

                      <div style="
                        width:36px;
                        height:2px;
                        background:#0f172a;
                        margin:0 auto 12px auto;
                        border-radius:20px;
                      "></div>

                      <p style="
                        margin:0;
                        font-size:15px;
                        color:#0f172a;
                        font-weight:700;
                      ">
                        Global Universities
                      </p>

                      <p style="
                        margin-top:10px;
                        color:#64748b;
                        font-size:12px;
                        line-height:1.7;
                      ">
                        Access to top universities worldwide
                      </p>

                    </td>

                    <!-- FEATURE 3 -->
                    <td align="center" width="33%" style="
                      padding:35px 20px;
                    ">

                      <div style="
                        width:72px;
                        height:72px;
                        margin:auto;
                        border-radius:50%;
                        background:#f8fafc;
                        text-align:center;
                        margin-bottom:16px;
                      ">

                        <img
                          src="https://cdn-icons-png.flaticon.com/512/565/565547.png"
                          width="28"
                          style="
                            display:block;
                            margin:22px auto 0 auto;
                          "
                        />

                      </div>

                      <div style="
                        width:36px;
                        height:2px;
                        background:#0f172a;
                        margin:0 auto 12px auto;
                        border-radius:20px;
                      "></div>

                      <p style="
                        margin:0;
                        font-size:15px;
                        color:#0f172a;
                        font-weight:700;
                      ">
                        End-to-End Support
                      </p>

                      <p style="
                        margin-top:10px;
                        color:#64748b;
                        font-size:12px;
                        line-height:1.7;
                      ">
                        From shortlisting to visa and beyond
                      </p>

                    </td>

                  </tr>
                </table>

              </div>

              <!-- BUTTON -->
              <div style="
                text-align:center;
                padding:40px 30px;
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
                padding:0 30px 45px 30px;
              ">

                <p style="
                  color:#475569;
                  font-size:18px;
                ">
                  Warm Regards,
                </p>

                <h2 style="
                  margin-top:10px;
                  color:#0f172a;
                  font-size:42px;
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
