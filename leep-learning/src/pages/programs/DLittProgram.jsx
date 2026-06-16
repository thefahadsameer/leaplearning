import "../../styles/programs/DLittProgram.css";
import { Link } from "react-router-dom";
import DLittHero from "../../assets/Media/dlitt-hero.jpg";

function DLittProgram() {
  return (
    <div className="program-page">
      <section
        className="program-hero"
        style={{
          backgroundImage: `url(${DLittHero})`,
        }}
      >
        <div className="program-overlay">
          <h1>Doctor of Literature (D.Litt)</h1>

          <p>
            Recognizing exceptional contributions to literature, education,
            research, public service, and the advancement of knowledge through
            one of the highest academic distinctions.
          </p>

          <div className="hero-actions">
            <Link to="/apply" className="dlitt-apply-btn">
              Apply Now
            </Link>

            <a href="#overview" className="outline-btn">
              Explore Program
            </a>
          </div>
        </div>
      </section>

      <section id="overview" className="dlitt-program-content">
        <div className="content-grid">
          <div>
            <h2>Program Overview</h2>

            <p>
              The Doctor of Literature (D.Litt) is a distinguished higher
              doctorate awarded to individuals who have demonstrated exceptional
              achievements in literature, humanities, education, research,
              public leadership, and intellectual contribution to society.
            </p>

            <p>
              The qualification acknowledges a substantial body of work that
              has significantly influenced academic thought, cultural
              development, public policy, or professional practice at national
              and international levels.
            </p>

            <p>
              Unlike traditional doctoral programs focused primarily on
              coursework and dissertation requirements, the D.Litt recognizes
              established excellence, leadership, innovation, and long-term
              contributions that have created measurable impact within a
              discipline or community.
            </p>

            <p>
              Recipients of the Doctor of Literature distinction are recognized
              for their dedication to advancing knowledge, inspiring future
              generations, and promoting intellectual growth across diverse
              sectors.
            </p>

            <p>
              The award represents academic prestige, professional distinction,
              and global recognition of outstanding scholarly or societal
              contributions.
            </p>

            <h3 style={{ marginTop: "30px" }}>
              Learning Outcomes
            </h3>

            <ul className="dlitt-program-outcomes">
              <li>Apply advanced scholarly and critical thinking skills.</li>
              <li>Demonstrate leadership in literature, humanities, or education.</li>
              <li>Contribute meaningful knowledge to society and academia.</li>
              <li>Promote innovation, research, and intellectual development.</li>
              <li>Strengthen professional credibility and academic distinction.</li>
            </ul>
          </div>

          <div className="dlitt-info-card">
            <h3>Program Highlights</h3>

            <ul>
              <li>Higher Doctorate Recognition</li>
              <li>Academic Prestige</li>
              <li>Global Recognition</li>
              <li>Scholarly Excellence</li>
              <li>Leadership & Influence</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="dlitt-program-features">
        <h2>Why Choose This Program?</h2>

        <div className="dlitt-feature-grid">
          <div className="dlitt-feature-card">
            <h3>Academic Distinction</h3>

            <p>
              Gain recognition for exceptional contributions to literature,
              education, and scholarship.
            </p>
          </div>

          <div className="dlitt-feature-card">
            <h3>Global Recognition</h3>

            <p>
              Receive a respected higher doctorate acknowledged internationally.
            </p>
          </div>

          <div className="dlitt-feature-card">
            <h3>Legacy & Impact</h3>

            <p>
              Celebrate a lifetime of achievements that have influenced society
              and knowledge.
            </p>
          </div>
        </div>
      </section>

      <section className="dlitt-program-cta">
        <h2>Ready to Be Recognized for Your Contributions?</h2>

        <p>
          Connect with our academic advisors to learn how the Doctor of
          Literature (D.Litt) distinction can honor your achievements and
          professional legacy.
        </p>

        <Link to="/apply" className="dlitt-apply-btn">
          Apply Now
        </Link>
      </section>
    </div>
  );
}

export default DLittProgram;