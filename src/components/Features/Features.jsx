import "./Features.css";

function Features() {
  return (
    <section className="features-section">
      <div className="features-container">

        <h2>
          Build Your Academic Future <br />
          With Confidence
        </h2>

        <p className="features-subtext">
          Our consulting framework is designed to simplify complex academic
          decisions and guide learners toward institution-approved pathways
          with clarity, structure, and accountability.
        </p>

        <div className="features-cards">

          <div className="feature-card">
            <div className="feature-icon">01</div>
            <h3>Guided Program Planning</h3>
            <p>
              Structured consultation to define clear academic goals and map
              institution-aligned pathways tailored to your background.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">02</div>
            <h3>Institutional Coordination</h3>
            <p>
              Direct engagement with recognized institutions to ensure smooth
              documentation, alignment, and academic validation.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">03</div>
            <h3>Accelerated Academic Pathways</h3>
            <p>
              Optimized processes that reduce unnecessary delays while
              maintaining institutional compliance and standards.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">04</div>
            <h3>Ongoing Expert Support</h3>
            <p>
              Continuous advisory guidance to ensure clarity, confidence,
              and milestone tracking throughout your journey.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Features;
