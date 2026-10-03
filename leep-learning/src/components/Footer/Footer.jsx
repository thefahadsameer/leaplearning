// src/components/Footer/Footer.jsx

import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const handleCRMPortal = () => {
    window.open(
      "https://leapcrm.vercel.app/",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <footer className="footer">

      <div className="footer-top-line"></div>

      <div className="footer-container">

        {/* =================================================
            BRAND
            ================================================= */}

        <div className="footer-col brand-col">

          <h3>Leap Learning</h3>

          <p>
            Premium academic consulting platform helping global
            professionals pursue DBA, PhD and Honorary Doctorate
            pathways with trusted guidance.
          </p>

          <div className="footer-badges">
            <span>Global Access</span>
            <span>Expert Support</span>
          </div>

        </div>


        {/* =================================================
            QUICK LINKS
            ================================================= */}

        <div className="footer-col">

          <h4>Quick Links</h4>

          <Link to="/">Home</Link>

          <Link to="/about">About Us</Link>

          <Link to="/brochure">Programs</Link>

          <Link to="/contact">Contact</Link>

          <Link to="/apply">Apply Now</Link>

        </div>


        {/* =================================================
            PORTALS
            ================================================= */}

        <div className="footer-col">

          <h4>Portals</h4>

          <Link to="/login">
            Student Portal
          </Link>

          <button
            type="button"
            className="footer-link-button"
            onClick={handleCRMPortal}
          >
            CRM Portal
          </button>

        </div>


        {/* =================================================
            CONTACT
            ================================================= */}

        <div className="footer-col">

          <h4>Contact</h4>

          <p>admissions@leaplearning.co.in</p>

          <p>Mon - Sat | 10 AM - 7 PM</p>

          <p>Global Admissions Support</p>

          <p>
            10 Winterslow Rd, London, United Kingdom
          </p>

        </div>

      </div>


      {/* =================================================
          LEGAL LINKS
          ================================================= */}

      <div className="footer-legal">

        <Link to="/terms-and-conditions">
          Terms &amp; Conditions
        </Link>

        <span className="footer-legal-divider">|</span>

        <Link to="/refund-policy">
          Refund Policy
        </Link>

      </div>


      {/* =================================================
          COPYRIGHT
          ================================================= */}

      <div className="footer-bottom">
        © {new Date().getFullYear()} Leap Learning. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;