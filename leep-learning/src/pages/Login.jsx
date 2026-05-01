import { useState } from "react";
import API_BASE_URL from "../config/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setError("");

      console.log("STEP 1: Sending request...");

      const response = await fetch(
        `${API_BASE_URL}/api/students/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),       // ✅ FIX
            password: password.trim(), // ✅ FIX
          }),
        }
      );

      console.log("STEP 2: Response received");

      // ✅ HANDLE HTML / INVALID RESPONSE SAFELY
      const text = await response.text();
      console.log("RAW RESPONSE:", text);

      let data;

      try {
        data = JSON.parse(text);
      } catch (err) {
        throw new Error(
          "Backend not returning JSON. Check API URL or route."
        );
      }

      console.log("LOGIN DATA:", data);

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ SAVE TOKEN (CRITICAL)
      localStorage.setItem("token", data.token);

      // ✅ OPTIONAL BUT IMPORTANT (for future use)
      if (data.student) {
        localStorage.setItem("student", JSON.stringify(data.student));
      }

      console.log("TOKEN SAVED:", localStorage.getItem("token"));

      console.log("STEP 3: SUCCESS");

      // ✅ FORCE HARD REDIRECT
      window.location.replace("/student/dashboard");

    } catch (err) {
      console.error("LOGIN ERROR:", err);
      setError(err.message || "Failed to fetch");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      <div
        style={{
          width: "350px",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          background: "#fff",
          textAlign: "center",
        }}
      >
        <h2>Student Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />

          {error && (
            <p style={{ color: "red", marginBottom: "10px" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              background: "#1dbf73",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}