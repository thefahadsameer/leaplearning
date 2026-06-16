// src/components/Homepage/Programs/Programs.jsx

import "./Programs.css";
import { Link } from "react-router-dom";

// ✅ ICONS
import { FaCalendarAlt } from "react-icons/fa";
import { MdOutlineComputer } from "react-icons/md";

// ✅ BACKGROUND
import AnimatedBackground from "../../Common/AnimatedBackground/AnimatedBackground";

// IMAGES
import dbaImg from "../../../assets/Media/Programs/dba.jpg";
import phdImg from "../../../assets/Media/Programs/PhD.jpg";
import honoraryImg from "../../../assets/Media/Programs/Honorary.jpg";
import dlitImg from "../../../assets/Media/Programs/D.Litt.jpg";
import postDocImg from "../../../assets/Media/Programs/Post Doctorate.jpg";
import professorshipImg from "../../../assets/Media/Programs/Professorship.jpg";

function Programs() {
  const items = [
    {
      title: "DBA Programs",
      duration: "12 Months",
      mode: "Online",
      rating: "4.7",
      image: dbaImg,
      route: "/programs/dba",
    },
    {
      title: "Honorary Doctorate",
      duration: "1-2 Months",
      mode: "Online",
      rating: "4.8",
      image: honoraryImg,
      route: "/programs/honorary-doctorate",
    },
    {
      title: "PhD Programs",
      duration: "6 Months",
      mode: "Online",
      rating: "4.6",
      image: phdImg,
      route: "/programs/phd",
    },
    {
      title: "Doctor of Literature (D.Litt)",
      duration: "6 Months",
      mode: "Online",
      rating: "4.5",
      image: dlitImg,
      route: "/programs/dlitt",
    },
    {
      title: "Post Doctorate",
      duration: "9 Months",
      mode: "Online",
      rating: "4.6",
      image: postDocImg,
      route: "/programs/post-doctorate",
    },
    {
      title: "Professorship",
      duration: "9 Months",
      mode: "Online",
      rating: "4.9",
      image: professorshipImg,
      route: "/programs/professorship",
    },
  ];

  return (
    <section className="programs-section">
      {/* ✅ ANIMATED BACKGROUND */}
      <AnimatedBackground />

      <div className="programs-container">
        <div className="programs-header">
          <span className="programs-badge">Our Programs</span>

          <h2>
            Professional Degree <br />
            For Global Working Professionals
          </h2>

          <p>
            Explore internationally focused programs tailored for career growth.
          </p>
        </div>

        <div className="programs-grid">
          {items.map((item, index) => (
            <div className="program-card" key={index}>
              <div className="program-image">
                <img src={item.image} alt={item.title} />

                <div className="program-badge">
                  In collaboration with University
                </div>
              </div>

              <div className="program-content">
                {/* ✅ ICONS INSTEAD OF EMOJI */}
                <div className="program-meta">
                  <span>
                    <FaCalendarAlt className="icon" /> {item.duration}
                  </span>
                  <span>
                    <MdOutlineComputer className="icon" /> {item.mode}
                  </span>
                </div>

                <h3>{item.title}</h3>

                <div className="program-rating">
                  ⭐⭐⭐⭐⭐ <span>{item.rating}</span>
                </div>

                <div className="program-actions">
                  <Link to="/apply" className="apply-btn">
                    Apply Now
                  </Link>
                  <Link to={item.route} className="secondary-btn">
                    Know More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Programs;
