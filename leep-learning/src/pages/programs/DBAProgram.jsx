import "../../styles/programs/DBAProgram.css";
import { Link } from "react-router-dom";
import DBAHero from "../../assets/Media/dba-hero.jpg";

function DBAProgram() {
  return (
    <div className="program-page">
      <section
        className="program-hero"
        style={{
          backgroundImage: `url(${DBAHero})`,
        }}
      >
        <div className="program-overlay">
          <h1>Doctor of Business Administration (DBA)</h1>

          <p>
            Elevate your executive leadership capabilities through advanced
            business research, strategic thinking, and globally recognized
            doctoral-level qualifications.
          </p>

          <div className="hero-actions">
            <Link to="/apply" className="dba-apply-btn">
              Apply Now
            </Link>

            <a href="#overview" className="outline-btn">
              Explore Program
            </a>
          </div>
        </div>
      </section>

      <section id="overview" className="dba-program-content">
        <div className="content-grid">
          <div>
            <h2>Program Overview</h2>

            <p>
              The Doctor of Business Administration (DBA) program is designed
              for senior professionals, executives, entrepreneurs, consultants,
              and business leaders seeking to enhance their strategic
              decision-making capabilities through advanced applied research.
            </p>

            <p>
              The program bridges academic knowledge and real-world business
              practice, enabling participants to address complex organizational
              challenges while contributing valuable insights to their industry.
            </p>

            <p>
              Candidates develop expertise in leadership, innovation,
              organizational strategy, business analytics, and evidence-based
              management practices.
            </p>

            <p>
              Through guided doctoral research and expert supervision,
              participants gain the ability to investigate business problems
              systematically and create practical solutions that generate
              measurable impact.
            </p>

            <p>
              A DBA qualification demonstrates executive credibility, advanced
              professional competence, and commitment to lifelong learning in a
              competitive global marketplace.
            </p>

            <h3 style={{ marginTop: "30px" }}>Learning Outcomes</h3>

            <ul className="dba-program-outcomes">
              <li>Apply advanced business research methodologies.</li>
              <li>Strengthen executive leadership capabilities.</li>
              <li>Develop evidence-based strategic solutions.</li>
              <li>Enhance organizational decision-making skills.</li>
              <li>Contribute practical knowledge to business practice.</li>
            </ul>
          </div>

          <div className="dba-info-card">
            <h3>Program Highlights</h3>

            <ul>
              <li>Executive-Focused Curriculum</li>
              <li>Applied Business Research</li>
              <li>Flexible Study Structure</li>
              <li>Global Academic Recognition</li>
              <li>Leadership Development</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="dba-program-features">
        <h2>Why Choose This Program?</h2>

        <div className="dba-feature-grid">
          <div className="dba-feature-card">
            <h3>Executive Leadership</h3>
            <p>
              Develop strategic leadership skills for modern organizations.
            </p>
          </div>

          <div className="dba-feature-card">
            <h3>Business Research</h3>
            <p>
              Solve real-world business challenges through applied research.
            </p>
          </div>

          <div className="dba-feature-card">
            <h3>Global Recognition</h3>
            <p>
              Earn a respected doctoral qualification for career advancement.
            </p>
          </div>
        </div>
      </section>

      <section className="dba-program-cta">
        <h2>Ready to Advance Your Business Leadership?</h2>

        <p>
          Speak with our academic advisors and explore how a DBA can transform
          your professional journey.
        </p>

        <Link to="/apply" className="dba-apply-btn">
          Apply Now
        </Link>
      </section>
    </div>
  );
}

export default DBAProgram;