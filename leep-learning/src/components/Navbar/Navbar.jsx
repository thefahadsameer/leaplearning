// src/components/Navbar/Navbar.jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "../../assets/Media/Leap-removebg-preview.png";

function Navbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <>
      {/* TOP STRIP */}
      <div className="top-strip">
        <div className="top-strip-container">
          <span>Global Admissions Support</span>
          <span>Mon - Sat | 10 AM - 7 PM</span>
        </div>
      </div>

      {/* NAVBAR */}
      <header className="navbar">
        <div className="navbar-container">

          {/* LOGO */}
          <Link to="/" className="brand" onClick={closeMenu}>
            <img src={Logo} alt="Leap Learning" />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="desktop-nav">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/brochure">Programs</Link>
            <Link to="/contact">Contact</Link>
          </nav>

          {/* CTA */}
          <div className="desktop-action">
            <Link to="/apply" className="nav-btn">
              Apply Now
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          <button
            className={`menu-btn ${open ? "active" : ""}`}
            onClick={() => setOpen(!open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* MOBILE MENU */}
        <div className={`mobile-menu ${open ? "show" : ""}`}>
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/about" onClick={closeMenu}>About</Link>
          <Link to="/brochure" onClick={closeMenu}>Programs</Link>
          <Link to="/contact" onClick={closeMenu}>Contact</Link>

          <Link to="/apply" onClick={closeMenu} className="mobile-cta">
            Apply Now
          </Link>
        </div>
      </header>
    </>
  );
}

export default Navbar;