// ================== HEARTBEAT RULES ==================
const HEARTBEAT_INTERVAL = 10 * 1000; // 10 seconds
const IDLE_LIMIT = 5 * 60 * 1000; // 5 minutes
const AUTO_LOGOUT_LIMIT = 30 * 60 * 1000; // 30 minutes
// ====================================================

let heartbeatTimer = null;
let lastInteractionTime = Date.now();

function getSession() {
  return JSON.parse(localStorage.getItem("employeeSession"));
}

function saveSession(session) {
  localStorage.setItem("employeeSession", JSON.stringify(session));
}

function logout(reason = "AUTO_LOGOUT_INACTIVITY") {
  const session = getSession();
  if (!session) return;

  const logs =
    JSON.parse(localStorage.getItem("employeeActivityLog")) || [];

  logs.push({
    employeeId: session.id,
    name: session.name,
    email: session.email,
    action: reason,
    time: new Date().toISOString()
  });

  localStorage.setItem("employeeActivityLog", JSON.stringify(logs));
  localStorage.removeItem("employeeSession");

  // Hard redirect (no SPA race conditions)
  window.location.replace("/employee/login");
}

export function startEmployeeHeartbeat() {
  const onUserInteraction = () => {
    lastInteractionTime = Date.now();

    const session = getSession();
    if (!session) return;

    session.status = "ONLINE";
    session.lastActiveAt = Date.now();
    saveSession(session);
  };

  const events = ["mousemove", "keydown", "click"];
  events.forEach((e) =>
    document.addEventListener(e, onUserInteraction)
  );

  window.addEventListener("blur", () => {
    const session = getSession();
    if (!session) return;
    session.status = "IDLE";
    saveSession(session);
  });

  heartbeatTimer = setInterval(() => {
    const now = Date.now();
    const diff = now - lastInteractionTime;

    if (diff >= AUTO_LOGOUT_LIMIT) {
      logout();
    } else if (diff >= IDLE_LIMIT) {
      const session = getSession();
      if (!session) return;
      session.status = "IDLE";
      saveSession(session);
    }
  }, HEARTBEAT_INTERVAL);

  return () => {
    clearInterval(heartbeatTimer);
    events.forEach((e) =>
      document.removeEventListener(e, onUserInteraction)
    );
  };
}

export function markEmployeeOffline() {
  const session = getSession();
  if (!session) return;

  session.status = "OFFLINE";
  session.lastActiveAt = Date.now();
  saveSession(session);
}
