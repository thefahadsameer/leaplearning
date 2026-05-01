// src/admin/pages/AdminStudents.jsx

import { useEffect, useRef, useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaFileInvoice,
  FaEye,
  FaPlus,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

function AdminStudents() {
  const API_BASE =
    "https://leaplearning.onrender.com";

  const emptyForm = {
    full_name: "",
    email: "",
    phone: "",
    password: "",
    program: "",
    total_fee: "",
    invoice_number: "",
  };

  const [students, setStudents] =
    useState([]);

  const [showModal, setShowModal] =
    useState(false);

  const [formData, setFormData] =
    useState(emptyForm);

  const [editId, setEditId] =
    useState(null);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [programFilter, setProgramFilter] =
    useState("");

  const [docFilter, setDocFilter] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [rowsPerPage, setRowsPerPage] =
    useState(10);

  const fileRefs = useRef({});

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/api/students/all`
      );

      const data = await res.json();

      setStudents(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditId(null);
    setShowModal(false);
  };

  const handleSubmit = async () => {
    try {
      const isEdit = !!editId;

      const url = isEdit
        ? `${API_BASE}/api/students/admin/${editId}`
        : `${API_BASE}/api/students/create`;

      const method = isEdit
        ? "PUT"
        : "POST";

      const payload = {
        ...formData,
      };

      if (
        isEdit &&
        !payload.password
      ) {
        delete payload.password;
      }

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(
          payload
        ),
      });

      const data =
        await res.json();

      if (res.ok) {
        alert(
          isEdit
            ? "Student updated successfully"
            : "Student created successfully"
        );

        resetForm();
        fetchStudents();
      } else {
        alert(
          data.message ||
            "Action failed"
        );
      }
    } catch (error) {
      alert("Server error");
    }
  };

  const handleEdit = (
    student
  ) => {
    setEditId(student.id);

    setFormData({
      full_name:
        student.full_name ||
        "",
      email:
        student.email || "",
      phone:
        student.phone || "",
      password: "",
      program:
        student.program ||
        "",
      total_fee:
        student.total_fee ||
        "",
      invoice_number:
        student.invoice_number ||
        "",
    });

    setShowModal(true);
  };

  const handleDelete = async (
    id
  ) => {
    const ok =
      window.confirm(
        "Delete this student?"
      );

    if (!ok) return;

    try {
      const res = await fetch(
        `${API_BASE}/api/students/admin/${id}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await res.json();

      if (res.ok) {
        alert(
          "Student deleted successfully"
        );
        fetchStudents();
      } else {
        alert(
          data.message ||
            "Delete failed"
        );
      }
    } catch (error) {}
  };

  const handleUploadInvoice =
    async (
      student,
      file
    ) => {
      if (!file) return;

      const amount = prompt(
        "Enter paid amount for this invoice:"
      );

      if (!amount) return;

      try {
        const form =
          new FormData();

        form.append(
          "student_id",
          student.id
        );

        form.append(
          "amount",
          amount
        );

        form.append(
          "payment_method",
          "Admin Upload"
        );

        form.append(
          "invoice",
          file
        );

        const res =
          await fetch(
            `${API_BASE}/api/admin/upload-invoice/${student.id}`,
            {
              method:
                "POST",
              body: form,
            }
          );

        let data = {};

        try {
          data =
            await res.json();
        } catch {}

        if (res.ok) {
          alert(
            "Invoice uploaded successfully"
          );

          fetchStudents();

          if (
            fileRefs.current[
              student.id
            ]
          ) {
            fileRefs.current[
              student.id
            ].value = "";
          }
        } else {
          alert(
            data.message ||
              "Upload failed"
          );
        }
      } catch (error) {
        alert(
          "Upload failed"
        );
      }
    };

  const renderDocLink = (
    url
  ) => {
    return url ? (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        style={docBtn}
      >
        <FaEye size={12} />
      </a>
    ) : (
      <span style={naText}>
        N/A
      </span>
    );
  };

  const filteredStudents =
    students.filter(
      (student) => {
        const search =
          searchTerm.toLowerCase();

        const matchSearch =
          student.full_name
            ?.toLowerCase()
            .includes(search) ||
          student.email
            ?.toLowerCase()
            .includes(search) ||
          student.phone
            ?.toLowerCase()
            .includes(search);

        const matchProgram =
          !programFilter ||
          student.program ===
            programFilter;

        let matchDoc = true;

        if (
          docFilter ===
          "uploaded"
        ) {
          matchDoc =
            student.academic ||
            student.idproof ||
            student.resume ||
            student.other;
        }

        if (
          docFilter ===
          "missing"
        ) {
          matchDoc =
            !student.academic &&
            !student.idproof &&
            !student.resume &&
            !student.other;
        }

        return (
          matchSearch &&
          matchProgram &&
          matchDoc
        );
      }
    );

  const uniquePrograms = [
    ...new Set(
      students
        .map(
          (x) =>
            x.program
        )
        .filter(Boolean)
    ),
  ];

  const totalPages =
    Math.ceil(
      filteredStudents.length /
        rowsPerPage
    ) || 1;

  const start =
    (currentPage - 1) *
    rowsPerPage;

  const paginatedStudents =
    filteredStudents.slice(
      start,
      start +
        rowsPerPage
    );

  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    programFilter,
    docFilter,
    rowsPerPage,
  ]);

  return (
    <div>
      <div style={headerStyle}>
        <h2 style={title}>
          Students
        </h2>

        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          style={addBtn}
        >
          <FaPlus size={11} />
          Add Student
        </button>
      </div>

      <div style={filterWrap}>
        <div style={searchBox}>
          <FaSearch
            size={13}
          />
          <input
            placeholder="Search name, email, phone..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(
                e.target.value
              )
            }
            style={searchInput}
          />
        </div>

        <select
          value={programFilter}
          onChange={(e) =>
            setProgramFilter(
              e.target.value
            )
          }
          style={selectBox}
        >
          <option value="">
            All Programs
          </option>

          {uniquePrograms.map(
            (item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            )
          )}
        </select>

        <select
          value={docFilter}
          onChange={(e) =>
            setDocFilter(
              e.target.value
            )
          }
          style={selectBox}
        >
          <option value="">
            All Docs
          </option>
          <option value="uploaded">
            Uploaded
          </option>
          <option value="missing">
            Missing
          </option>
        </select>

        <select
          value={rowsPerPage}
          onChange={(e) =>
            setRowsPerPage(
              Number(
                e.target.value
              )
            )
          }
          style={selectBox}
        >
          <option value={10}>
            10 Rows
          </option>
          <option value={25}>
            25 Rows
          </option>
          <option value={50}>
            50 Rows
          </option>
        </select>
      </div>

      <div style={tableBox}>
        <table
          style={
            tableStyle
          }
        >
          <thead>
            <tr>
              <th style={th}>
                Name
              </th>
              <th style={th}>
                Email
              </th>
              <th style={th}>
                Phone
              </th>
              <th style={th}>
                Program
              </th>
              <th style={th}>
                Fee
              </th>
              <th style={th}>
                Invoice
              </th>
              <th style={th}>
                Academic
              </th>
              <th style={th}>
                ID Proof
              </th>
              <th style={th}>
                Resume
              </th>
              <th style={th}>
                Other
              </th>
              <th style={th}>
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {paginatedStudents.map(
              (
                student
              ) => (
                <tr
                  key={
                    student.id
                  }
                >
                  <td style={td}>
                    {
                      student.full_name
                    }
                  </td>

                  <td style={tdWide}>
                    {
                      student.email
                    }
                  </td>

                  <td style={td}>
                    {
                      student.phone
                    }
                  </td>

                  <td style={td}>
                    {
                      student.program
                    }
                  </td>

                  <td style={td}>
                    ₹
                    {
                      student.total_fee
                    }
                  </td>

                  <td style={td}>
                    {
                      student.invoice_number
                    }
                  </td>

                  <td style={tdCenter}>
                    {renderDocLink(
                      student.academic
                    )}
                  </td>

                  <td style={tdCenter}>
                    {renderDocLink(
                      student.idproof
                    )}
                  </td>

                  <td style={tdCenter}>
                    {renderDocLink(
                      student.resume
                    )}
                  </td>

                  <td style={tdCenter}>
                    {renderDocLink(
                      student.other
                    )}
                  </td>

                  <td style={td}>
                    <div
                      style={
                        actionWrap
                      }
                    >
                      <button
                        onClick={() =>
                          handleEdit(
                            student
                          )
                        }
                        style={
                          editBtn
                        }
                      >
                        <FaEdit size={11} />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            student.id
                          )
                        }
                        style={
                          deleteBtn
                        }
                      >
                        <FaTrash size={11} />
                      </button>

                      <input
                        type="file"
                        accept="application/pdf"
                        style={{
                          display:
                            "none",
                        }}
                        ref={(
                          el
                        ) =>
                          (fileRefs.current[
                            student.id
                          ] =
                            el)
                        }
                        onChange={(
                          e
                        ) =>
                          handleUploadInvoice(
                            student,
                            e
                              .target
                              .files[0]
                          )
                        }
                      />

                      <button
                        onClick={() =>
                          fileRefs.current[
                            student.id
                          ]?.click()
                        }
                        style={
                          uploadBtn
                        }
                      >
                        <FaFileInvoice size={11} />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <div style={paginationWrap}>
        <button
          onClick={() =>
            setCurrentPage(
              Math.max(
                1,
                currentPage -
                  1
              )
            )
          }
          style={pageBtn}
        >
          <FaChevronLeft size={11} />
        </button>

        <span
          style={
            pageText
          }
        >
          Page{" "}
          {currentPage} of{" "}
          {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage(
              Math.min(
                totalPages,
                currentPage +
                  1
              )
            )
          }
          style={pageBtn}
        >
          <FaChevronRight size={11} />
        </button>
      </div>

      {showModal && (
        <div style={overlay}>
          <div style={modal}>
            <h3>
              {editId
                ? "Edit Student"
                : "Add Student"}
            </h3>

            <input
              name="full_name"
              placeholder="Full Name"
              value={
                formData.full_name
              }
              onChange={
                handleChange
              }
              style={
                inputStyle
              }
            />

            <input
              name="email"
              placeholder="Email"
              value={
                formData.email
              }
              onChange={
                handleChange
              }
              style={
                inputStyle
              }
            />

            <input
              name="phone"
              placeholder="Phone"
              value={
                formData.phone
              }
              onChange={
                handleChange
              }
              style={
                inputStyle
              }
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={
                formData.password
              }
              onChange={
                handleChange
              }
              style={
                inputStyle
              }
            />

            <input
              name="program"
              placeholder="Program"
              value={
                formData.program
              }
              onChange={
                handleChange
              }
              style={
                inputStyle
              }
            />

            <input
              name="total_fee"
              placeholder="Total Fee"
              value={
                formData.total_fee
              }
              onChange={
                handleChange
              }
              style={
                inputStyle
              }
            />

            <input
              name="invoice_number"
              placeholder="Invoice Number"
              value={
                formData.invoice_number
              }
              onChange={
                handleChange
              }
              style={
                inputStyle
              }
            />

            <div style={btnRow}>
              <button
                onClick={
                  resetForm
                }
                style={
                  cancelBtn
                }
              >
                Cancel
              </button>

              <button
                onClick={
                  handleSubmit
                }
                style={
                  saveBtn
                }
              >
                {editId
                  ? "Update"
                  : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* compact premium styles */

const title = {
  margin: 0,
  fontSize: "26px",
};

const headerStyle = {
  display: "flex",
  justifyContent:
    "space-between",
  alignItems: "center",
  marginBottom: "14px",
};

const addBtn = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding:
    "10px 14px",
  borderRadius: "8px",
  display: "flex",
  gap: "8px",
  alignItems: "center",
  fontSize: "13px",
  cursor: "pointer",
};

const filterWrap = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  marginBottom: "14px",
};

const searchBox = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  background: "#fff",
  border:
    "1px solid #e5e7eb",
  padding:
    "0 12px",
  borderRadius: "8px",
  height: "42px",
};

const searchInput = {
  border: "none",
  outline: "none",
  minWidth: "220px",
  fontSize: "13px",
};

const selectBox = {
  height: "42px",
  minWidth: "145px",
  padding:
    "0 34px 0 12px",
  borderRadius: "8px",
  border:
    "1px solid #e5e7eb",
  background: "#fff",
  fontSize: "13px",
  cursor: "pointer",
};

const tableBox = {
  background: "#fff",
  borderRadius: "12px",
  padding: "14px",
  overflowX: "auto",
};

const tableStyle = {
  width: "100%",
  minWidth: "1250px",
  borderCollapse:
    "collapse",
};

const th = {
  padding: "12px",
  fontSize: "13px",
  textAlign: "left",
  borderBottom:
    "1px solid #e5e7eb",
};

const td = {
  padding: "12px",
  fontSize: "13px",
  borderBottom:
    "1px solid #f1f5f9",
};

const tdWide = {
  ...td,
  minWidth: "220px",
};

const tdCenter = {
  ...td,
  textAlign: "center",
};

const actionWrap = {
  display: "flex",
  gap: "6px",
};

const smallBtn = {
  width: "30px",
  height: "30px",
  border: "none",
  borderRadius: "7px",
  color: "#fff",
  cursor: "pointer",
};

const editBtn = {
  ...smallBtn,
  background: "#16a34a",
};

const deleteBtn = {
  ...smallBtn,
  background: "#dc2626",
};

const uploadBtn = {
  ...smallBtn,
  background: "#2563eb",
};

const docBtn = {
  ...smallBtn,
  background: "#0f766e",
  display:
    "inline-flex",
  alignItems: "center",
  justifyContent:
    "center",
  textDecoration:
    "none",
};

const naText = {
  fontSize: "12px",
  color: "#94a3b8",
};

const paginationWrap = {
  marginTop: "14px",
  display: "flex",
  justifyContent:
    "center",
  gap: "10px",
  alignItems: "center",
};

const pageBtn = {
  width: "32px",
  height: "32px",
  border: "none",
  borderRadius: "8px",
  background: "#2563eb",
  color: "#fff",
  cursor: "pointer",
};

const pageText = {
  fontSize: "13px",
  fontWeight: "600",
};

const overlay = {
  position: "fixed",
  inset: 0,
  background:
    "rgba(0,0,0,0.45)",
  display: "flex",
  justifyContent:
    "center",
  alignItems: "center",
};

const modal = {
  width: "380px",
  background: "#fff",
  padding: "24px",
  borderRadius: "12px",
};

const inputStyle = {
  width: "100%",
  height: "42px",
  padding:
    "0 12px",
  borderRadius: "8px",
  border:
    "1px solid #d1d5db",
  marginBottom: "10px",
};

const btnRow = {
  display: "flex",
  justifyContent:
    "space-between",
  marginTop: "10px",
};

const cancelBtn = {
  padding:
    "10px 14px",
  border: "none",
  borderRadius: "8px",
};

const saveBtn = {
  padding:
    "10px 14px",
  border: "none",
  borderRadius: "8px",
  background: "#16a34a",
  color: "#fff",
};

export default AdminStudents;