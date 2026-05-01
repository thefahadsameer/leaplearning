import { Navigate } from "react-router-dom";

function ProtectedEmployeeRoute({ children }) {
  const session = localStorage.getItem("employeeSession");

  if (!session) {
    return <Navigate to="/employee/login" replace />;
  }

  try {
    const parsedSession = JSON.parse(session);

    if (!parsedSession.token) {
      return <Navigate to="/employee/login" replace />;
    }

    return children;
  } catch (error) {
    return <Navigate to="/employee/login" replace />;
  }
}

export default ProtectedEmployeeRoute;