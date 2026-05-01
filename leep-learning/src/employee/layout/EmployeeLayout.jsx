import { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Inbox,
  Database,
  MessageCircle,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Columns // ✅ NEW ICON FOR KANBAN
} from "lucide-react";

import "../styles/employeeLayout.css";

function EmployeeLayout() {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(() => {
    const savedState = localStorage.getItem("employeeSidebar");
    return savedState !== null ? JSON.parse(savedState) : true;
  });

  const [mobileMenu, setMobileMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("employeeSession");
    navigate("/employee/login");
  };

  useEffect(() => {
    localStorage.setItem("employeeSidebar", JSON.stringify(collapsed));
  }, [collapsed]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setMobileMenu(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`layout ${collapsed ? "collapsed" : ""}`}>

      {mobileMenu && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileMenu(false)}
        ></div>
      )}

      <div className={`sidebar ${mobileMenu ? "open" : ""}`}>

        {/* HEADER */}
        <div className="logo-section">

          {collapsed ? (
            <button
              className="menu-toggle"
              onClick={() => setCollapsed(false)}
            >
              <Menu size={22} />
            </button>
          ) : (
            <>
              <h2>Leap Learning</h2>
              <button
                className="menu-toggle"
                onClick={() => setCollapsed(true)}
              >
                <X size={22} />
              </button>
            </>
          )}

        </div>

        <nav>

          <NavLink to="/employee/dashboard">
            <LayoutDashboard size={18} />
            {!collapsed && <span className="text">Dashboard</span>}
          </NavLink>

          <NavLink to="/employee/crm-inquiry">
            <Inbox size={18} />
            {!collapsed && <span className="text">CRM Inquiry</span>}
          </NavLink>

          <NavLink to="/employee/crm">
            <Database size={18} />
            {!collapsed && <span className="text">CRM</span>}
          </NavLink>

          <NavLink to="/employee/chat">
            <MessageCircle size={18} />
            {!collapsed && <span className="text">Chat</span>}
          </NavLink>

          <NavLink to="/employee/notifications">
            <Bell size={18} />
            {!collapsed && <span className="text">Notifications</span>}
          </NavLink>

          <NavLink to="/employee/settings">
            <Settings size={18} />
            {!collapsed && <span className="text">Settings</span>}
          </NavLink>

        </nav>

        {!collapsed && (
          <button className="sidebar-logout" onClick={handleLogout}>
            <LogOut size={18} />
            <span className="text">Logout</span>
          </button>
        )}

      </div>

      <div className="main-content">

        <div className="mobile-topbar">
          <button onClick={() => setMobileMenu(true)}>
            <Menu size={22} />
          </button>
          <h3>Leap Learning</h3>
        </div>

        <Outlet />

      </div>

    </div>
  );
}

export default EmployeeLayout;