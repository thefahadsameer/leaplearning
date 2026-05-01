// src/components/Homepage/CTASection/CTASection.jsx

import { Link } from "react-router-dom";
import "./CTASection.css";

function CTASection() {
  return (
    <section className="cta-section">
      <div className="cta-container">

        <div className="cta-content">
          <span className="cta-badge">Take The Next Step</span>

          <h2>
            Start Your Academic <br />
            Growth Journey Today
          </h2>

          <p>
            Speak with our team and explore premium doctoral pathways
            designed for professionals, founders, and future leaders.
          </p>

          <div className="cta-actions">
            <Link to="/apply" className="cta-btn primary-btn">
              Apply Now
            </Link>

            <Link to="/contact" className="cta-btn secondary-btn">
              Free Consultation
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

export default CTASection;