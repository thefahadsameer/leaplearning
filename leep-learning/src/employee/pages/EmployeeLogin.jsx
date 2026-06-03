import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/employeeLogin.css";

function EmployeeLogin() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [secureCode, setSecureCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const cleanedPhone = phone.trim();

    if (!cleanedPhone || !secureCode) {
      setError("Phone and secure code are required");
      return;
    }

    if (!/^\d{4}$/.test(secureCode)) {
      setError("Secure code must be 4 digits");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://leaplearning.onrender.com/api/employees/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: cleanedPhone,
            secureCode,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      /* ===== STORE SESSION ===== */

      const session = {
        token: data.token,
        employee: data.employee,
        loginTime: new Date().toISOString(),
      };

      localStorage.setItem(
        "employeeSession",
        JSON.stringify(session)
      );

      /* ===== REDIRECT ===== */

      navigate("/employee/dashboard");
    } catch (err) {
      console.error("Login error:", err);

      setError(
        err.message || "Unable to login"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="employee-login-wrapper">
      <div className="employee-login-card">
        <h2>Employee Login</h2>
        <p>Sales team access</p>

        {error && (
          <div className="employee-error">
            {error}
          </div>
        )}

        <div className="employee-form-group">
          <label>Phone</label>

          <input
            type="text"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            placeholder="Enter phone number"
          />
        </div>

        <div className="employee-form-group">
          <label>4-Digit Secure Code</label>

          <input
            type="password"
            maxLength={4}
            value={secureCode}
            onChange={(e) =>
              setSecureCode(e.target.value)
            }
            placeholder="••••"
          />
        </div>

        <button
          className="employee-login-btn"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>
      </div>
    </div>
  );
}

export default EmployeeLogin;