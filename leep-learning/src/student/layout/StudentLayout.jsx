import { Outlet, useNavigate, useLocation } from "react-router-dom";

function StudentLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const student = JSON.parse(localStorage.getItem("studentData"));

  const handleLogout = () => {
    localStorage.removeItem("studentToken");
    localStorage.removeItem("studentData");
    navigate("/login");
  };

  /* ============================
     NAVIGATION HELPER
  ============================ */
  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#eef2f7",
      }}
    >
      {/* ================= SIDEBAR ================= */}
      <div
        style={{
          width: "260px",
          background:
            "linear-gradient(180deg,#0f172a,#111827,#1e293b)",
          color: "#fff",
          padding: "24px 18px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: "8px 0 25px rgba(0,0,0,0.08)",
        }}
      >
        <div>
          {/* LOGO / TITLE */}
          <div
            style={{
              marginBottom: "28px",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "34px",
                fontWeight: "700",
                letterSpacing: "0.4px",
              }}
            >
              Student Panel
            </h2>

            <p
              style={{
                marginTop: "8px",
                fontSize: "13px",
                color: "#94a3b8",
              }}
            >
              {student?.full_name}
            </p>
          </div>

          {/* NAV LINKS */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <button
              onClick={() =>
                navigate("/student/dashboard")
              }
              style={navButton(
                isActive("dashboard")
              )}
            >
              Dashboard
            </button>

            <button
              onClick={() =>
                navigate("/student/profile")
              }
              style={navButton(
                isActive("profile")
              )}
            >
              Profile
            </button>

            <button
              onClick={() =>
                navigate("/student/payments")
              }
              style={navButton(
                isActive("payments")
              )}
            >
              Payments
            </button>

            <button
              onClick={() =>
                navigate("/student/chat")
              }
              style={navButton(
                isActive("chat")
              )}
            >
              Chat
            </button>
          </div>
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          style={{
            padding: "14px",
            background:
              "linear-gradient(135deg,#ef4444,#dc2626)",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            borderRadius: "10px",
            fontWeight: "600",
            fontSize: "15px",
            boxShadow:
              "0 8px 20px rgba(239,68,68,0.25)",
          }}
        >
          Logout
        </button>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            background: "#ffffff",
            padding: "18px 30px",
            borderBottom:
              "1px solid #e5e7eb",
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            position: "sticky",
            top: 0,
            zIndex: 20,
          }}
        >
          <div>
            <h3
              style={{
                margin: 0,
                fontSize: "30px",
                fontWeight: "700",
                color: "#111827",
              }}
            >
              Welcome,
            </h3>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                background: "#f3f4f6",
                padding:
                  "8px 14px",
                borderRadius:
                  "999px",
                fontSize: "14px",
                color: "#374151",
              }}
            >
              {student?.full_name}
            </div>

            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background:
                  "#111827",
                color: "#fff",
                display: "flex",
                alignItems:
                  "center",
                justifyContent:
                  "center",
                fontWeight: "700",
              }}
            >
              {student?.full_name
                ?.charAt(0)
                ?.toUpperCase() ||
                "S"}
            </div>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div
          style={{
            padding: "28px",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

/* ============================
   NAV BUTTON STYLE
============================ */
const navButton = (active) => ({
  padding: "14px 16px",
  textAlign: "left",
  border: "none",
  cursor: "pointer",
  borderRadius: "12px",
  background: active
    ? "rgba(255,255,255,0.10)"
    : "transparent",
  color: "#fff",
  fontWeight: active ? "700" : "500",
  fontSize: "15px",
  transition: "0.2s",
});

export default StudentLayout;