import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "../../assets/Media/Leap.jpg";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* LOGO */}
        <div className="navbar-logo">
          <Link to="/" onClick={closeMenu}>
            <img src={Logo} alt="Leap Learning Logo" />
          </Link>
        </div>

        {/* DESKTOP MENU */}
        <ul className="navbar-menu desktop">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/brochure">Course Brochure</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        {/* DESKTOP APPLY */}
        <div className="navbar-actions desktop">
          <Link className="btn-apply" to="/apply">
            Apply Now
          </Link>
        </div>

        {/* HAMBURGER */}
        <div
          className={`hamburger ${isOpen ? "active" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/about" onClick={closeMenu}>About Us</Link>
          <Link to="/brochure" onClick={closeMenu}>Course Brochure</Link>
          <Link to="/contact" onClick={closeMenu}>Contact</Link>

          <Link className="btn-apply mobile-apply" to="/apply" onClick={closeMenu}>
            Apply Now
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
