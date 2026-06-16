import "../../styles/programs/Professorship.css";
import { Link } from "react-router-dom";
import ProfessorshipHero from "../../assets/Media/professorship-hero.jpg";

function Professorship() {
  return (
    <div className="program-page">
      <section
        className="program-hero"
        style={{
          backgroundImage: `url(${ProfessorshipHero})`,
        }}
      >
        <div className="program-overlay">
          <h1>Professorship Program</h1>

          <p>
            Recognizing academic excellence, leadership, teaching expertise,
            research contributions, and commitment to advancing education and
            professional development.
          </p>

          <div className="hero-actions">
            <Link to="/apply" className="professorship-apply-btn">
              Apply Now
            </Link>

            <a href="#overview" className="outline-btn">
              Explore Program
            </a>
          </div>
        </div>
      </section>

      <section id="overview" className="professorship-program-content">
        <div className="content-grid">
          <div>
            <h2>Program Overview</h2>

            <p>
              The Professorship Program is designed for distinguished
              professionals, educators, researchers, industry leaders, and
              scholars who have demonstrated exceptional expertise and
              contributions within their respective fields.
            </p>

            <p>
              The program recognizes individuals who have shown excellence in
              teaching, research, innovation, leadership, mentorship, and
              knowledge dissemination at national and international levels.
            </p>

            <p>
              Participants receive recognition for their commitment to academic
              advancement and their ability to inspire future generations
              through education and professional development.
            </p>

            <p>
              The designation reflects academic distinction, professional
              credibility, and leadership within a specialized discipline.
            </p>

            <p>
              Professorship recognition serves as a symbol of achievement,
              influence, and dedication to lifelong learning and educational
              excellence.
            </p>

            <h3 style={{ marginTop: "30px" }}>
              Program Outcomes
            </h3>

            <ul className="professorship-program-outcomes">
              <li>Academic Leadership Recognition</li>
              <li>Teaching Excellence Acknowledgement</li>
              <li>Research & Innovation Contribution</li>
              <li>Professional Credibility Enhancement</li>
              <li>Mentorship & Knowledge Sharing Impact</li>
            </ul>
          </div>

          <div className="professorship-info-card">
            <h3>Program Highlights</h3>

            <ul>
              <li>Academic Distinction</li>
              <li>Leadership Recognition</li>
              <li>Global Professional Prestige</li>
              <li>Teaching Excellence</li>
              <li>Research Achievement</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="professorship-program-features">
        <h2>Why Choose This Program?</h2>

        <div className="professorship-feature-grid">
          <div className="professorship-feature-card">
            <h3>Academic Recognition</h3>

            <p>
              Receive acknowledgment for outstanding contributions to education
              and professional development.
            </p>
          </div>

          <div className="professorship-feature-card">
            <h3>Leadership Excellence</h3>

            <p>
              Showcase your expertise, influence, and leadership within your
              discipline.
            </p>
          </div>

          <div className="professorship-feature-card">
            <h3>Global Prestige</h3>

            <p>
              Strengthen your professional profile through internationally
              respected academic recognition.
            </p>
          </div>
        </div>
      </section>

      <section className="professorship-program-cta">
        <h2>Ready to Elevate Your Academic Profile?</h2>

        <p>
          Connect with our academic advisors to learn how Professorship
          recognition can strengthen your professional legacy and educational
          impact.
        </p>

        <Link to="/apply" className="professorship-apply-btn">
          Apply Now
        </Link>
      </section>
    </div>
  );
}

export default Professorship;