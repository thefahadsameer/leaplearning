// src/components/Footer/Footer.jsx

import { useNavigate } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const navigate = useNavigate();

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

          <p onClick={() => navigate("/")}>Home</p>
          <p onClick={() => navigate("/about")}>About Us</p>
          <p onClick={() => navigate("/brochure")}>Programs</p>
          <p onClick={() => navigate("/contact")}>Contact</p>
          <p onClick={() => navigate("/apply")}>Apply Now</p>

          <p
            className="footer-legal-link"
            onClick={() => navigate("/terms-and-conditions")}
          >
            Terms &amp; Conditions
          </p>
        </div>


        {/* =================================================
            PORTALS
            ================================================= */}
        <div className="footer-col">
          <h4>Portals</h4>

          <p onClick={() => navigate("/login")}>
            Student Portal
          </p>

          <p onClick={handleCRMPortal}>
            CRM Portal
          </p>
        </div>


        {/* =================================================
            CONTACT
            ================================================= */}
        <div className="footer-col">
          <h4>Contact</h4>

          <p>admissions@leaplearning.co.in</p>
          <p>Mon - Sat | 10 AM - 7 PM</p>
          <p>Global Admissions Support</p>
          <p>10 Winterslow Rd, London, United Kingdom</p>
        </div>

      </div>


      {/* =================================================
          FOOTER BOTTOM
          ================================================= */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} Leap Learning. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;