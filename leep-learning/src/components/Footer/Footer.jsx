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

  const handleFooterNavigation = (path) => {
    navigate(path);

    // Always start the destination page from the very top
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
  };

  return (
    <footer className="footer">
      <div className="footer-top-line"></div>

      <div className="footer-container">
        {/* Brand */}
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

        {/* Quick Links */}
        <div className="footer-col">
          <h4>Quick Links</h4>

          <p onClick={() => handleFooterNavigation("/")}>Home</p>

          <p onClick={() => handleFooterNavigation("/about")}>
            About Us
          </p>

          <p onClick={() => handleFooterNavigation("/brochure")}>
            Programs
          </p>

          <p onClick={() => handleFooterNavigation("/contact")}>
            Contact
          </p>

          <p onClick={() => handleFooterNavigation("/apply")}>
            Apply Now
          </p>
        </div>

        {/* Portals */}
        <div className="footer-col">
          <h4>Portals</h4>

          <p onClick={() => handleFooterNavigation("/login")}>
            Student Portal
          </p>

          <p onClick={handleCRMPortal}>
            CRM Portal
          </p>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4>Contact</h4>

          <p>admissions@leaplearning.co.in</p>
          <p>Mon - Sat | 10 AM - 7 PM</p>
          <p>Global Admissions Support</p>
          <p>10 Winterslow Rd, London, United Kingdom</p>
        </div>

        {/* Legal */}
        <div className="footer-col footer-legal-col">
          <h4>Legal</h4>

          <p
            onClick={() =>
              handleFooterNavigation("/terms-and-conditions")
            }
          >
            Terms &amp; Conditions
          </p>

          <p
            onClick={() =>
              handleFooterNavigation("/refund-policy")
            }
          >
            Refund Policy
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Leap Learning. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;