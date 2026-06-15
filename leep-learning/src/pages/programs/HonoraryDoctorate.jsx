import "../../styles/programs/HonoraryDoctorate.css";
import { Link } from "react-router-dom";
import HonoraryHero from "../../assets/Media/honorary-doctorate-hero.jpg";

function HonoraryDoctorate() {
  return (
    <div className="program-page">
      <section
        className="program-hero"
        style={{
          backgroundImage: `url(${HonoraryHero})`,
        }}
      >
        <div className="program-overlay">
          <h1>Honorary Doctorate</h1>

          <p>
            Recognizing exceptional achievements, leadership, innovation,
            philanthropy, and contributions to society through prestigious
            honorary academic recognition.
          </p>

          <div className="hero-actions">
            <Link to="/apply" className="honorary-apply-btn">
              Apply Now
            </Link>

            <a href="#overview" className="outline-btn">
              Explore Recognition
            </a>
          </div>
        </div>
      </section>

      <section id="overview" className="honorary-program-content">
        <div className="content-grid">
          <div>
            <h2>About Honorary Doctorate</h2>

            <p>
              An Honorary Doctorate is one of the highest forms of academic
              recognition awarded to distinguished individuals who have made
              remarkable contributions to their profession, industry,
              community, or society.
            </p>

            <p>
              Unlike traditional doctoral programs, honorary doctorates are
              conferred based on achievements, leadership, innovation,
              humanitarian efforts, entrepreneurship, research excellence,
              public service, or outstanding lifetime accomplishments.
            </p>

            <p>
              This recognition celebrates individuals whose work has created
              significant impact and inspired positive change at national or
              international levels.
            </p>

            <p>
              Honorary recipients often include business leaders, educators,
              scientists, social reformers, philanthropists, innovators,
              policymakers, artists, and distinguished professionals.
            </p>

            <p>
              The award serves as a symbol of excellence, influence, integrity,
              and commitment to advancing society through meaningful
              contributions.
            </p>

            <h3 style={{ marginTop: "30px" }}>
              Recognition Areas
            </h3>

            <ul className="honorary-program-outcomes">
              <li>Business & Entrepreneurship</li>
              <li>Education & Research</li>
              <li>Social Service & Philanthropy</li>
              <li>Science & Innovation</li>
              <li>Public Leadership & Governance</li>
              <li>Arts, Culture & Literature</li>
            </ul>
          </div>

          <div className="honorary-info-card">
            <h3>Recognition Highlights</h3>

            <ul>
              <li>Global Recognition</li>
              <li>Prestigious Academic Honor</li>
              <li>Lifetime Achievement Recognition</li>
              <li>Leadership Excellence Award</li>
              <li>International Visibility</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="honorary-program-features">
        <h2>Why Receive an Honorary Doctorate?</h2>

        <div className="honorary-feature-grid">
          <div className="honorary-feature-card">
            <h3>Recognition of Excellence</h3>
            <p>
              Celebrate significant achievements and contributions to society.
            </p>
          </div>

          <div className="honorary-feature-card">
            <h3>Global Prestige</h3>
            <p>
              Gain international recognition from respected academic
              institutions.
            </p>
          </div>

          <div className="honorary-feature-card">
            <h3>Professional Legacy</h3>
            <p>
              Strengthen your professional profile and long-term legacy.
            </p>
          </div>
        </div>
      </section>

      <section className="honorary-program-cta">
        <h2>Ready to Receive Prestigious Recognition?</h2>

        <p>
          Connect with our academic advisors to learn more about honorary
          doctorate nominations and recognition opportunities.
        </p>

        <Link to="/apply" className="honorary-apply-btn">
          Apply Now
        </Link>
      </section>
    </div>
  );
}

export default HonoraryDoctorate;