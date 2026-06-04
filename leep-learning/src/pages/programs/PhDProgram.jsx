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
              The Doctor of Philosophy (PhD) program is designed for ambitious
              researchers, professionals, educators, and industry leaders who
              seek to contribute original knowledge and innovation to their
              chosen field of study.
            </p>

            <p>
              Through a structured research framework, candidates develop
              advanced analytical, critical thinking, and problem-solving skills
              while working on meaningful research projects that address
              real-world challenges and academic gaps.
            </p>

            <p>
              The program provides access to experienced academic supervisors,
              research methodologies, scholarly resources, and dissertation
              guidance to support candidates throughout their doctoral journey.
            </p>

            <p>
              Participants are encouraged to publish research papers, present at
              academic conferences, and contribute to global knowledge
              communities while building strong professional credibility.
            </p>

            <p>
              Whether pursuing academic advancement, leadership positions,
              consulting opportunities, or specialized research careers, the PhD
              qualification demonstrates expertise, dedication, and the ability
              to generate impactful knowledge.
            </p>

            <h3 style={{ marginTop: "30px" }}>Learning Outcomes</h3>

            <ul className="program-outcomes">
              <li>Develop advanced research and analytical capabilities.</li>
              <li>Design and execute independent doctoral research.</li>
              <li>Produce high-quality academic publications.</li>
              <li>Strengthen leadership and subject-matter expertise.</li>
              <li>Contribute original knowledge to a chosen discipline.</li>
            </ul>
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
