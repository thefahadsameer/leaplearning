import "./Hero.css";
import heroBg from "../../assets/Media/pexels-pixabay-159775.jpg";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero" style={{ backgroundImage: `url(${heroBg})` }}>
      <div className="hero-overlay">
        <div className="hero-container">
          <div className="hero-content">
            <p className="hero-tagline">Trusted Academic Consulting</p>

            <h1>
              Accelerate Your <br />
              Academic Journey
            </h1>

            <p className="hero-description">
              Leap Learning connects ambitious scholars with structured academic
              pathways, expert mentorship, and institution-backed programs
              designed for measurable progress and long-term success.
            </p>

            <div className="hero-buttons">
              <Link to="/brochure" className="btn-primary">
                Explore Programs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
