import "../styles/About.css";
import buildingImg from "../assets/Media/pexels-molnartamasphotography-14031189.jpg";

// ✅ NEW IMAGE IMPORT (for global section)
import globalImg from "../assets/Media/pexels-pixabay-159775.jpg";

function About() {
  return (
    <div className="about-page">

      {/* ===== HERO SECTION ===== */}
      <section 
        className="about-hero"
        style={{ backgroundImage: `url(${buildingImg})` }}
      >
        <div className="about-hero-overlay">
          <div className="about-container">
            <h1>Shaping Academic Futures With Confidence</h1>
            <p>
              A trusted educational consulting platform connecting ambitious
              scholars with globally aligned academic pathways.
            </p>
          </div>
        </div>
      </section>


      {/* ===== COMPANY INTRO ===== */}
      <section className="about-intro">
        <div className="about-container intro-grid">

          <div className="intro-left">
            <h2>Who We Are</h2>
            <p>
              Leap Learning is a forward-thinking educational consulting
              organization based in London, United Kingdom. We guide learners
              across India toward internationally recognized academic programs
              through structured planning and expert advisory support.
            </p>
            <p>
              We facilitate higher-education pathways - including PhD/Doctorate programs-through our partner intitutions, Kennedy University, Central Christian Universitiy and Euro Asian University.
            </p>
            <p>
              Driven by a mission to redifine 21st-century education, Leap Learning makes learning more accessible, flexible and personalized then even before.
            </p>
            <p>
              Established in 2018, Leap Learning has grown into a trusted education and career-guidance partner.
            </p>
          </div>

          <div className="intro-right">
            <div className="intro-card">
              <h3>Global Presence</h3>
              <p>Supporting scholars across multiple states in India.</p>
            </div>

            <div className="intro-card">
              <h3>Global University Network</h3>
              <p>Collaborations with internationally affiliated institutions.</p>
            </div>
          </div>

        </div>
      </section>


      {/* ===== GLOBAL SECTION (UPDATED IMAGE HERE) ===== */}
      <section className="about-global">
        <div className="about-container global-grid">

          <div className="global-text">
            <h2>Global Academic Journey</h2>
            <p>
              Leap Learning connects professionals with internationally
              recognized doctoral opportunities.
            </p>
            <p>
              From DBA and PhD to Honorary Doctorate and Post Doctorate,
              we help individuals achieve academic milestones that elevate
              their global standing.
            </p>
          </div>

          {/* IMAGE ADDED HERE */}
          <div className="global-image">
            <img src={globalImg} alt="Global Education" />
          </div>

        </div>
      </section>


      {/* ===== MISSION & VISION ===== */}
      <section className="about-mission">
        <div className="about-container mission-grid">

          <div className="mission-card">
            <h3>Our Mission</h3>
            <p>
              To simplify complex academic decisions through structured
              guidance, transparent processes, and institution-backed support.
            </p>
          </div>

          <div className="mission-card">
            <h3>Our Vision</h3>
            <p>
              To become India’s most trusted academic consulting partner
              connecting learners with global educational excellence.
            </p>
          </div>

        </div>
      </section>


      {/* ===== CTA SECTION ===== */}
      <section className="about-cta">
        <div className="about-container">
          <h2>Begin Your Academic Journey Today</h2>
          <p>
            Connect with our advisory team to explore structured,
            globally aligned academic journeys.
          </p>
        </div>
      </section>

    </div>
  );
}

export default About;