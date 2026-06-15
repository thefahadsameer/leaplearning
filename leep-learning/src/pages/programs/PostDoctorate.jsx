import "../../styles/programs/PostDoctorate.css";
import { Link } from "react-router-dom";
import PostDoctorateHero from "../../assets/Media/post-doctorate-hero.jpg";

function PostDoctorate() {
  return (
    <div className="program-page">
      <section
        className="program-hero"
        style={{
          backgroundImage: `url(${PostDoctorateHero})`,
        }}
      >
        <div className="program-overlay">
          <h1>Post Doctorate Program</h1>

          <p>
            Advance your research expertise, academic influence, and
            professional contributions through independent post-doctoral
            research and scholarly development.
          </p>

          <div className="hero-actions">
            <Link to="/apply" className="postdoc-apply-btn">
              Apply Now
            </Link>

            <a href="#overview" className="outline-btn">
              Explore Program
            </a>
          </div>
        </div>
      </section>

      <section id="overview" className="postdoc-program-content">
        <div className="content-grid">
          <div>
            <h2>Program Overview</h2>

            <p>
              The Post Doctorate Program is designed for individuals who have
              already earned a doctoral degree and wish to further expand
              their expertise through advanced independent research.
            </p>

            <p>
              Participants engage in specialized investigations within their
              chosen discipline while contributing meaningful knowledge to
              academia, industry, and society.
            </p>

            <p>
              The program encourages innovation, interdisciplinary research,
              publication development, and scholarly collaboration at national
              and international levels.
            </p>

            <p>
              Researchers gain opportunities to strengthen their academic
              credentials, enhance professional recognition, and build
              leadership within their field of expertise.
            </p>

            <p>
              A Post Doctorate qualification demonstrates continued commitment
              to research excellence and lifelong scholarly development.
            </p>

            <h3 style={{ marginTop: "30px" }}>
              Research Outcomes
            </h3>

            <ul className="postdoc-program-outcomes">
              <li>Advanced Independent Research Skills</li>
              <li>Academic Publication Development</li>
              <li>Innovation and Knowledge Creation</li>
              <li>Interdisciplinary Collaboration</li>
              <li>Research Leadership and Mentorship</li>
            </ul>
          </div>

          <div className="postdoc-info-card">
            <h3>Program Highlights</h3>

            <ul>
              <li>Advanced Research Opportunities</li>
              <li>Expert Academic Guidance</li>
              <li>Publication Support</li>
              <li>International Research Exposure</li>
              <li>Flexible Research Structure</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="postdoc-program-features">
        <h2>Why Choose This Program?</h2>

        <div className="postdoc-feature-grid">
          <div className="postdoc-feature-card">
            <h3>Research Excellence</h3>

            <p>
              Conduct impactful research that advances your field of study.
            </p>
          </div>

          <div className="postdoc-feature-card">
            <h3>Global Academic Network</h3>

            <p>
              Collaborate with scholars, researchers, and experts worldwide.
            </p>
          </div>

          <div className="postdoc-feature-card">
            <h3>Professional Recognition</h3>

            <p>
              Strengthen your academic reputation and career opportunities.
            </p>
          </div>
        </div>
      </section>

      <section className="postdoc-program-cta">
        <h2>Ready to Advance Your Research Journey?</h2>

        <p>
          Connect with our academic advisors to explore post-doctoral
          opportunities and research pathways.
        </p>

        <Link to="/apply" className="postdoc-apply-btn">
          Apply Now
        </Link>
      </section>
    </div>
  );
}

export default PostDoctorate;