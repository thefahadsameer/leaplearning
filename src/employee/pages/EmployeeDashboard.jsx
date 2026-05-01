import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/employeeDashboard.css";

// ✅ HEARTBEAT IMPORTS
import {
  startEmployeeHeartbeat,
  markEmployeeOffline
} from "../utils/sessionManager";

const STAGES = [
  "Call Back",
  "Interested",
  "Not Interested",
  "DNP",
  "Connected",
  "Spoken",
  "Enrolled",
  "Duplicate",
  "Invalid"
];

const PAYMENT_MODES = [
  "Bank Transfer",
  "Bank Scanner",
  "Payment Gateway"
];

function EmployeeDashboard() {
  const navigate = useNavigate();
  const session = JSON.parse(localStorage.getItem("employeeSession"));

  const [candidates, setCandidates] = useState([]);

  // ✅ INLINE PAYMENT STATES (USED)
  const [activePaymentRow, setActivePaymentRow] = useState(null);
  const [paymentForm, setPaymentForm] = useState({
    amount: "",
    date: "",
    mode: PAYMENT_MODES[0]
  });

  // ✅ NOTIFY ADMIN STATES
  const [activeMessageRow, setActiveMessageRow] = useState(null);
  const [adminMessage, setAdminMessage] = useState("");

  /* ---------- AUTH GUARD ---------- */
  useEffect(() => {
    if (!session) navigate("/employee/login");
  }, [navigate, session]);

  /* ---------- HEARTBEAT ---------- */
  useEffect(() => {
    if (!session) return;

    const stopHeartbeat = startEmployeeHeartbeat();
    window.addEventListener("beforeunload", markEmployeeOffline);

    return () => {
      stopHeartbeat && stopHeartbeat();
      markEmployeeOffline();
      window.removeEventListener("beforeunload", markEmployeeOffline);
    };
  }, [session]);

  /* ---------- LOAD CANDIDATES ---------- */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("candidates"));
    if (stored) setCandidates(stored);
  }, []);

  /* ---------- PERSIST ---------- */
  useEffect(() => {
    localStorage.setItem("candidates", JSON.stringify(candidates));
  }, [candidates]);

  /* ---------- HELPERS ---------- */
  const totalPaid = (payments) =>
    payments.reduce((s, p) => s + Number(p.amount), 0);

  /* ---------- ADD PAYMENT ---------- */
  const addPayment = (candidateId) => {
    if (!paymentForm.amount || !paymentForm.date) return;

    setCandidates((prev) =>
      prev.map((c) =>
        c.id === candidateId
          ? { ...c, payments: [...c.payments, paymentForm] }
          : c
      )
    );

    setPaymentForm({
      amount: "",
      date: "",
      mode: PAYMENT_MODES[0]
    });

    setActivePaymentRow(null);
  };

  /* ---------- SEND MESSAGE TO ADMIN ---------- */
  const sendCandidateUpdateToAdmin = (candidate) => {
    if (!adminMessage.trim()) return;

    const paid = totalPaid(candidate.payments);
    const pending = candidate.totalFee - paid;

    const messages =
      JSON.parse(localStorage.getItem("employeeAdminMessages")) || [];

    messages.unshift({
      id: crypto.randomUUID(),
      type: "CANDIDATE_UPDATE",
      employee: {
        id: session.id,
        name: session.name,
        email: session.email
      },
      candidate: {
        id: candidate.id,
        name: candidate.name,
        city: candidate.city,
        stage: candidate.stage,
        totalFee: candidate.totalFee,
        paid,
        pending
      },
      message: adminMessage,
      time: new Date().toISOString(),
      read: false
    });

    localStorage.setItem(
      "employeeAdminMessages",
      JSON.stringify(messages)
    );

    setAdminMessage("");
    setActiveMessageRow(null);
  };

  /* ---------- LOGOUT ---------- */
  const handleLogout = () => {
    markEmployeeOffline();
    localStorage.removeItem("employeeSession");
    navigate("/employee/login");
  };

  return (
    <div className="employee-dashboard">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h1>Employee Dashboard</h1>
          <p className="employee-sub">
            Welcome, <b>{session?.name}</b> | {session?.email}
          </p>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="leads-card">
        <h2>Candidates</h2>

        <table className="leads-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>Stage</th>
              <th>Total Fee</th>
              <th>Paid</th>
              <th>Pending</th>
              <th>Payments</th>
              <th>Notify Admin</th>
            </tr>
          </thead>

          <tbody>
            {candidates.map((c) => {
              const paid = totalPaid(c.payments);
              const pending = c.totalFee - paid;

              return (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.city}</td>

                  <td>
                    <select
                      className="stage-select"
                      value={c.stage}
                      onChange={(e) =>
                        setCandidates((prev) =>
                          prev.map((x) =>
                            x.id === c.id
                              ? { ...x, stage: e.target.value }
                              : x
                          )
                        )
                      }
                    >
                      {STAGES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </td>

                  <td>
                    <input
                      className="fee-input"
                      type="number"
                      value={c.totalFee}
                      onChange={(e) =>
                        setCandidates((prev) =>
                          prev.map((x) =>
                            x.id === c.id
                              ? { ...x, totalFee: Number(e.target.value) }
                              : x
                          )
                        )
                      }
                    />
                  </td>

                  <td className="paid-amount">INR {paid}</td>
                  <td className="pending-amount">INR {pending}</td>

                  <td>
                    {c.payments.map((p, i) => (
                      <div className="payment-item" key={i}>
                        {p.amount} ({p.mode}) – {p.date}
                      </div>
                    ))}

                    {activePaymentRow === c.id ? (
                      <div className="inline-payment">
                        <input
                          type="number"
                          placeholder="Amount"
                          value={paymentForm.amount}
                          onChange={(e) =>
                            setPaymentForm({
                              ...paymentForm,
                              amount: e.target.value
                            })
                          }
                        />
                        <input
                          type="date"
                          value={paymentForm.date}
                          onChange={(e) =>
                            setPaymentForm({
                              ...paymentForm,
                              date: e.target.value
                            })
                          }
                        />
                        <select
                          value={paymentForm.mode}
                          onChange={(e) =>
                            setPaymentForm({
                              ...paymentForm,
                              mode: e.target.value
                            })
                          }
                        >
                          {PAYMENT_MODES.map((m) => (
                            <option key={m}>{m}</option>
                          ))}
                        </select>
                        <button onClick={() => addPayment(c.id)}>
                          Enter
                        </button>
                      </div>
                    ) : (
                      <div
                        className="add-payment-btn"
                        onClick={() => setActivePaymentRow(c.id)}
                      >
                        + Add Payment
                      </div>
                    )}
                  </td>

                  <td>
                    {activeMessageRow !== c.id && (
                      <button
                        className="add-payment-btn"
                        onClick={() => setActiveMessageRow(c.id)}
                      >
                        Notify
                      </button>
                    )}

                    {activeMessageRow === c.id && (
                      <div className="inline-payment">
                        <textarea
                          placeholder="Write update for admin..."
                          value={adminMessage}
                          onChange={(e) =>
                            setAdminMessage(e.target.value)
                          }
                          style={{ width: "220px", height: "60px" }}
                        />
                        <button
                          onClick={() => sendCandidateUpdateToAdmin(c)}
                        >
                          Send
                        </button>
                        <button
                          onClick={() => setActiveMessageRow(null)}
                          style={{
                            background: "transparent",
                            border: "none",
                            color: "#ef4444",
                            fontSize: "18px",
                            cursor: "pointer",
                            marginLeft: "6px"
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
