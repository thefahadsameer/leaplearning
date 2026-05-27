const { createClient } = require("@supabase/supabase-js");
const { Resend } = require("resend");

// ================= SUPABASE =================
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ================= RESEND =================
const resend = new Resend(process.env.RESEND_API_KEY);

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
                  src="https://leaplearning.co.in/logo.png"
                  alt="Leap Learning"
                  style="
                    width:160px;
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

              <!-- TOP HEADER -->
              <div style="
                padding:40px 30px 20px 30px;
                text-align:center;
                background:#ffffff;
              ">

                <img
                  src="https://leaplearning.co.in/logo.png"
                  alt="Leap Learning"
                  style="
                    width:170px;
                    margin-bottom:25px;
                  "
                />

                <div style="
                  width:90px;
                  height:90px;
                  background:#ecfdf5;
                  border-radius:50%;
                  margin:auto;
                  line-height:90px;
                  font-size:40px;
                  color:#22c55e;
                  font-weight:bold;
                ">
                  ✓
                </div>

                <h1 style="
                  margin-top:28px;
                  margin-bottom:12px;
                  color:#0f172a;
                  font-size:42px;
                  font-weight:700;
                ">
                  Thank You!
                </h1>

                <p style="
                  color:#475569;
                  font-size:18px;
                  line-height:1.7;
                  margin:0;
                ">
                  We've received your inquiry.<br/>
                  Our advisory team will connect with you very soon.
                </p>

              </div>

              <!-- FEATURE BOX -->
              <div style="
                padding:20px 35px;
              ">

                <div style="
                  background:#ffffff;
                  border:1px solid #e2e8f0;
                  border-radius:18px;
                  padding:30px 20px;
                  display:flex;
                  justify-content:space-between;
                  gap:15px;
                  text-align:center;
                ">

                  <div style="flex:1;">
                    <div style="
                      font-size:30px;
                      margin-bottom:10px;
                    ">
                      👨‍🏫
                    </div>

                    <div style="
                      font-size:14px;
                      color:#0f172a;
                      font-weight:600;
                    ">
                      Expert Counselors
                    </div>
                  </div>

                  <div style="flex:1;">
                    <div style="
                      font-size:30px;
                      margin-bottom:10px;
                    ">
                      🎓
                    </div>

                    <div style="
                      font-size:14px;
                      color:#0f172a;
                      font-weight:600;
                    ">
                      Global Universities
                    </div>
                  </div>

                  <div style="flex:1;">
                    <div style="
                      font-size:30px;
                      margin-bottom:10px;
                    ">
                      🌍
                    </div>

                    <div style="
                      font-size:14px;
                      color:#0f172a;
                      font-weight:600;
                    ">
                      End-to-End Support
                    </div>
                  </div>

                </div>

              </div>

              <!-- BUTTON -->
              <div style="
                text-align:center;
                padding:10px 30px 35px 30px;
              ">

                <a
                  href="https://leaplearning.co.in"
                  style="
                    display:inline-block;
                    background:#0f172a;
                    color:#ffffff;
                    text-decoration:none;
                    padding:16px 45px;
                    border-radius:12px;
                    font-size:18px;
                    font-weight:600;
                  "
                >
                  We will be in touch!
                </a>

              </div>

              <!-- MESSAGE -->
              <div style="
                text-align:center;
                padding:0 30px 35px 30px;
              ">

                <p style="
                  color:#475569;
                  font-size:17px;
                  line-height:1.8;
                ">
                  Warm Regards,<br/>
                  <strong style="color:#0f172a;">
                    Leap Learning Team
                  </strong>
                </p>

              </div>

              <!-- FOOTER -->
              <div style="
                background:#f8fafc;
                border-top:1px solid #e2e8f0;
                padding:20px;
                text-align:center;
                font-size:14px;
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