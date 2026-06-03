const supabase = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.loginEmployee = async (req, res) => {
  try {
    const { phone, secureCode } = req.body;

    if (!phone || !secureCode) {
      return res.status(400).json({
        message: "Phone and secure code required"
      });
    }

    /* ================= FETCH ONLY REQUIRED EMPLOYEE ================= */

    const { data: employee, error } = await supabase
      .from("employees")
      .select("*")
      .eq("phone", phone.trim())
      .single(); //  KEY FIX

    if (error || !employee) {
      return res.status(401).json({
        message: "Employee not found"
      });
    }

    if (employee.active !== true) {
      return res.status(401).json({
        message: "Employee account inactive"
      });
    }

    /* ================= CHECK PASSWORD ================= */

    const isMatch = await bcrypt.compare(
      secureCode,
      employee.secure_code
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    /* ================= CREATE TOKEN ================= */

    const token = jwt.sign(
      {
        id: employee.id,
        role: employee.role,
        phone: employee.phone
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    /* ================= RESPONSE ================= */

    return res.json({
      token,
      employee: {
        id: employee.id,
        full_name: employee.full_name,
        role: employee.role
      }
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      message: "Server error"
    });
  }
};

/* ==========================
   GET EMPLOYEES
========================== */

exports.getEmployees = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("employees")
      .select("*")
      .order("id", { ascending: true });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch employees",
    });
  }
};

/* ==========================
   CREATE EMPLOYEE
========================== */

exports.createEmployee = async (req, res) => {
  try {
    const {
      full_name,
      phone,
      role,
      secure_code,
    } = req.body;

    const hashedCode = await bcrypt.hash(
      secure_code,
      10
    );

    const { data, error } = await supabase
      .from("employees")
      .insert([
        {
          full_name,
          phone,
          role,
          secure_code: hashedCode,
          active: true,
        },
      ])
      .select();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create employee",
    });
  }
};

/* ==========================
   UPDATE EMPLOYEE
========================== */

exports.updateEmployee = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const {
      full_name,
      phone,
      role,
      active,
    } = req.body;

    const { data, error } = await supabase
      .from("employees")
      .update({
        full_name,
        phone,
        role,
        active,
      })
      .eq("id", id)
      .select();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update employee",
    });
  }
};

/* ==========================
   DELETE EMPLOYEE
========================== */

exports.deleteEmployee = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("employees")
      .delete()
      .eq("id", id);

    if (error) throw error;

    res.json({
      message: "Employee deleted",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete employee",
    });
  }
};