import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function InfoRow({ label, value }) {
  return (
    <div style={infoRow}>
      <div style={infoLabel}>{label}</div>
      <div>{value || "-"}</div>
    </div>
  );
}

function AdminApplicationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [auditTrail, setAuditTrail] = useState([]);

  const adminSession =
    JSON.parse(localStorage.getItem("adminSession")) || {};

  const role = adminSession.role || "viewer";
  const adminEmail = adminSession.email || "Admin";

  const canModifyStatus =
    role === "reviewer" || role === "super_admin";

  const canExportAudit =
    role === "super_admin";

  /* ================= LOAD APPLICATION ================= */

  const fetchApplication = async () => {
    try {
      const response = await fetch(
        `https://leaplearning.onrender.com/api/applications/${id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch application");
      }

      const data = await response.json();
      setApplication(data);
    } catch (error) {
      console.error(
        "Failed to fetch application:",
        error
      );
    }
  };

  /* ================= LOAD AUDIT LOGS ================= */

  const fetchAuditLogs = async () => {
    try {
      const response = await fetch(
        `https://leaplearning.onrender.com/api/applications/${id}/audit`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch audit logs");
      }

      const data = await response.json();
      setAuditTrail(data || []);
    } catch (error) {
      console.error(
        "Failed to fetch audit logs:",
        error
      );
    }
  };

  useEffect(() => {
    fetchApplication();
    fetchAuditLogs();
  }, [id]);

  /* ================= UPDATE STATUS ================= */

  const updateStatus = async (newStatus) => {
    if (!canModifyStatus) return;

    if (newStatus === application?.status) return;

    try {
      const response = await fetch(
        `https://leaplearning.onrender.com/api/applications/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
            performedBy: adminEmail,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to update application status"
        );
      }

      await fetchApplication();
      await fetchAuditLogs();
    } catch (error) {
      console.error(
        "Status update error:",
        error
      );

      alert(
        "Failed to update application status."
      );
    }
  };

  /* ================= EXPORT AUDIT ================= */

  const exportAudit = () => {
    if (!canExportAudit) return;

    const blob = new Blob(
      [JSON.stringify(auditTrail, null, 2)],
      {
        type: "application/json",
      }
    );

    const url =
      window.URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;
    a.download = `audit_${id}.json`;

    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
  };

  if (!application) {
    return (
      <p style={{ padding: "24px" }}>
        Loading application...
      </p>
    );
  }

  const {
    full_name,
    email,
    phone,
    address,
    qualification,
    field,
    year,
    institution,
    program,
    status,
    created_at,
  } = application;

  return (
    <div style={container}>
      <button
        style={backBtn}
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <h2 style={title}>
        Application Details
      </h2>

      <div style={card}>
        <InfoRow
          label="Full Name"
          value={full_name}
        />
        <InfoRow
          label="Email"
          value={email}
        />
        <InfoRow
          label="Phone"
          value={phone}
        />
        <InfoRow
          label="Address"
          value={address}
        />
        <InfoRow
          label="Qualification"
          value={qualification}
        />
        <InfoRow
          label="Field"
          value={field}
        />
        <InfoRow
          label="Year"
          value={year}
        />
        <InfoRow
          label="Institution"
          value={institution}
        />
        <InfoRow
          label="Program"
          value={program}
        />
        <InfoRow
          label="Status"
          value={status}
        />
        <InfoRow
          label="Applied On"
          value={
            created_at
              ? new Date(
                  created_at
                ).toLocaleString()
              : "-"
          }
        />

        {canModifyStatus && (
          <div style={buttonRow}>
            <button
              style={approveBtn}
              onClick={() =>
                updateStatus(
                  "approved"
                )
              }
            >
              Approve
            </button>

            <button
              style={reviewBtn}
              onClick={() =>
                updateStatus(
                  "under_review"
                )
              }
            >
              Review
            </button>

            <button
              style={rejectBtn}
              onClick={() =>
                updateStatus(
                  "rejected"
                )
              }
            >
              Reject
            </button>
          </div>
        )}
      </div>

      <div style={card}>
        <div style={auditHeader}>
          <h3 style={sectionTitle}>
            Audit Trail
          </h3>

          {canExportAudit && (
            <button
              style={exportBtn}
              onClick={exportAudit}
            >
              Export JSON
            </button>
          )}
        </div>

        {auditTrail.length === 0 ? (
          <p>
            No audit records found.
          </p>
        ) : (
          <div style={timeline}>
            {auditTrail.map(
              (entry, index) => (
                <div
                  key={index}
                  style={
                    timelineItem
                  }
                >
                  <div
                    style={
                      timelineDot
                    }
                  />

                  <div
                    style={
                      timelineContent
                    }
                  >
                    <div
                      style={
                        timelineTitle
                      }
                    >
                      {entry.action ||
                        "Status Updated"}
                    </div>

                    <div
                      style={
                        timelineMeta
                      }
                    >
                      By{" "}
                      {entry.performed_by ||
                        "System"}
                    </div>

                    <div
                      style={
                        timelineMeta
                      }
                    >
                      {entry.created_at
                        ? new Date(
                            entry.created_at
                          ).toLocaleString()
                        : "-"}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Styles ---------- */

const container = {
  maxWidth: "1000px",
  margin: "0 auto",
  padding: "24px",
};

const title = {
  marginBottom: "24px",
};

const sectionTitle = {
  marginBottom: "12px",
};

const card = {
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  padding: "20px",
  marginBottom: "24px",
};

const infoRow = {
  display: "flex",
  padding: "10px 0",
  borderBottom: "1px solid #eee",
};

const infoLabel = {
  width: "200px",
  fontWeight: "600",
};

const buttonRow = {
  display: "flex",
  gap: "10px",
  marginTop: "16px",
};

const auditHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const timeline = {
  marginTop: "20px",
  borderLeft: "2px solid #e5e7eb",
  paddingLeft: "20px",
};

const timelineItem = {
  position: "relative",
  marginBottom: "20px",
};

const timelineDot = {
  position: "absolute",
  left: "-29px",
  top: "4px",
  width: "14px",
  height: "14px",
  borderRadius: "50%",
  background: "#2563eb",
};

const timelineContent = {
  paddingLeft: "10px",
};

const timelineTitle = {
  fontSize: "15px",
  fontWeight: "600",
};

const timelineMeta = {
  fontSize: "13px",
  color: "#6b7280",
  marginTop: "4px",
};

const backBtn = {
  background: "none",
  border: "none",
  color: "#2563eb",
  cursor: "pointer",
  marginBottom: "12px",
};

const approveBtn = {
  background: "#16a34a",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer",
};

const rejectBtn = {
  background: "#dc2626",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer",
};

const reviewBtn = {
  background: "#d97706",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer",
};

const exportBtn = {
  background: "#111827",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  borderRadius: "6px",
  cursor: "pointer",
};

export default AdminApplicationDetail;