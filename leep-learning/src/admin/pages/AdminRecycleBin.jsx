import { useEffect, useState } from "react";

function AdminRecycleBin() {
  const [applications, setApplications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchDeletedApplications =
    async () => {
      try {
        const response = await fetch(
          "https://leaplearning.onrender.com/api/applications/recycle-bin"
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch deleted applications"
          );
        }

        const data =
          await response.json();

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

  return (
    <div>
      <h1
        style={{
          marginBottom: "20px",
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
                background:
                  "#f3f4f6",
              }}
            >
              <th style={th}>Name</th>
              <th style={th}>Email</th>
              <th style={th}>
                Program
              </th>
              <th style={th}>
                Status
              </th>
              <th style={th}>
                Deleted At
              </th>
            </tr>
          </thead>

          <tbody>
            {applications.length ===
            0 ? (
              <tr>
                <td
                  colSpan="5"
                  style={emptyState}
                >
                  Recycle Bin is empty
                </td>
              </tr>
            ) : (
              applications.map(
                (app) => (
                  <tr key={app.id}>
                    <td style={td}>
                      {
                        app.full_name
                      }
                    </td>

                    <td style={td}>
                      {app.email}
                    </td>

                    <td style={td}>
                      {
                        app.program
                      }
                    </td>

                    <td style={td}>
                      {app.status}
                    </td>

                    <td style={td}>
                      {app.deleted_at
                        ? new Date(
                            app.deleted_at
                          ).toLocaleString()
                        : "-"}
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

/* ---------- Styles ---------- */

const table = {
  width: "100%",
  borderCollapse: "collapse",
  background: "#fff",
};

const th = {
  padding: "12px",
  borderBottom:
    "1px solid #ddd",
  textAlign: "left",
};

const td = {
  padding: "12px",
  borderBottom:
    "1px solid #eee",
};

const emptyState = {
  padding: "20px",
  textAlign: "center",
  color: "#6b7280",
};

export default AdminRecycleBin;