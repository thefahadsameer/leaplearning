const { createClient } = require("@supabase/supabase-js");
const { Resend } = require("resend");

// Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Resend Email
const resend = new Resend(process.env.RESEND_API_KEY);

exports.submitContact = async (req, res) => {
  try {
    const { name, email, phone, message, timeSlot } = req.body;

    // 1️⃣ Save to Supabase (UNCHANGED)
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
      console.error("Supabase Error:", error);
      return res.status(500).json({ error: "Database error" });
    }

    // 2️⃣ Send Email (FIXED)
    try {
      await resend.emails.send({
        from: "Leap Learning <support@leaplearning.co.in>", // your verified domain
        to: ["support@leaplearning.co.in"],
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
    } catch (emailError) {
      // DO NOT BREAK API
      console.error("Email Error:", emailError);
    }

    // RESPONSE (UNCHANGED)
    res.json({ success: true });

  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};