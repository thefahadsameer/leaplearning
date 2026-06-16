// src/components/Navbar/Navbar.jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "../../assets/Media/Leap-removebg-preview.png";
import { MdKeyboardArrowDown } from "react-icons/md";

const [programsOpen, setProgramsOpen] = useState(false);

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

            <div className="programs-dropdown">
              <span className="dropdown-trigger">
                Programs
                <MdKeyboardArrowDown className="dropdown-icon" />
              </span>

              <div className="dropdown-menu">
                <Link to="/programs/phd">PhD Programs</Link>

                <Link to="/programs/dba">DBA Programs</Link>

                <Link to="/programs/honorary-doctorate">
                  Honorary Doctorate
                </Link>

                <Link to="/programs/post-doctorate">Post Doctorate</Link>

                <Link to="/programs/dlitt">Doctor of Literature (D.Litt)</Link>

                <Link to="/programs/professorship">Professorship</Link>
              </div>
            </div>

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
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>

          <Link to="/about" onClick={closeMenu}>
            About
          </Link>

          <div className="mobile-programs">
            <button
              className="mobile-programs-toggle"
              onClick={() => setProgramsOpen(!programsOpen)}
            >
              <span>Programs</span>

              <MdKeyboardArrowDown
                className={`mobile-program-icon ${
                  programsOpen ? "rotate" : ""
                }`}
              />
            </button>

            {programsOpen && (
              <div className="mobile-program-links">
                <Link to="/programs/phd" onClick={closeMenu}>
                  PhD Programs
                </Link>

                <Link to="/programs/dba" onClick={closeMenu}>
                  DBA Programs
                </Link>

                <Link to="/programs/honorary-doctorate" onClick={closeMenu}>
                  Honorary Doctorate
                </Link>

                <Link to="/programs/post-doctorate" onClick={closeMenu}>
                  Post Doctorate
                </Link>

                <Link to="/programs/dlitt" onClick={closeMenu}>
                  Doctor of Literature (D.Litt)
                </Link>

                <Link to="/programs/professorship" onClick={closeMenu}>
                  Professorship
                </Link>
              </div>
            )}
          </div>

          <Link to="/contact" onClick={closeMenu}>
            Contact
          </Link>

          <Link to="/apply" onClick={closeMenu} className="mobile-cta">
            Apply Now
          </Link>
        </div>
      </header>
    </>
  );
}

export default Navbar;
