const supabase = require("../config/db");

/* =========================================================
   Generate Lead ID
========================================================= */

function generateLeadId() {
  const timestamp = Date.now()
    .toString(36)
    .toUpperCase();

  const random = Math.random()
    .toString(36)
    .substring(2, 6)
    .toUpperCase();

  return `LD-${timestamp}-${random}`;
}

/* =========================================================
   Normalize Date
========================================================= */

function normalizeDate(value) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value).trim();
}

/* =========================================================
   Normalize Text
========================================================= */

function normalizeText(value) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value).trim();
}

/* =========================================================
   Normalize Email
========================================================= */

function normalizeEmail(value) {
  return normalizeText(value).toLowerCase();
}

/* =========================================================
   Build Lead For Database
========================================================= */

function buildLead({
  date,
  fullName,
  phoneNumber,
  email,
  educationalLevel,
  status = "Cold",
  priority = "Normal",
  source = "Manual",
}) {
  return {
    id: generateLeadId(),

    date: normalizeDate(date),

    full_name: normalizeText(fullName),

    phone_number: normalizeText(phoneNumber),

    email: normalizeEmail(email),

    educational_level:
      normalizeText(educationalLevel),

    status:
      normalizeText(status || "Cold"),

    priority:
      normalizeText(priority || "Normal"),

    assigned_to: "Unassigned",

    assigned_employee_id: null,

    assigned_employee_name: "",

    assigned_at: null,

    next_follow_up: "",

    source:
      normalizeText(source) || "Manual",
  };
}

/* =========================================================
   Validate Lead Data
========================================================= */

function validateLeadData({
  date,
  fullName,
  phoneNumber,
  email,
  educationalLevel,
  status = "Cold",
  priority = "Normal",
}) {
  const errors = [];

  /* ----------------------------------------
     Date
  ---------------------------------------- */

  if (!normalizeText(date)) {
    errors.push("Date is required.");
  }

  /* ----------------------------------------
     Full Name
  ---------------------------------------- */

  if (!normalizeText(fullName)) {
    errors.push("Full Name is required.");
  }

  /* ----------------------------------------
     Phone Number
  ---------------------------------------- */

  if (!normalizeText(phoneNumber)) {
    errors.push("Phone Number is required.");
  }

  /* ----------------------------------------
     Email
  ---------------------------------------- */

  const normalizedEmail =
    normalizeEmail(email);

  if (!normalizedEmail) {
    errors.push("Email is required.");
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      normalizedEmail
    )
  ) {
    errors.push("Invalid email.");
  }

  /* ----------------------------------------
     Educational Level
  ---------------------------------------- */

  if (!normalizeText(educationalLevel)) {
    errors.push(
      "Educational Level is required."
    );
  }

  /* ----------------------------------------
     Status
  ---------------------------------------- */

  const allowedStatuses = [
    "Cold",
    "Warm",
    "Hot",
    "Converted",
  ];

  const normalizedStatus =
    normalizeText(status || "Cold");

  if (
    !allowedStatuses.includes(
      normalizedStatus
    )
  ) {
    errors.push("Invalid lead status.");
  }

  /* ----------------------------------------
     Priority
  ---------------------------------------- */

  const allowedPriorities = [
    "Low",
    "Normal",
    "High",
  ];

  const normalizedPriority =
    normalizeText(priority || "Normal");

  if (
    !allowedPriorities.includes(
      normalizedPriority
    )
  ) {
    errors.push("Invalid lead priority.");
  }

  return errors;
}

/* =========================================================
   CREATE ONE LEAD
   POST /api/leads
========================================================= */

exports.createLead = async (
  req,
  res
) => {
  try {
    console.log("LEAD CREATE API HIT");
    console.log("BODY:", req.body);

    const {
      date,
      fullName,
      phoneNumber,
      email,
      educationalLevel,
      status,
      priority,
      source,
    } = req.body || {};

    /* ----------------------------------------
       Validation
    ---------------------------------------- */

    const validationErrors =
      validateLeadData({
        date,
        fullName,
        phoneNumber,
        email,
        educationalLevel,
        status,
        priority,
      });

    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: validationErrors[0],
        errors: validationErrors,
      });
    }

    /* ----------------------------------------
       Normalize
    ---------------------------------------- */

    const normalizedStatus =
      normalizeText(status || "Cold");

    const normalizedPriority =
      normalizeText(priority || "Normal");

    /* ----------------------------------------
       Build Lead
    ---------------------------------------- */

    const lead = buildLead({
      date,
      fullName,
      phoneNumber,
      email,
      educationalLevel,
      status: normalizedStatus,
      priority: normalizedPriority,
      source,
    });

    /* ----------------------------------------
       Insert
    ---------------------------------------- */

    const {
      data,
      error,
    } = await supabase
      .from("leads")
      .insert([lead])
      .select()
      .single();

    if (error) {
      console.error(
        "SUPABASE LEAD INSERT ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to save lead to database.",
        error: error.message,
      });
    }

    console.log(
      "Lead created successfully:",
      data
    );

    return res.status(201).json({
      success: true,
      message:
        "Lead created successfully.",
      lead: data,
    });
  } catch (error) {
    console.error(
      "CREATE LEAD ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "An unexpected error occurred while creating the lead.",
      error: error.message,
    });
  }
};

/* =========================================================
   IMPORT MULTIPLE LEADS
   POST /api/leads/import
========================================================= */

exports.importLeads = async (
  req,
  res
) => {
  try {
    console.log("LEAD IMPORT API HIT");

    const {
      leads,
    } = req.body || {};

    /* ----------------------------------------
       Basic validation
    ---------------------------------------- */

    if (
      !Array.isArray(leads) ||
      leads.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "No leads were provided for import.",
      });
    }

    /* ----------------------------------------
       Maximum import size
    ---------------------------------------- */

    if (leads.length > 5000) {
      return res.status(400).json({
        success: false,
        message:
          "You can import a maximum of 5000 leads at a time.",
      });
    }

    /* ----------------------------------------
       Allowed values
    ---------------------------------------- */

    const allowedStatuses = [
      "Cold",
      "Warm",
      "Hot",
      "Converted",
    ];

    const allowedPriorities = [
      "Low",
      "Normal",
      "High",
    ];

    /* ----------------------------------------
       Validate rows
    ---------------------------------------- */

    const validLeads = [];
    const invalidRows = [];

    leads.forEach(
      (item, index) => {
        const rowNumber = index + 2;

        if (
          !item ||
          typeof item !== "object"
        ) {
          invalidRows.push({
            row: rowNumber,
            errors: [
              "Invalid lead data.",
            ],
          });

          return;
        }

        const date = item.date;

        const fullName =
          item.fullName;

        const phoneNumber =
          item.phoneNumber;

        const email =
          item.email;

        const educationalLevel =
          item.educationalLevel;

        const status =
          normalizeText(
            item.status || "Cold"
          );

        const priority =
          normalizeText(
            item.priority || "Normal"
          );

        const errors = [];

        /* --------------------------------
           Date
        -------------------------------- */

        if (
          !normalizeText(date)
        ) {
          errors.push(
            "Date is missing."
          );
        }

        /* --------------------------------
           Full Name
        -------------------------------- */

        if (
          !normalizeText(fullName)
        ) {
          errors.push(
            "Full Name is missing."
          );
        }

        /* --------------------------------
           Phone
        -------------------------------- */

        if (
          !normalizeText(
            phoneNumber
          )
        ) {
          errors.push(
            "Phone Number is missing."
          );
        }

        /* --------------------------------
           Email
        -------------------------------- */

        const normalizedEmail =
          normalizeEmail(email);

        if (!normalizedEmail) {
          errors.push(
            "Email is missing."
          );
        } else if (
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            normalizedEmail
          )
        ) {
          errors.push(
            "Invalid email."
          );
        }

        /* --------------------------------
           Education
        -------------------------------- */

        if (
          !normalizeText(
            educationalLevel
          )
        ) {
          errors.push(
            "Educational Level is missing."
          );
        }

        /* --------------------------------
           Status
        -------------------------------- */

        if (
          !allowedStatuses.includes(
            status
          )
        ) {
          errors.push(
            "Invalid lead status."
          );
        }

        /* --------------------------------
           Priority
        -------------------------------- */

        if (
          !allowedPriorities.includes(
            priority
          )
        ) {
          errors.push(
            "Invalid lead priority."
          );
        }

        /* --------------------------------
           Invalid row
        -------------------------------- */

        if (errors.length > 0) {
          invalidRows.push({
            row: rowNumber,
            errors,
          });

          return;
        }

        /* --------------------------------
           Valid row
        -------------------------------- */

        validLeads.push(
          buildLead({
            date,
            fullName,
            phoneNumber,
            email:
              normalizedEmail,
            educationalLevel,
            status,
            priority,
            source:
              item.source ||
              "Excel Import",
          })
        );
      }
    );

    /* ----------------------------------------
       No valid rows
    ---------------------------------------- */

    if (validLeads.length === 0) {
      return res.status(400).json({
        success: false,

        message:
          "No valid leads were found in the import file.",

        importedCount: 0,

        invalidCount:
          invalidRows.length,

        leads: [],

        errors: invalidRows,
      });
    }

    /* ----------------------------------------
       Insert into Supabase
    ---------------------------------------- */

    const {
      data,
      error,
    } = await supabase
      .from("leads")
      .insert(validLeads)
      .select();

    if (error) {
      console.error(
        "SUPABASE IMPORT LEADS ERROR:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          "Unable to import leads into database.",

        error: error.message,

        importedCount: 0,
      });
    }

    const importedLeads =
      data || [];

    console.log(
      `Imported ${importedLeads.length} leads successfully.`
    );

    /* ----------------------------------------
       Response
    ---------------------------------------- */

    return res.status(201).json({
      success: true,

      message:
        `${importedLeads.length} lead${
          importedLeads.length === 1
            ? ""
            : "s"
        } imported successfully.`,

      importedCount:
        importedLeads.length,

      invalidCount:
        invalidRows.length,

      leads:
        importedLeads,

      errors:
        invalidRows,
    });
  } catch (error) {
    console.error(
      "IMPORT LEADS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "An unexpected error occurred while importing leads.",

      error: error.message,
    });
  }
};

/* =========================================================
   GET ALL LEADS
   GET /api/leads
========================================================= */

exports.getLeads = async (
  req,
  res
) => {
  try {
    const {
      data,
      error,
    } = await supabase
      .from("leads")
      .select("*")
      .order(
        "created_at",
        {
          ascending: false,
        }
      );

    if (error) {
      console.error(
        "SUPABASE GET LEADS ERROR:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          "Unable to fetch leads.",

        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,

      leads: data || [],
    });
  } catch (error) {
    console.error(
      "GET LEADS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "An unexpected error occurred while fetching leads.",

      error: error.message,
    });
  }
};

/* =========================================================
   DELETE ONE LEAD
   DELETE /api/leads/:id
========================================================= */

exports.deleteLead = async (
  req,
  res
) => {
  try {
    const {
      id,
    } = req.params;

    if (
      !id ||
      !String(id).trim()
    ) {
      return res.status(400).json({
        success: false,

        message:
          "Lead ID is required.",
      });
    }

    const normalizedId =
      String(id).trim();

    const {
      data,
      error,
    } = await supabase
      .from("leads")
      .delete()
      .eq(
        "id",
        normalizedId
      )
      .select()
      .maybeSingle();

    if (error) {
      console.error(
        "SUPABASE DELETE LEAD ERROR:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          "Unable to delete lead.",

        error: error.message,
      });
    }

    if (!data) {
      return res.status(404).json({
        success: false,

        message:
          "Lead not found.",
      });
    }

    return res.status(200).json({
      success: true,

      message:
        "Lead deleted successfully.",

      lead: data,
    });
  } catch (error) {
    console.error(
      "DELETE LEAD ERROR:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "An unexpected error occurred while deleting the lead.",

      error: error.message,
    });
  }
};

/* =========================================================
   DELETE MULTIPLE LEADS
   POST /api/leads/bulk-delete
========================================================= */

exports.deleteLeads = async (
  req,
  res
) => {
  try {
    const {
      leadIds,
    } = req.body || {};

    if (
      !Array.isArray(
        leadIds
      ) ||
      leadIds.length === 0
    ) {
      return res.status(400).json({
        success: false,

        message:
          "Lead IDs are required.",
      });
    }

    const normalizedIds = [
      ...new Set(
        leadIds
          .map((id) =>
            String(id).trim()
          )
          .filter(Boolean)
      ),
    ];

    if (
      normalizedIds.length === 0
    ) {
      return res.status(400).json({
        success: false,

        message:
          "Valid lead IDs are required.",
      });
    }

    const {
      data,
      error,
    } = await supabase
      .from("leads")
      .delete()
      .in(
        "id",
        normalizedIds
      )
      .select();

    if (error) {
      console.error(
        "SUPABASE BULK DELETE LEADS ERROR:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          "Unable to delete selected leads.",

        error: error.message,
      });
    }

    const deletedLeads =
      data || [];

    return res.status(200).json({
      success: true,

      message:
        `${deletedLeads.length} lead${
          deletedLeads.length === 1
            ? ""
            : "s"
        } deleted successfully.`,

      deletedCount:
        deletedLeads.length,

      leads:
        deletedLeads,
    });
  } catch (error) {
    console.error(
      "BULK DELETE LEADS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "An unexpected error occurred while deleting selected leads.",

      error: error.message,
    });
  }
};

/* =========================================================
   ASSIGN LEADS TO EMPLOYEE
   PUT /api/leads/assign
========================================================= */

exports.assignLeads = async (
  req,
  res
) => {
  try {
    const {
      leadIds,
      employeeId,
      employeeName,
    } = req.body || {};

    /* ----------------------------------------
       Validate Lead IDs
    ---------------------------------------- */

    if (
      !Array.isArray(
        leadIds
      ) ||
      leadIds.length === 0
    ) {
      return res.status(400).json({
        success: false,

        message:
          "Lead IDs are required.",
      });
    }

    const normalizedLeadIds = [
      ...new Set(
        leadIds
          .map((id) =>
            String(id).trim()
          )
          .filter(Boolean)
      ),
    ];

    if (
      normalizedLeadIds.length ===
      0
    ) {
      return res.status(400).json({
        success: false,

        message:
          "Valid lead IDs are required.",
      });
    }

    /* ----------------------------------------
       Validate Employee
    ---------------------------------------- */

    if (
      !employeeId ||
      !String(
        employeeId
      ).trim()
    ) {
      return res.status(400).json({
        success: false,

        message:
          "Employee ID is required.",
      });
    }

    const normalizedEmployeeId =
      String(
        employeeId
      ).trim();

    const normalizedEmployeeName =
      normalizeText(
        employeeName
      );

    /* ----------------------------------------
       Assignment timestamp
    ---------------------------------------- */

    const assignedAt =
      new Date().toISOString();

    /* ----------------------------------------
       Update Supabase
    ---------------------------------------- */

    const {
      data,
      error,
    } = await supabase
      .from("leads")
      .update({
        assigned_to:
          normalizedEmployeeName ||
          "Unassigned",

        assigned_employee_id:
          normalizedEmployeeId,

        assigned_employee_name:
          normalizedEmployeeName,

        assigned_at:
          assignedAt,
      })
      .in(
        "id",
        normalizedLeadIds
      )
      .select();

    if (error) {
      console.error(
        "SUPABASE ASSIGN LEADS ERROR:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          "Unable to assign leads.",

        error: error.message,
      });
    }

    const assignedLeads =
      data || [];

    return res.status(200).json({
      success: true,

      message:
        `${assignedLeads.length} lead${
          assignedLeads.length === 1
            ? ""
            : "s"
        } assigned successfully.`,

      assignedCount:
        assignedLeads.length,

      leads:
        assignedLeads,
    });
  } catch (error) {
    console.error(
      "ASSIGN LEADS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "An unexpected error occurred while assigning leads.",

      error: error.message,
    });
  }
};