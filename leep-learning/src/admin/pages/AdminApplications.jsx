import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AdminApplications() {
  console.log("NEW ADMIN APPLICATIONS FILE LOADED");
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  const [employees, setEmployees] = useState([]);

  const [filterStatus, setFilterStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [sortBy, setSortBy] = useState("date_desc");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  /* ================= LOAD APPLICATIONS ================= */

  const fetchApplications = async () => {
    try {
      const response = await fetch(
        "https://leaplearning.onrender.com/api/applications",
      );

      const data = await response.json();

      setApplications(data || []);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch(
        "https://leaplearning.onrender.com/api/employees",
      );

      const data = await response.json();

      setEmployees(data || []);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
    fetchEmployees();
  }, []);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const clearSelection = () => setSelectedIds([]);

  const assignApplications = async () => {
    if (selectedIds.length === 0) {
      Swal.fire(
        "No Selection",
        "Please select at least one application.",
        "warning",
      );
      return;
    }

    const employeeOptions = {};

    employees.forEach((employee) => {
      employeeOptions[employee.id] = `${employee.full_name} (${employee.role})`;
    });

    const result = await Swal.fire({
      title: "Assign Applications",
      input: "select",
      inputOptions: employeeOptions,
      inputPlaceholder: "Select Employee",
      showCancelButton: true,
    });

    if (!result.value) {
      return;
    }

    try {
      const response = await fetch(
        "https://leaplearning.onrender.com/api/applications/assign",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            applicationIds: selectedIds,
            employeeId: result.value,
            assignedBy: 1,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      clearSelection();

      Swal.fire("Assigned", "Application assigned successfully", "success");
    } catch (error) {
      Swal.fire("Failed", error.message, "error");
    }
  };

  /* ================= BULK STATUS UPDATE ================= */

  const bulkUpdateStatus = async (newStatus) => {
    try {
      await Promise.all(
        selectedIds.map((id) =>
          fetch(
            `https://leaplearning.onrender.com/api/applications/${id}/status`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                status: newStatus,
                performedBy: "Admin",
              }),
            },
          ),
        ),
      );

      clearSelection();

      fetchApplications();
    } catch (error) {
      console.error("Bulk update failed:", error);
    }
  };

  /* ================= BULK DELETE ================= */

  const bulkDelete = async () => {
    if (selectedIds.length === 0) {
      return;
    }

    const result = await Swal.fire({
      title: "Move to Recycle Bin?",
      text: `Move ${selectedIds.length} selected application(s) to Recycle Bin?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Move",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const response = await fetch(
        "https://leaplearning.onrender.com/api/applications/bulk-delete",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ids: selectedIds,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Delete failed");
      }

      clearSelection();

      await fetchApplications();

      await Swal.fire({
        icon: "success",
        title: "Moved",
        text: "Application(s) moved to Recycle Bin successfully.",
        confirmButtonColor: "#2563eb",
      });
    } catch (error) {
      console.error("Bulk delete failed:", error);

      await Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to delete selected applications.",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  /* ================= FILTER + SEARCH ================= */

  const filteredApplications = applications.filter((app) => {
    const matchesStatus = filterStatus === "All" || app.status === filterStatus;

    const query = searchQuery.toLowerCase();

    const matchesSearch =
      (app.full_name || "").toLowerCase().includes(query) ||
      (app.email || "").toLowerCase().includes(query) ||
      (app.program || "").toLowerCase().includes(query);

    return matchesStatus && matchesSearch;
  });

  /* ================= SORTING ================= */

  const statusOrder = {
    New: 1,
    "In Review": 2,
    Approved: 3,
    Rejected: 4,
  };

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    switch (sortBy) {
      case "date_asc":
        return new Date(a.created_at) - new Date(b.created_at);

      case "date_desc":
        return new Date(b.created_at) - new Date(a.created_at);

      case "name_asc":
        return (a.full_name || "").localeCompare(b.full_name || "");

      case "name_desc":
        return (b.full_name || "").localeCompare(a.full_name || "");

      case "status":
        return (statusOrder[a.status] || 99) - (statusOrder[b.status] || 99);

      default:
        return 0;
    }
  });

  /* ================= PAGINATION ================= */

  const totalPages = Math.ceil(sortedApplications.length / pageSize);

  const startIndex = (currentPage - 1) * pageSize;

  const paginatedApplications = sortedApplications.slice(
    startIndex,
    startIndex + pageSize,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus, searchQuery, pageSize, sortBy]);

  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>Applications</h1>

      <div style={toolbar}>
        <input
          type="text"
          placeholder="Search by name, email, or program..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={searchInput}
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={select}
        >
          <option>All</option>
          <option>New</option>
          <option>In Review</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={select}
        >
          <option value="date_desc">Date: Newest first</option>
          <option value="date_asc">Date: Oldest first</option>
          <option value="name_asc">Name: A → Z</option>
          <option value="name_desc">Name: Z → A</option>
          <option value="status">Status</option>
        </select>

        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          style={select}
        >
          <option value={10}>10 / page</option>
          <option value={20}>20 / page</option>
          <option value={50}>50 / page</option>
        </select>

        {selectedIds.length > 0 && (
          <>
            <button
              onClick={assignApplications}
              style={{
                background: "#2563eb",
                color: "#fff",
                padding: "6px 12px",
                border: "none",
                borderRadius: "6px",
              }}
            >
              Assign
            </button>
            <button
              onClick={() => bulkUpdateStatus("Approved")}
              style={approveBtn}
            >
              Approve
            </button>

            <button
              onClick={() => bulkUpdateStatus("Rejected")}
              style={rejectBtn}
            >
              Reject
            </button>

            <button onClick={bulkDelete} style={deleteBtn}>
              Delete
            </button>

            <button onClick={clearSelection} style={clearBtn}>
              Clear
            </button>
          </>
        )}
      </div>

      <table style={table}>
        <thead>
          <tr
            style={{
              background: "#f3f4f6",
            }}
          >
            <th style={th}></th>
            <th style={th}>Name</th>
            <th style={th}>Email</th>
            <th style={th}>Program</th>
            <th style={th}>Status</th>
            <th style={th}>Date</th>
          </tr>
        </thead>

        <tbody>
          {paginatedApplications.length === 0 ? (
            <tr>
              <td colSpan="6" style={emptyState}>
                No applications found
              </td>
            </tr>
          ) : (
            paginatedApplications.map((app) => (
              <tr
                key={app.id}
                onDoubleClick={() => navigate(`/admin/applications/${app.id}`)}
                style={{
                  cursor: "pointer",
                }}
              >
                <td style={td}>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(app.id)}
                    onChange={() => toggleSelect(app.id)}
                  />
                </td>

                <td style={td}>{app.full_name}</td>

                <td style={td}>{app.email}</td>

                <td style={td}>{app.program}</td>

                <td style={td}>
                  <span style={statusPill(app.status)}>
                    {app.status || "New"}
                  </span>
                </td>

                <td style={td}>{new Date(app.created_at).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div style={pagination}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            style={pageBtn}
          >
            Prev
          </button>

          {Array.from({
            length: totalPages,
          }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              style={{
                ...pageBtn,
                ...(currentPage === i + 1 ? activePageBtn : {}),
              }}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            style={pageBtn}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------- Styles ---------- */

const toolbar = {
  display: "flex",
  gap: "12px",
  alignItems: "center",
  marginBottom: "18px",
  flexWrap: "wrap",
};

const searchInput = {
  padding: "8px 12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  width: "260px",
};

const select = {
  padding: "8px 10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  background: "#fff",
};

const th = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
  textAlign: "left",
};

const td = {
  padding: "12px",
  borderBottom: "1px solid #eee",
};

const emptyState = {
  padding: "20px",
  textAlign: "center",
  color: "#6b7280",
};

const pagination = {
  display: "flex",
  gap: "6px",
  marginTop: "20px",
  justifyContent: "center",
};

const pageBtn = {
  padding: "6px 12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  background: "#fff",
  cursor: "pointer",
};

const activePageBtn = {
  background: "#2563eb",
  color: "#fff",
  borderColor: "#2563eb",
};

const approveBtn = {
  background: "#16a34a",
  color: "#fff",
  padding: "6px 12px",
  borderRadius: "6px",
  border: "none",
};

const rejectBtn = {
  background: "#dc2626",
  color: "#fff",
  padding: "6px 12px",
  borderRadius: "6px",
  border: "none",
};

const deleteBtn = {
  background: "#991b1b",
  color: "#fff",
  padding: "6px 12px",
  borderRadius: "6px",
  border: "none",
};

const clearBtn = {
  background: "#e5e7eb",
  padding: "6px 12px",
  borderRadius: "6px",
  border: "none",
};

const statusPill = (status) => {
  const map = {
    Approved: "#dcfce7",
    Rejected: "#fee2e2",
    "In Review": "#fef9c3",
    New: "#e0f2fe",
  };

  return {
    padding: "4px 10px",
    borderRadius: "999px",
    fontSize: "13px",
    background: map[status] || "#e5e7eb",
  };
};

export default AdminApplications;
