// src/components/Footer/Footer.jsx

import { useNavigate } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const navigate = useNavigate();

  const handleAdminAccess = () => {
    navigate("/admin/login");
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
            <span> Expert Support</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4>Quick Links</h4>

          <p onClick={() => navigate("/")}>Home</p>
          <p onClick={() => navigate("/about")}>About Us</p>
          <p onClick={() => navigate("/brochure")}>Programs</p>
          <p onClick={() => navigate("/contact")}>Contact</p>
          <p onClick={() => navigate("/apply")}>Apply Now</p>
        </div>

        {/* Portals */}
        <div className="footer-col">
          <h4>Portals</h4>

          <p onClick={() => navigate("/login")}>Student Portal</p>

          <p onClick={() => navigate("/employee/login")}>
            Employee Portal
          </p>

          <p
            className="admin-link"
            onDoubleClick={handleAdminAccess}
            title="Authorized Access Only"
          >
            Admin Access
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
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Leap Learning. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;