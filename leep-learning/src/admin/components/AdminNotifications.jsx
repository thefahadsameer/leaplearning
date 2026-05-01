import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import notificationSound from "../../assets/sounds/software_interface_back.mp3";

function AdminNotifications() {
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);

  const audioRef = useRef(null);
  const previousCount = useRef(0);

  /* ---------- LOAD MESSAGES ---------- */
  const loadMessages = () => {
    const stored =
      JSON.parse(localStorage.getItem("employeeAdminMessages")) || [];
    setMessages(stored);
  };

  /* ---------- INITIAL LOAD + LIVE UPDATE ---------- */
  useEffect(() => {
    loadMessages();

    // Cross-tab updates
    const handleStorage = (e) => {
      if (e.key === "employeeAdminMessages") {
        loadMessages();
      }
    };

    window.addEventListener("storage", handleStorage);

    // Same-tab polling (safe fallback)
    const interval = setInterval(loadMessages, 2000);

    return () => {
      window.removeEventListener("storage", handleStorage);
      clearInterval(interval);
    };
  }, []);

  /* ---------- TOAST + SOUND ON NEW MESSAGE ---------- */
  useEffect(() => {
    if (messages.length > previousCount.current) {
      const latest = messages[messages.length - 1];

      // 🔊 Play sound
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }

      // 🍞 Toast popup
      toast.success(
        `${latest.employee?.name || "Employee"} → ${
          latest.candidate?.name || "Candidate"
        }\n${latest.message}`,
        {
          duration: 5000,
        }
      );
    }

    previousCount.current = messages.length;
  }, [messages]);

  /* ---------- UNREAD COUNT ---------- */
  const unreadCount = messages.filter((m) => !m.read).length;

  /* ---------- TOGGLE POPUP + MARK READ ---------- */
  const toggleOpen = () => {
    const updated = messages.map((m) => ({ ...m, read: true }));
    setMessages(updated);
    localStorage.setItem(
      "employeeAdminMessages",
      JSON.stringify(updated)
    );
    setOpen((prev) => !prev);
  };

  if (!messages.length) return null;

  return (
    <div style={wrapper}>
      {/* 🔔 BELL */}
      <div style={bell} onClick={toggleOpen}>
        🔔
        {unreadCount > 0 && (
          <span style={badge}>{unreadCount}</span>
        )}
      </div>

      {/* 📦 POPUP PREVIEW */}
      {open && (
        <div style={popup}>
          <h4 style={title}>Employee Updates</h4>

          {messages.slice(0, 5).map((m) => (
            <div key={m.id} style={item}>
              <div style={meta}>
                <b>{m.employee?.name}</b> →{" "}
                {m.candidate?.name}
              </div>
              <div style={text}>{m.message}</div>
              <div style={time}>
                {new Date(m.time).toLocaleString()}
              </div>
            </div>
          ))}

          {messages.length > 5 && (
            <div style={more}>
              View all notifications
            </div>
          )}
        </div>
      )}

      {/* 🔊 AUDIO */}
      <audio ref={audioRef} src={notificationSound} />
    </div>
  );
}

/* ---------- STYLES ---------- */

const wrapper = {
  position: "fixed",
  top: "20px",
  right: "30px",
  zIndex: 1000,
};

const bell = {
  fontSize: "24px",
  cursor: "pointer",
  position: "relative",
};

const badge = {
  position: "absolute",
  top: "-6px",
  right: "-10px",
  background: "#ef4444",
  color: "#fff",
  borderRadius: "999px",
  fontSize: "12px",
  padding: "2px 6px",
};

const popup = {
  position: "absolute",
  top: "36px",
  right: 0,
  width: "340px",
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
  padding: "12px",
};

const title = {
  marginBottom: "10px",
  fontSize: "15px",
};

const item = {
  padding: "8px",
  borderBottom: "1px solid #e5e7eb",
};

const meta = {
  fontSize: "13px",
  color: "#1f2937",
};

const text = {
  fontSize: "14px",
  marginTop: "4px",
};

const time = {
  fontSize: "11px",
  color: "#6b7280",
  marginTop: "4px",
};

const more = {
  textAlign: "center",
  marginTop: "8px",
  fontSize: "13px",
  color: "#2563eb",
  cursor: "pointer",
};

export default AdminNotifications;
