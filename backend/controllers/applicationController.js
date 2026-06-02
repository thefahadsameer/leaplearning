const supabase = require("../config/db");

/* ============================
   CREATE APPLICATION
============================ */
const createApplication = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      address,
      qualification,
      field,
      year,
      institution,
      program,
    } = req.body;

    const { data, error } = await supabase
      .from("applications")
      .insert([
        {
          full_name: fullName,
          email,
          phone,
          address,
          qualification,
          field,
          year,
          institution,
          program,
          status: "New",
        },
      ])
      .select()
      .single();

    if (error) throw error;

    await supabase.from("application_audit_logs").insert([
      {
        application_id: data.id,
        action: "Application Submitted",
        previous_status: null,
        new_status: "New",
        performed_by: "Applicant",
      },
    ]);

    return res.status(201).json({
      success: true,
      application: data,
    });
  } catch (error) {
    console.error("CREATE APPLICATION ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ============================
   GET ALL APPLICATIONS
============================ */
const getApplications = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .eq("is_deleted", false)
      .order("created_at", {
        ascending: false,
      });

    if (error) throw error;

    res.json(data || []);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ============================
   GET SINGLE APPLICATION
============================ */
const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ============================
   GET AUDIT LOGS
============================ */
const getApplicationAuditLogs = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("application_audit_logs")
      .select("*")
      .eq("application_id", id)
      .order("created_at", {
        ascending: true,
      });

    if (error) throw error;

    return res.json(data || []);
  } catch (error) {
    console.error("AUDIT LOG FETCH ERROR:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

/* ============================
   UPDATE STATUS
============================ */
const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, performedBy } = req.body;

    const { data: existing } = await supabase
      .from("applications")
      .select("*")
      .eq("id", id)
      .single();

    if (!existing) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    const previousStatus = existing.status;

    const { data, error } = await supabase
      .from("applications")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    await supabase.from("application_audit_logs").insert([
      {
        application_id: id,
        action: "STATUS_CHANGE",
        previous_status: previousStatus,
        new_status: status,
        performed_by: performedBy || "Admin",
      },
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ============================
   BULK SOFT DELETE APPLICATIONS
============================ */
const softDeleteApplication = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Application IDs are required",
      });
    }

    const { error } = await supabase
      .from("applications")
      .update({
        is_deleted: true,
        deleted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .in("id", ids);

    if (error) throw error;

    /* ============================
   GET RECYCLE BIN APPLICATIONS
============================ */
const getDeletedApplications = async (
  req,
  res
) => {
  try {
    const { data, error } =
      await supabase
        .from("applications")
        .select("*")
        .eq("is_deleted", true)
        .order("deleted_at", {
          ascending: false,
        });

    if (error) throw error;

    return res.json(data || []);
  } catch (error) {
    console.error(
      "RECYCLE BIN FETCH ERROR:",
      error
    );

    return res.status(500).json({
      message: error.message,
    });
  }
};

    /* ============================
       AUDIT LOGS
    ============================ */

    const auditRows = ids.map((applicationId) => ({
      application_id: applicationId,
      action: "SOFT_DELETE",
      previous_status: null,
      new_status: "Deleted",
      performed_by: "Admin",
    }));

    await supabase.from("application_audit_logs").insert(auditRows);

    return res.json({
      success: true,
      message: "Applications moved to recycle bin",
    });
  } catch (error) {
    console.error("SOFT DELETE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createApplication,
  getApplications,
  getApplicationById,
  getApplicationAuditLogs,
  updateApplicationStatus,
  softDeleteApplication,
  getDeletedApplications,
};
