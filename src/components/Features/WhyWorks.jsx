import "./WhyWorks.css";

function WhyWorks() {
  return (
    <section className="why-section">
      <div className="why-container">

        <div className="why-header">
          <h2>
            A Smarter Way To <br />
            Achieve Academic Milestones
          </h2>
          <p>
            Our structured academic model ensures clarity, institutional alignment,
            and measurable progress at every stage of your journey.
          </p>
        </div>

        <div className="why-grid">

          <div className="why-card">
            <div className="why-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 2v20M2 12h20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>Structured Guidance</h3>
            <p>
              Clear academic planning eliminates confusion and reduces delays
              caused by fragmented or unverified information.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M16 11a4 4 0 10-8 0 4 4 0 008 0zM2 20c1-4 5-6 10-6s9 2 10 6"
                  stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>Pre-Aligned Institutions</h3>
            <p>
              Programs are aligned with institutions beforehand, ensuring
              smoother admissions and faster processing timelines.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2"/>
                <path d="M12 7v5l3 3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>Time-Optimized Pathways</h3>
            <p>
              Academic routes are designed to minimize unnecessary steps while
              maintaining strict institutional standards.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 3l7 4v5c0 5-7 9-7 9s-7-4-7-9V7l7-4z"
                  stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>Outcome-Focused Support</h3>
            <p>
              Continuous oversight ensures learners stay aligned with their
              academic goals from start to successful completion.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default WhyWorks;
