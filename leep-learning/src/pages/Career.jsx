// src/pages/Career.jsx

import "../styles/Career.css";
import { Link } from "react-router-dom";
import {
  BriefcaseBusiness,
  GraduationCap,
  TrendingUp,
  Users,
  MapPin,
  Clock3,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

function Career() {
  return (
    <main className="career-page">

      {/* ================= HERO ================= */}
      <section className="career-hero">
        <div className="career-hero-overlay"></div>

        <div className="career-hero-content">
          <span className="career-eyebrow">
            CAREERS AT LEAP LEARNING
          </span>

          <h1>
            Build Your Career.
            <br />
            <span>Shape Your Future.</span>
          </h1>

          <p>
            Join a growing education and professional learning company
            where your skills, ideas, and ambition can make a meaningful
            difference.
          </p>

          <a href="#open-positions" className="career-hero-btn">
            Explore Open Positions
            <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* ================= INTRO ================= */}
      <section className="career-intro">
        <div className="career-container">

          <div className="career-intro-heading">
            <span className="career-section-label">
              WORK WITH US
            </span>

            <h2>
              Grow With Leap Learning
            </h2>
          </div>

          <div className="career-intro-content">
            <p>
              At Leap Learning, we believe that great work starts with
              great people. Our team works across education, admissions,
              business development, client relations, technology, and
              business operations.
            </p>

            <p>
              We are building a professional and growth-oriented
              environment where individuals can develop their skills,
              take ownership of their responsibilities, and contribute
              to the continued growth of the organization.
            </p>
          </div>

        </div>
      </section>

      {/* ================= WHY JOIN ================= */}
      <section className="career-benefits">
        <div className="career-container">

          <div className="career-section-heading">
            <span className="career-section-label">
              WHY LEAP LEARNING
            </span>

            <h2>
              More Than Just a Job
            </h2>

            <p>
              Build professional experience while working in a
              collaborative and growth-focused environment.
            </p>
          </div>

          <div className="career-benefit-grid">

            <div className="career-benefit-card">
              <div className="career-benefit-icon">
                <TrendingUp size={25} />
              </div>

              <h3>Career Growth</h3>

              <p>
                Develop practical skills and take on opportunities
                that support your professional growth.
              </p>
            </div>

            <div className="career-benefit-card">
              <div className="career-benefit-icon">
                <GraduationCap size={25} />
              </div>

              <h3>Continuous Learning</h3>

              <p>
                Learn through real-world responsibilities, guidance,
                collaboration, and hands-on experience.
              </p>
            </div>

            <div className="career-benefit-card">
              <div className="career-benefit-icon">
                <Users size={25} />
              </div>

              <h3>Collaborative Environment</h3>

              <p>
                Work with a team where communication, accountability,
                and professional collaboration matter.
              </p>
            </div>

            <div className="career-benefit-card">
              <div className="career-benefit-icon">
                <BriefcaseBusiness size={25} />
              </div>

              <h3>Meaningful Work</h3>

              <p>
                Contribute to services that connect learners with
                academic and professional opportunities.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= OPEN POSITIONS ================= */}
      <section
        className="career-openings"
        id="open-positions"
      >
        <div className="career-container">

          <div className="career-section-heading career-openings-heading">
            <span className="career-section-label">
              CURRENT OPPORTUNITIES
            </span>

            <h2>
              Open Positions
            </h2>

            <p>
              Explore our current opportunities and find a role that
              matches your skills and career goals.
            </p>
          </div>

          {/* JOB CARD */}
          <article className="career-job-card">

            <div className="career-job-main">

              <div className="career-job-icon">
                <BriefcaseBusiness size={26} />
              </div>

              <div className="career-job-title-area">
                <span className="career-job-status">
                  OPEN POSITION
                </span>

                <h3>
                  Business Development Executive
                </h3>

                <div className="career-job-meta">

                  <span>
                    <MapPin size={16} />
                    Noida, Uttar Pradesh
                  </span>

                  <span>
                    <Clock3 size={16} />
                    Full-time
                  </span>

                  <span>
                    <GraduationCap size={16} />
                    Graduate
                  </span>

                </div>
              </div>

            </div>

            <div className="career-job-description">

              <p>
                Join Leap Learning as a Business Development Executive
                and work closely with prospective learners and clients
                throughout the admissions process.
              </p>

              <div className="career-job-details">

                <div>
                  <h4>Key Responsibilities</h4>

                  <ul>
                    <li>
                      <CheckCircle2 size={16} />
                      Communicate with prospective clients and applicants.
                    </li>

                    <li>
                      <CheckCircle2 size={16} />
                      Explain academic programs and relevant offerings.
                    </li>

                    <li>
                      <CheckCircle2 size={16} />
                      Conduct timely client follow-ups.
                    </li>

                    <li>
                      <CheckCircle2 size={16} />
                      Coordinate the admissions process with applicants.
                    </li>

                    <li>
                      <CheckCircle2 size={16} />
                      Work towards assigned sales and revenue targets.
                    </li>
                  </ul>
                </div>

                <div>
                  <h4>Requirements</h4>

                  <ul>
                    <li>
                      <CheckCircle2 size={16} />
                      Graduate in any discipline.
                    </li>

                    <li>
                      <CheckCircle2 size={16} />
                      Freshers are welcome to apply.
                    </li>

                    <li>
                      <CheckCircle2 size={16} />
                      Good verbal and written communication skills.
                    </li>

                    <li>
                      <CheckCircle2 size={16} />
                      Professional approach towards clients.
                    </li>

                    <li>
                      <CheckCircle2 size={16} />
                      Willingness to learn and achieve targets.
                    </li>
                  </ul>
                </div>

              </div>

            </div>

            <div className="career-job-footer">

              <div className="career-job-summary">
                <span>
                  <strong>Experience:</strong> Fresher
                </span>

                <span>
                  <strong>Location:</strong> On-site
                </span>
              </div>

              <Link
                to="/careers/business-development-executive"
                className="career-apply-btn"
              >
                View Details & Apply
                <ArrowRight size={17} />
              </Link>

            </div>

          </article>

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="career-cta">
        <div className="career-container">

          <div className="career-cta-content">

            <span className="career-section-label">
              YOUR NEXT OPPORTUNITY
            </span>

            <h2>
              Ready to Take the Next Step?
            </h2>

            <p>
              Explore opportunities at Leap Learning and become part
              of a team focused on creating meaningful academic and
              professional experiences.
            </p>

            <Link to="/contact" className="career-cta-btn">
              Contact Leap Learning
              <ArrowRight size={18} />
            </Link>

          </div>

        </div>
      </section>

    </main>
  );
}

export default Career;