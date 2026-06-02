import { useNavigate, useLocation } from "react-router-dom";

function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItemStyle = (path) => ({
    cursor: "pointer",
    padding: "10px 12px",
    borderRadius: "6px",
    marginBottom: "8px",
    background:
      location.pathname === path
        ? "#2563eb"
        : "transparent",
    color: "#fff",
  });

  return (
    <div
      style={{
        width: "220px",
        background: "#1e1e2f",
        color: "#fff",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h2 style={{ marginBottom: "30px" }}>
        Admin
      </h2>

      <div
        style={menuItemStyle(
          "/admin/dashboard"
        )}
        onClick={() =>
          navigate("/admin/dashboard")
        }
      >
        Dashboard
      </div>

      <div
        style={menuItemStyle(
          "/admin/applications"
        )}
        onClick={() =>
          navigate(
            "/admin/applications"
          )
        }
      >
        Applications
      </div>

      <div
        style={menuItemStyle(
          "/admin/recycle-bin"
        )}
        onClick={() =>
          navigate(
            "/admin/recycle-bin"
          )
        }
      >
        Recycle Bin
      </div>

      <div
        style={menuItemStyle(
          "/admin/settings"
        )}
        onClick={() =>
          navigate("/admin/settings")
        }
      >
        Settings
      </div>
    </div>
  );
}

export default AdminSidebar;