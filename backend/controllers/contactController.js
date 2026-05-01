const { createClient } = require("@supabase/supabase-js");
const nodemailer = require("nodemailer");

// Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // change later if needed
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.submitContact = async (req, res) => {
  try {
    const { name, email, phone, message, timeSlot } = req.body;

    // 1️⃣ Save to Supabase
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
      console.error(error);
      return res.status(500).json({ error: "Database error" });
    }

    // 2️⃣ Send Email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "support@leaplearning.co.in",
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

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};