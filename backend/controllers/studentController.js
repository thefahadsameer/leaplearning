const supabase = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* ================= CREATE STUDENT ================= */
const createStudent = async (req, res) => {
  try {
    let {
      full_name,
      email,
      phone,
      password,
      program,
      total_fee,
      invoice_number,
    } = req.body;

    email = email.trim().toLowerCase();

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("students")
      .insert([
        {
          full_name,
          email,
          phone,
          password: hashedPassword,
          program,
          total_fee: Number(total_fee || 0),
          invoice_number: invoice_number || null,
        },
      ])
      .select();

    if (error) throw error;

    return res.json({
      message: "Student created successfully",
      data,
    });
  } catch (error) {
    console.error("CREATE STUDENT ERROR:", error);

    return res.status(500).json({
      message: "Student creation failed",
      error: error.message,
    });
  }
};

/* ================= LOGIN ================= */
const studentLogin = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }

    email = email.trim().toLowerCase();

    const { data, error } = await supabase
      .from("students")
      .select("*")
      .ilike("email", email);

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const student = data[0];

    const isMatch = await bcrypt.compare(
      password,
      student.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: student.id,
        email: student.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.json({
      message: "Login successful",
      token,
      student,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};

/* ================= GET PROFILE ================= */
const getStudentProfile = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("students")
      .select("*")
      .eq("id", req.user.id)
      .single();

    if (error) throw error;

    return res.json(data);
  } catch (error) {
    console.error("PROFILE ERROR:", error);

    return res.status(500).json({
      message: "Failed to fetch profile",
    });
  }
};

/* ================= UPDATE PROFILE ================= */
const updateStudentProfile = async (req, res) => {
  try {
    let updates = { ...req.body };

    if (
      !updates.password ||
      updates.password.trim() === ""
    ) {
      delete updates.password;
    } else {
      updates.password = await bcrypt.hash(
        updates.password,
        10
      );
    }

    if (updates.email) {
      updates.email = updates.email
        .trim()
        .toLowerCase();

      const { data: existingUser } =
        await supabase
          .from("students")
          .select("id")
          .eq("email", updates.email)
          .maybeSingle();

      if (
        existingUser &&
        existingUser.id !== req.user.id
      ) {
        return res.status(400).json({
          message: "Email already in use",
        });
      }
    }

    if (req.file) {
      const fileExt =
        req.file.originalname
          .split(".")
          .pop();

      const fileName = `student_${req.user.id}_${Date.now()}.${fileExt}`;

      const { error: uploadError } =
        await supabase.storage
          .from("student-profiles")
          .upload(fileName, req.file.buffer, {
            contentType:
              req.file.mimetype,
            upsert: true,
          });

      if (uploadError)
        throw uploadError;

      const { data: publicData } =
        supabase.storage
          .from("student-profiles")
          .getPublicUrl(fileName);

      updates.profile_image =
        publicData.publicUrl;
    }

    const { data, error } =
      await supabase
        .from("students")
        .update(updates)
        .eq("id", req.user.id)
        .select();

    if (error) throw error;

    return res.json({
      message:
        "Profile updated successfully",
      data,
    });
  } catch (error) {
    console.error(
      "UPDATE ERROR:",
      error
    );

    return res.status(500).json({
      message:
        "Profile update failed",
      error: error.message,
    });
  }
};

/* ================= UPLOAD STUDENT DOCUMENT ================= */
const uploadStudentDocument = async (
  req,
  res
) => {
  try {
    const { document_type } =
      req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    if (!document_type) {
      return res.status(400).json({
        message:
          "Document type required",
      });
    }

    const fileExt =
      req.file.originalname
        .split(".")
        .pop();

    const fileName = `student_${req.user.id}_${document_type}_${Date.now()}.${fileExt}`;

    const { error: uploadError } =
      await supabase.storage
        .from("student-documents")
        .upload(fileName, req.file.buffer, {
          contentType:
            req.file.mimetype,
          upsert: true,
        });

    if (uploadError)
      throw uploadError;

    const { data: publicData } =
      supabase.storage
        .from("student-documents")
        .getPublicUrl(fileName);

    const updates = {};

    updates[document_type] =
      publicData.publicUrl;

    const { data, error } =
      await supabase
        .from("students")
        .update(updates)
        .eq("id", req.user.id)
        .select();

    if (error) throw error;

    return res.json({
      message:
        "Document uploaded successfully",
      data,
    });
  } catch (error) {
    console.error(
      "DOCUMENT UPLOAD ERROR:",
      error
    );

    return res.status(500).json({
      message:
        "Document upload failed",
      error: error.message,
    });
  }
};

/* ================= GET ALL STUDENTS ================= */
const getAllStudents = async (
  req,
  res
) => {
  try {
    const { data, error } =
      await supabase
        .from("students")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    if (error) throw error;

    return res.json(data || []);
  } catch (error) {
    return res.status(500).json({
      message:
        "Failed to fetch students",
    });
  }
};

/* ================= UPDATE STUDENT BY ID ================= */
const updateStudentById = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    let updates = {
      ...req.body,
    };

    if (
      !updates.password ||
      updates.password.trim() === ""
    ) {
      delete updates.password;
    } else {
      updates.password =
        await bcrypt.hash(
          updates.password,
          10
        );
    }

    const { data, error } =
      await supabase
        .from("students")
        .update(updates)
        .eq("id", id)
        .select();

    if (error) throw error;

    return res.json({
      message:
        "Student updated successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message:
        "Student update failed",
    });
  }
};

/* ================= DELETE STUDENT ================= */
const deleteStudentById = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const { error } =
      await supabase
        .from("students")
        .delete()
        .eq("id", id);

    if (error) throw error;

    return res.json({
      message:
        "Student deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message:
        "Student delete failed",
    });
  }
};

module.exports = {
  createStudent,
  studentLogin,
  getStudentProfile,
  updateStudentProfile,
  uploadStudentDocument,
  getAllStudents,
  updateStudentById,
  deleteStudentById,
};