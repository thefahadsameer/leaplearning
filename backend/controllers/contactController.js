const { createClient } = require("@supabase/supabase-js");
const { Resend } = require("resend");

// Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Resend
const resend = new Resend(process.env.RESEND_API_KEY);

exports.submitContact = async (req, res) => {
  try {
    console.log("🔥 CONTACT API HIT");
    console.log("BODY:", req.body);

    const { name, email, phone, message, timeSlot } = req.body;

    /* ================= SAVE TO DB ================= */
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

    /* ================= SEND EMAIL ================= */
    try {
      const emailResponse = await resend.emails.send({
        from: "Leap Learning <support@leaplearning.co.in>",
        
        // 🔥 TEMP: send to BOTH (debug purpose)
        to: [
          "support@leaplearning.co.in",
          "insanestriker08@gmail.com"
        ],

        reply_to: email,
        subject: "New Contact Inquiry",
        html: `
          <h3>New Inquiry Received</h3>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>Time Slot:</b> ${timeSlot}</p>
          <p><b>Message:</b> ${message}</p>
        `,
      });

      console.log("✅ EMAIL SENT:", emailResponse);

    } catch (emailError) {
      console.error("❌ EMAIL ERROR:", emailError);
    }

    return res.json({ success: true });

  } catch (err) {
    console.error("❌ SERVER ERROR:", err);
    return res.status(500).json({ error: "Server error" });
  }
};