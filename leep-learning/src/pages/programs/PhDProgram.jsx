import "../../styles/programs/PhDProgram.css";
import { Link } from "react-router-dom";
import PhDHero from "../../assets/Media/phd-hero.jpg";

function PhDProgram() {
  return (
    <div className="program-page">
      <section
        className="program-hero"
        style={{
          backgroundImage: `url(${PhDHero})`,
        }}
      >
        <div className="program-overlay">
          <span className="program-badge">Doctorate Program</span>

          <h1>Doctor of Philosophy (PhD)</h1>

          <p>
            Advance your academic and professional career through rigorous
            research, innovation, and internationally recognized doctoral
            qualifications.
          </p>

          <div className="hero-actions">
            <Link to="/apply" className="apply-btn">
              Apply Now
            </Link>

            <a href="#overview" className="outline-btn">
              Explore Program
            </a>
          </div>
        </div>
      </section>

      <section id="overview" className="program-content">
        <div className="content-grid">
          <div>
            <h2>Program Overview</h2>

            <p>
              The Doctor of Philosophy (PhD) program is designed for
              researchers, professionals, educators and industry leaders who
              seek to contribute original knowledge to their field.
            </p>

            <p>
              Participants engage in advanced research, academic writing, and
              dissertation development under expert guidance.
            </p>
          </div>

          <div className="info-card">
            <h3>Program Highlights</h3>

            <ul>
              <li>Research-Based Learning</li>
              <li>Flexible Study Mode</li>
              <li>Global Recognition</li>
              <li>Experienced Supervisors</li>
              <li>Thesis & Publication Support</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="program-features">
        <h2>Why Choose This Program?</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Academic Excellence</h3>
            <p>
              Conduct meaningful research and contribute to your academic field.
            </p>
          </div>

          <div className="feature-card">
            <h3>Career Growth</h3>
            <p>Unlock opportunities in academia, leadership and consulting.</p>
          </div>

          <div className="feature-card">
            <h3>Research Support</h3>
            <p>
              Receive structured supervision and guidance throughout the
              journey.
            </p>
          </div>
        </div>
      </section>

      <section className="program-cta">
        <h2>Ready to Begin Your Doctoral Journey?</h2>

        <p>
          Connect with our academic advisors and discover the right research
          pathway for your goals.
        </p>

        <Link to="/apply" className="apply-btn">
          Apply Now
        </Link>
      </section>
    </div>
  );
}

export default PhDProgram;
