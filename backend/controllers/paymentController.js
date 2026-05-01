const supabase = require("../config/db");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

/* ================= GET PAYMENTS ================= */
const getMyPayments = async (req, res) => {
  try {
    const email = req.user.email;

    const { data, error } = await supabase
      .from("payments")
      .select("*")
      .eq("email", email)
      .order("payment_date", { ascending: false });

    if (error) throw error;

    return res.json(data || []);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

/* ================= CREATE PDF ================= */
const createInvoicePDF = async ({
  invoiceNumber,
  studentName,
  email,
  program,
  amount,
  paymentDate,
}) => {
  const folderPath = path.join(__dirname, "../invoices");

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  const fileName = `${invoiceNumber}.pdf`;
  const filePath = path.join(folderPath, fileName);

  const doc = new PDFDocument({
    size: "A4",
    margin: 40,
  });

  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(22).text("LEAP LEARNING", {
    align: "center",
  });

  doc.moveDown();

  doc.fontSize(12).text("PAYMENT INVOICE", {
    align: "center",
  });

  doc.moveDown(2);

  doc.text(`Invoice No: ${invoiceNumber}`);
  doc.text(`Date: ${paymentDate}`);
  doc.text(`Student Name: ${studentName}`);
  doc.text(`Email: ${email}`);
  doc.text(`Program: ${program}`);

  doc.moveDown();

  doc.text(`Amount Paid: ₹${amount}`);
  doc.text(`Payment Method: Razorpay`);
  doc.text(`Status: Paid`);

  doc.moveDown(2);

  doc.text("Thank you for your payment.", {
    align: "center",
  });

  doc.end();

  return fileName;
};

/* ================= WEBHOOK ================= */
const handleWebhook = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const signature =
      req.headers["x-razorpay-signature"];

    const expected = crypto
      .createHmac("sha256", secret)
      .update(req.body)
      .digest("hex");

    if (signature !== expected) {
      return res.status(400).json({
        message: "Invalid signature",
      });
    }

    const event = JSON.parse(req.body.toString());

    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;

      const amount =
        Number(payment.amount || 0) / 100;

      let email =
        payment.email ||
        payment.notes?.email ||
        payment.contact_email ||
        null;

      let student = null;

      /* ================= NORMAL MATCH ================= */
      if (email) {
        const { data } = await supabase
          .from("students")
          .select("*")
          .eq("email", email)
          .maybeSingle();

        student = data;
      }

      /* ================= FALLBACK MATCH ================= */
      if (!student) {
        const { data } = await supabase
          .from("students")
          .select("*")
          .gt("pending_fees", 0)
          .eq("pending_fees", amount)
          .limit(1)
          .maybeSingle();

        if (data) {
          student = data;
          email = data.email;
        }
      }

      /* ================= LAST FALLBACK ================= */
      if (!student) {
        const { data } = await supabase
          .from("students")
          .select("*")
          .eq("total_fee", amount)
          .order("created_at", {
            ascending: false,
          })
          .limit(1)
          .maybeSingle();

        if (data) {
          student = data;
          email = data.email;
        }
      }

      if (!student) {
        return res.json({
          status: "student_not_found",
        });
      }

      /* ================= DUPLICATE CHECK ================= */
      const { data: existing } = await supabase
        .from("payments")
        .select("id")
        .eq("razorpay_payment_id", payment.id)
        .maybeSingle();

      if (existing) {
        return res.json({
          status: "already_saved",
        });
      }

      const invoiceNumber =
        student.invoice_number || "INV-1001";

      const invoiceFile =
        await createInvoicePDF({
          invoiceNumber,
          studentName:
            student.full_name || "Student",
          email,
          program: student.program || "",
          amount,
          paymentDate:
            new Date().toLocaleDateString(),
        });

      /* ================= INSERT PAYMENT ================= */
      await supabase.from("payments").insert([
        {
          email,
          student_id: student.id,
          amount,
          payment_date: new Date(),
          payment_method: "Razorpay",
          razorpay_payment_id: payment.id,
          status: "Paid",
          invoice_number: invoiceNumber,
          invoice_file: invoiceFile,
        },
      ]);

      /* ================= UPDATE STUDENT ================= */
      const totalPaid =
        Number(student.total_paid || 0) + amount;

      const totalFee =
        Number(student.total_fee || 0);

      const pending =
        totalFee - totalPaid > 0
          ? totalFee - totalPaid
          : 0;

      await supabase
        .from("students")
        .update({
          total_paid: totalPaid,
          pending_fees: pending,
          last_payment: amount,
        })
        .eq("id", student.id);
    }

    return res.json({
      status: "ok",
    });
  } catch (error) {
    console.error("Webhook Error:", error);

    return res.status(500).json({
      message: "Webhook failed",
    });
  }
};

module.exports = {
  getMyPayments,
  handleWebhook,
};