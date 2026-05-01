import { Navigate } from "react-router-dom";

function ProtectedStudentRoute({ children }) {
  // ✅ FIX: match the key used in Login.jsx
  const token = localStorage.getItem("token");

  console.log("Protected Route Token:", token); // debug (safe)

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedStudentRoute;