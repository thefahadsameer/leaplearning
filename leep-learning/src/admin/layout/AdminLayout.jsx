import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaFileAlt,
  FaUserGraduate,
  FaBell,
  FaTrash,
  FaCog,
  FaSignOutAlt,
  FaUsers,
} from "react-icons/fa";

function AdminLayout() {
  const navigate = useNavigate();

  /* SIDEBAR TOGGLE */
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminSession");
    navigate("/admin/login");
  };

  const linkStyle = ({ isActive }) => ({
    color: isActive ? "#38bdf8" : "#cbd5f5",
    marginBottom: "12px",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 14px",
    borderRadius: "10px",
    background: isActive ? "rgba(56,189,248,0.08)" : "transparent",
    whiteSpace: "nowrap",
    overflow: "hidden",
    transition: "0.25s ease",
    fontWeight: "500",
  });

  const sidebarWidth = collapsed ? "84px" : "260px";

  const iconSize = 17;

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      {/* SIDEBAR */}
      <aside
        style={{
          width: sidebarWidth,
          background: "#0f172a",
          color: "#fff",
          padding: "22px",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.3s ease",
          boxShadow: "4px 0 18px rgba(0,0,0,0.08)",
        }}
      >
        {/* TOP */}
        <div
          style={{
            display: "flex",
            justifyContent: collapsed ? "center" : "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          {!collapsed && (
            <h2
              style={{
                margin: 0,
                fontSize: "20px",
                fontWeight: "700",
              }}
            >
              Admin
            </h2>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              background: "#1e293b",
              color: "#fff",
              border: "none",
              width: "38px",
              height: "38px",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {collapsed ? <FaBars /> : <FaTimes />}
          </button>
        </div>

        {/* DASHBOARD */}
        <NavLink to="/admin/dashboard" style={linkStyle}>
          <FaTachometerAlt size={iconSize} />
          {!collapsed && "Dashboard"}
        </NavLink>

        {/* APPLICATIONS */}
        <NavLink to="/admin/applications" style={linkStyle}>
          <FaFileAlt size={iconSize} />
          {!collapsed && "Applications"}
        </NavLink>

        {/* EMPLOYEES */}
        <NavLink to="/admin/employees" style={linkStyle}>
          <FaUsers size={iconSize} />
          {!collapsed && "Employees"}
        </NavLink>

        {/* STUDENTS */}
        <NavLink to="/admin/students" style={linkStyle}>
          <FaUserGraduate size={iconSize} />
          {!collapsed && "Students"}
        </NavLink>

        {/* NOTIFICATIONS */}
        <NavLink to="/admin/notifications" style={linkStyle}>
          <FaBell size={iconSize} />
          {!collapsed && "Notifications"}
        </NavLink>

        {/* RECYCLE BIN */}
        <NavLink to="/admin/recycle-bin" style={linkStyle}>
          <FaTrash size={iconSize} />
          {!collapsed && "Recycle Bin"}
        </NavLink>

        {/* SETTINGS */}
        <NavLink to="/admin/settings" style={linkStyle}>
          <FaCog size={iconSize} />
          {!collapsed && "Settings"}
        </NavLink>

        <div
          style={{
            flexGrow: 1,
          }}
        />

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          style={{
            background: "#dc2626",
            color: "#fff",
            border: "none",
            padding: "12px",
            borderRadius: "8px",
            cursor: "pointer",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            fontWeight: "600",
          }}
        >
          <FaSignOutAlt />
          {!collapsed && "Logout"}
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main
        style={{
          flex: 1,
          padding: "30px",
          background: "#f8fafc",
          transition: "all 0.3s ease",
          overflowX: "auto",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
