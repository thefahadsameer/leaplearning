import { Link } from "react-router-dom";
import "./FinalCTA.css";
import GraduationImage from "../../assets/Media/pexels-pixabay-267885.jpg";

function FinalCTA() {
  return (
    <section className="final-cta-section">
      <div className="final-cta-container">

        {/* LEFT CONTENT */}
        <div className="final-cta-content">
          <p className="final-cta-small">
            Take the next step
          </p>

          <h2 className="final-cta-title">
            Begin Your <br />
            Academic Journey Today
          </h2>

          <p className="final-cta-text">
            Connect with our academic consulting team to explore structured,
            institution-backed pathways designed to help you move forward
            with confidence, clarity, and measurable academic success.
          </p>

          <div className="final-cta-buttons">
            <Link to="/apply" className="btn-primary">
              Get Started
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="final-cta-image">
          <img src={GraduationImage} alt="Graduation" />
        </div>

      </div>
    </section>
  );
}

export default FinalCTA;
