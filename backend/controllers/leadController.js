const supabase = require("../config/db");
const multer = require("multer");
const bcrypt = require("bcrypt");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

/* ============================
   HELPER: GENERATE PASSWORD
============================ */
const generatePassword = () => {
  return Math.random().toString(36).slice(-8);
};

/* ============================
   CREATE STUDENT FROM LEAD
============================ */
const createStudentFromLead = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Get Lead
    const { data: lead, error: leadError } = await supabase
      .from("leads")
      .select("*")
      .eq("id", Number(id))
      .single();

    if (leadError || !lead) {
      return res.status(404).json({
        message: "Lead not found"
      });
    }

    // 2. Check if student already exists
    const { data: existingStudent } = await supabase
      .from("students")
      .select("id")
      .eq("email", lead.email)
      .single();

    if (existingStudent) {
      return res.status(400).json({
        message: "Student already exists"
      });
    }

    // 3. Generate password
    const plainPassword = generatePassword();

    // 4. Hash password
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // 5. Insert into students table
    const { error: insertError } = await supabase
      .from("students")
      .insert([
        {
          full_name: lead.full_name,
          email: lead.email,
          phone: lead.phone,
          address: lead.address || "",
          qualification: lead.highest_education || "",
          field_of_study: lead.interested_specialization || "",
          year_of_completion: "",
          institution: "",
          program: lead.program_type || "",
          password: hashedPassword
        }
      ]);

    if (insertError) {
      console.error("Student Creation Error:", insertError);
      return res.status(500).json({
        message: "Failed to create student",
        error: insertError.message
      });
    }

    res.json({
      message: "Student account created successfully",
      credentials: {
        email: lead.email,
        password: plainPassword
      }
    });
  } catch (error) {
    console.error("Create Student Error:", error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

/* ============================
   EXISTING FUNCTIONS (UNCHANGED)
============================ */
const getLeads = async (req, res) => {
  try {
    const { stage, assigned_to } = req.query;

    let query = supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (stage) {
      query = query.eq("stage", stage.toLowerCase());
    }

    if (assigned_to) {
      query = query.eq("assigned_to", Number(assigned_to));
    }

    const { data, error } = await query;

    if (error) {
      console.error("Get Leads Error:", error);
      return res.status(500).json({
        message: "Database error"
      });
    }

    res.json(data || []);
  } catch (error) {
    console.error("Get Leads Server Error:", error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

const getLeadById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .eq("id", Number(id))
      .single();

    if (error) {
      return res.status(500).json({ message: "Database error" });
    }

    if (!data) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json(data);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

const updateLeadStage = async (req, res) => {
  try {
    const { id } = req.params;
    const { stage, ids } = req.body;

    const normalizedStage = stage ? stage.toLowerCase() : null;

    if (!normalizedStage) {
      return res.status(400).json({ message: "Stage is required" });
    }

    let query;

    if (ids && Array.isArray(ids) && ids.length > 0) {
      query = supabase
        .from("leads")
        .update({ stage: normalizedStage })
        .in("id", ids);
    } else {
      query = supabase
        .from("leads")
        .update({ stage: normalizedStage })
        .eq("id", Number(id));
    }

    const { data, error } = await query.select();

    if (error) {
      return res.status(500).json({ message: "Database error" });
    }

    res.json({ message: "Lead moved successfully", data });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

const updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const updatePayload = req.body;

    const { data, error } = await supabase
      .from("leads")
      .update(updatePayload)
      .eq("id", Number(id))
      .select();

    if (error) {
      return res.status(500).json({ message: "Database error" });
    }

    res.json({ message: "Lead updated successfully", data });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

const assignLeads = async (req, res) => {
  try {
    const { ids, employee_id } = req.body;

    const { data, error } = await supabase
      .from("leads")
      .update({ assigned_to: employee_id, stage: "crm" })
      .in("id", ids)
      .select();

    if (error) {
      return res.status(500).json({ message: "Database error" });
    }

    res.json({ message: "Leads assigned successfully", data });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

const uploadLeadDocument = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = `${id}-${Date.now()}-${req.file.originalname}`;

    await supabase.storage
      .from("lead-documents")
      .upload(filePath, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: true
      });

    const { data } = supabase.storage
      .from("lead-documents")
      .getPublicUrl(filePath);

    await supabase
      .from("leads")
      .update({ id_document_url: data.publicUrl })
      .eq("id", Number(id));

    res.json({ message: "Uploaded", fileUrl: data.publicUrl });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;

    await supabase.from("leads").delete().eq("id", Number(id));

    res.json({ message: "Lead deleted successfully" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  upload,
  getLeads,
  getLeadById,
  updateLeadStage,
  updateLead,
  uploadLeadDocument,
  deleteLead,
  assignLeads,
  createStudentFromLead
};