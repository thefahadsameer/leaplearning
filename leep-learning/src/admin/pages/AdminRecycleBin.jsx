import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AdminRecycleBin() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDeletedApplications = async () => {
    try {
      const response = await fetch(
        "https://leaplearning.onrender.com/api/applications/recycle-bin"
      );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch deleted applications"
        );
      }

      const data = await response.json();

      setApplications(data || []);
    } catch (error) {
      console.error(
        "Recycle Bin Fetch Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeletedApplications();
  }, []);

  /* ================= RESTORE ================= */

  const restoreApplication = async (
    applicationId
  ) => {
    const result = await Swal.fire({
      title: "Restore Application?",
      text: "Move this application back to Applications?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Restore",
      confirmButtonColor: "#16a34a",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await fetch(
        `https://leaplearning.onrender.com/api/applications/${applicationId}/restore`,
        {
          method: "PUT",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Restore failed"
        );
      }

      await Swal.fire({
        icon: "success",
        title: "Restored",
        text: "Application restored successfully.",
      });

      fetchDeletedApplications();
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error.message,
      });
    }
  };

  /* ================= DELETE FOREVER ================= */

  const deleteForever = async (
    applicationId
  ) => {
    const result = await Swal.fire({
      title: "Delete Forever?",
      text:
        "This will permanently delete the application from Supabase.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete Forever",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await fetch(
        `https://leaplearning.onrender.com/api/applications/${applicationId}/permanent-delete`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Delete failed"
        );
      }

      await Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Application permanently removed.",
      });

      fetchDeletedApplications();
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error.message,
      });
    }
  };

  return (
    <div>
      <h1
        style={{
          marginBottom: "25px",
        }}
      >
        Recycle Bin
      </h1>

      {loading ? (
        <p>Loading deleted applications...</p>
      ) : (
        <table style={table}>
          <thead>
            <tr
              style={{
                background: "#f3f4f6",
              }}
            >
              <th style={th}>Name</th>
              <th style={th}>Email</th>
              <th style={th}>Program</th>
              <th style={th}>Status</th>
              <th style={th}>Deleted At</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  style={emptyState}
                >
                  Recycle Bin is empty
                </td>
              </tr>
            ) : (
              applications.map((app) => (
                <tr key={app.id}>
                  <td style={td}>
                    {app.full_name}
                  </td>

                  <td style={td}>
                    {app.email}
                  </td>

                  <td style={td}>
                    {app.program}
                  </td>

                  <td style={td}>
                    <span
                      style={statusPill(
                        app.status
                      )}
                    >
                      {app.status}
                    </span>
                  </td>

                  <td style={td}>
                    {app.deleted_at
                      ? new Date(
                          app.deleted_at
                        ).toLocaleString()
                      : "-"}
                  </td>

                  <td style={td}>
                    <div style={actionRow}>
                      <button
                        style={viewBtn}
                        onClick={() =>
                          navigate(
                            `/admin/applications/${app.id}`
                          )
                        }
                      >
                        View
                      </button>

                      <button
                        style={restoreBtn}
                        onClick={() =>
                          restoreApplication(
                            app.id
                          )
                        }
                      >
                        Restore
                      </button>

                      <button
                        style={deleteBtn}
                        onClick={() =>
                          deleteForever(
                            app.id
                          )
                        }
                      >
                        Delete Forever
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const table = {
  width: "100%",
  borderCollapse: "collapse",
  background: "#fff",
  borderRadius: "10px",
  overflow: "hidden",
};

const th = {
  padding: "14px",
  borderBottom: "1px solid #ddd",
  textAlign: "left",
};

const td = {
  padding: "14px",
  borderBottom: "1px solid #eee",
};

const emptyState = {
  padding: "30px",
  textAlign: "center",
  color: "#6b7280",
};

const actionRow = {
  display: "flex",
  gap: "8px",
  flexWrap: "wrap",
};

const viewBtn = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  borderRadius: "6px",
  cursor: "pointer",
};

const restoreBtn = {
  background: "#16a34a",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  borderRadius: "6px",
  cursor: "pointer",
};

const deleteBtn = {
  background: "#dc2626",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  borderRadius: "6px",
  cursor: "pointer",
};

const statusPill = (status) => ({
  padding: "4px 10px",
  borderRadius: "999px",
  background: "#e5e7eb",
  fontSize: "13px",
});

export default AdminRecycleBin;