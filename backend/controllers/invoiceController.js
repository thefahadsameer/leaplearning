const supabase = require("../config/db");
const fs = require("fs");
const path = require("path");

/* ===============================
UPLOAD INVOICE BY ADMIN
=============================== */
const uploadInvoice = async (req, res) => {
  try {
    const { student_id } = req.params;

    const {
      amount,
      paid_amount,
      remaining_amount,
      invoice_number,
      remarks,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "PDF file required",
      });
    }

    /* GET STUDENT */
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

    /* CREATE FOLDER */
    const folderPath = path.join(
      __dirname,
      "../invoices"
    );

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, {
        recursive: true,
      });
    }

    /* SAVE FILE */
    const fileName =
      Date.now() + "_" + req.file.originalname;

    const filePath = path.join(
      folderPath,
      fileName
    );

    fs.writeFileSync(filePath, req.file.buffer);

    /* INSERT INTO PAYMENTS TABLE */
    const { error } = await supabase
      .from("payments")
      .insert([
        {
          student_id: student.id,
          email: student.email,

          amount: Number(amount || 0),
          total_paid: Number(
            paid_amount || 0
          ),
          pending_fees: Number(
            remaining_amount || 0
          ),
          total_fee: Number(
            student.total_fee || 0
          ),

          payment_method: "Admin Upload",
          payment_date: new Date(),
          status: "Paid",

          invoice_number,
          invoice_file: fileName,
          remarks,
        },
      ]);

    if (error) throw error;

    return res.json({
      message:
        "Invoice uploaded successfully",
    });
  } catch (error) {
    console.error(
      "UPLOAD INVOICE ERROR:",
      error
    );

    return res.status(500).json({
      message: "Upload failed",
    });
  }
};

module.exports = {
  uploadInvoice,
};