import { useEffect, useState } from "react";
import "../styles/adminNotifications.css";

function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  /* ---------- LOAD NOTIFICATIONS ---------- */
  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("employeeAdminMessages")) || [];
    setNotifications(stored);
  }, []);

  /* ---------- MARK ONE AS READ ---------- */
  const markAsRead = (id) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
    localStorage.setItem(
      "employeeAdminMessages",
      JSON.stringify(updated)
    );
  };

  /* ---------- MARK ALL AS READ ---------- */
  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({
      ...n,
      read: true
    }));
    setNotifications(updated);
    localStorage.setItem(
      "employeeAdminMessages",
      JSON.stringify(updated)
    );
  };

  return (
    <div className="admin-notifications-page">
      <div className="notif-header">
        <h1>Notifications</h1>
        {notifications.length > 0 && (
          <button className="mark-all-btn" onClick={markAllAsRead}>
            Mark all as read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="empty-state">
          No notifications available
        </div>
      ) : (
        <div className="notif-list">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`notif-card ${
                n.read ? "read" : "unread"
              }`}
              onClick={() => markAsRead(n.id)}
            >
              <div className="notif-top">
                <span className="notif-type">
                  {n.type.replaceAll("_", " ")}
                </span>
                <span className="notif-time">
                  {new Date(n.time).toLocaleString()}
                </span>
              </div>

              <div className="notif-body">
                <strong>
                  {n.employee?.name || "System"}
                </strong>{" "}
                → {n.candidate?.name || "—"}
              </div>

              <div className="notif-message">
                {n.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminNotificationsPage;
