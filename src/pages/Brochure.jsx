import "../styles/Brochure.css";
import { Link } from "react-router-dom";

function Brochure() {
  return (
    <section className="brochure-page">
      <div className="brochure-container">

        <span className="brochure-badge">
          Currently Under Maintenance
        </span>

        <h1 className="brochure-title">
          Course Brochure
        </h1>

        <p className="brochure-description">
          We are currently updating our academic program materials to provide
          you with the most accurate and comprehensive information.
        </p>

        <p className="brochure-subtext">
          Please check back shortly or connect with our advisory team
          for immediate assistance.
        </p>

        <Link to="/contact" className="brochure-btn">
          Contact Advisory Team
        </Link>

      </div>
    </section>
  );
}

export default Brochure;
