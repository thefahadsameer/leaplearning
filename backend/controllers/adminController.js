const supabase = require("../config/db");

/* ============================
   ADMIN LOGIN
============================ */
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Admin Login Attempt:", email);

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }

    const { data, error } = await supabase
      .from("admins")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .single();

    if (error || !data) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    return res.json({
      message: "Login successful",
      admin: {
        id: data.id,
        email: data.email,
        role: data.role || "admin",
      },
    });
  } catch (error) {
    console.error("Admin Login Error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

/* ============================
   UPLOAD INVOICE
============================ */
const uploadInvoice = async (req, res) => {
  try {
    const {
      student_id,
      amount,
      payment_date,
      payment_method,
      remarks,
    } = req.body;

    /* ============================
       VALIDATION
    ============================ */
    if (!student_id) {
      return res.status(400).json({
        message: "Student ID required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Invoice PDF required",
      });
    }

    /* ============================
       GET STUDENT
    ============================ */
    const { data: student, error: studentError } =
      await supabase
        .from("students")
        .select("*")
        .eq("id", student_id)
        .single();

    if (studentError || !student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    /* ============================
       SAFE FILE NAME
    ============================ */
    const originalName =
      req.file.originalname || "invoice.pdf";

    const cleanName = originalName.replace(
      /[^a-zA-Z0-9._-]/g,
      "_"
    );

    const fileName = `student_${student.id}_${Date.now()}_${cleanName}`;

    /* ============================
       UPLOAD TO SUPABASE STORAGE
    ============================ */
    const { error: uploadError } =
      await supabase.storage
        .from("invoices")
        .upload(fileName, req.file.buffer, {
          contentType:
            req.file.mimetype ||
            "application/pdf",
          upsert: true,
        });

    if (uploadError) {
      console.error(
        "SUPABASE STORAGE ERROR:",
        uploadError
      );

      return res.status(500).json({
        message: "Storage upload failed",
        error: uploadError.message,
      });
    }

    /* ============================
       GET PUBLIC URL
    ============================ */
    const { data: publicData } =
      supabase.storage
        .from("invoices")
        .getPublicUrl(fileName);

    const invoiceUrl =
      publicData?.publicUrl || null;

    /* ============================
       CALCULATIONS
    ============================ */
    const payAmount = Number(amount || 0);

    const totalFee = Number(
      student.total_fee || 0
    );

    const oldPaid = Number(
      student.total_paid || 0
    );

    const newPaid = oldPaid + payAmount;

    const pendingFees =
      totalFee - newPaid < 0
        ? 0
        : totalFee - newPaid;

    /* ============================
       INSERT PAYMENT
    ============================ */
    const { error: paymentError } =
      await supabase.from("payments").insert([
        {
          student_id: student.id,
          email: student.email,
          amount: payAmount,
          payment_date:
            payment_date ||
            new Date()
              .toISOString()
              .split("T")[0],
          payment_method:
            payment_method ||
            "Admin Upload",
          status: "Paid",
          total_fee: totalFee,
          total_paid: newPaid,
          pending_fees: pendingFees,
          last_payment: payAmount,
          invoice_number:
            student.invoice_number || null,
          invoice_file: invoiceUrl,
          uploaded_by: "admin",
          remarks: remarks || null,
        },
      ]);

    if (paymentError) {
      console.error(
        "PAYMENT INSERT ERROR:",
        paymentError
      );

      return res.status(500).json({
        message: "Payment save failed",
        error: paymentError.message,
      });
    }

    /* ============================
       UPDATE STUDENT
    ============================ */
    const { error: updateError } =
      await supabase
        .from("students")
        .update({
          total_paid: newPaid,
          pending_fees: pendingFees,
          last_payment: payAmount,
        })
        .eq("id", student.id);

    if (updateError) {
      console.error(
        "STUDENT UPDATE ERROR:",
        updateError
      );

      return res.status(500).json({
        message: "Student update failed",
        error: updateError.message,
      });
    }

    return res.status(200).json({
      message: "Invoice uploaded successfully",
      invoice_url: invoiceUrl,
    });
  } catch (error) {
    console.error(
      "UPLOAD INVOICE ERROR:",
      error
    );

    return res.status(500).json({
      message: "Invoice upload failed",
      error: error.message,
    });
  }
};

module.exports = {
  adminLogin,
  uploadInvoice,
};