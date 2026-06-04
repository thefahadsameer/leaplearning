import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/adminLogin.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      setError("Enter email and password");
      return;
    }

    let role = "viewer";

    if (email.includes("review")) role = "reviewer";
    if (email.includes("admin")) role = "super_admin";

    localStorage.setItem(
      "adminSession",
      JSON.stringify({
        email,
        role,
      }),
    );

    navigate("/admin/dashboard");
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="admin-login-wrapper">
      <button
        onClick={handleBack}
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          padding: "10px 16px",
          border: "none",
          borderRadius: "8px",
          background: "#111827",
          color: "#ffffff",
          cursor: "pointer",
          zIndex: 999,
        }}
      >
        ← Back
      </button>

      <div className="admin-login-card">
        <h2>Admin Login</h2>
        <p>Sign in to manage applications</p>

        {error && <div className="admin-error">{error}</div>}

        <div className="admin-form-group">
          <label>Email</label>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="admin-form-group">
          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="admin-login-btn"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;