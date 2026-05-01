// src/components/Common/FloatingCTA/FloatingCTA.jsx

import { Link, useLocation } from "react-router-dom";
import "./FloatingCTA.css";

function FloatingCTA() {
  const location = useLocation();

  // Hide on apply page only
  if (location.pathname === "/apply") return null;

  return (
    <Link to="/apply" className="floating-cta">
      Apply Now
    </Link>
  );
}

export default FloatingCTA;