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
    // ADMIN EMAIL (GOES TO SUPPORT TEAM)
    // ====================================================
    try {
      await resend.emails.send({
        from: "Leap Learning <support@leaplearning.co.in>",

        // ONLY ADMIN EMAIL
        to: "support@leaplearning.co.in",

        reply_to: email,

        subject: "New Contact Inquiry",

        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            
            <h2 style="color:#0f172a;">
              New Inquiry Received
            </h2>

            <p>
              <strong>Name:</strong> ${name}
            </p>

            <p>
              <strong>Email:</strong> ${email}
            </p>

            <p>
              <strong>Phone:</strong> ${phone}
            </p>

            <p>
              <strong>Preferred Time:</strong> ${timeSlot}
            </p>

            <p>
              <strong>Message:</strong><br/>
              ${message}
            </p>

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

        // SEND TO USER
        to: email,

        subject: "We Received Your Inquiry",

        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            
            <h2 style="color:#0f172a;">
              Thank You for Contacting Leap Learning
            </h2>

            <p>
              Hi ${name},
            </p>

            <p>
              We have successfully received your inquiry.
            </p>

            <p>
              Our advisory team will contact you shortly.
            </p>

            <br/>

            <p>
              Regards,<br/>
              Leap Learning Team
            </p>

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