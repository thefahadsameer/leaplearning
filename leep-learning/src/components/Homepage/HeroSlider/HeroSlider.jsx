import { useEffect, useState } from "react";
import "./HeroSlider.css";

import slide1 from "../../../assets/Media/graduation_horizontal.jpg";
import slide2 from "../../../assets/Media/Consultance.jpg";
import slide3 from "../../../assets/Media/Team.jpg";

function HeroSlider() {
  const slides = [
    {
      image: slide1,
      tag: "Global Academic Success",
      title: "Advance Your Career With DBA Programs",
      desc: "Executive Doctor of Business Administration programs designed for professionals seeking leadership growth.",
      btn: "Explore DBA",
    },
    {
      image: slide2,
      tag: "Recognized Doctoral Pathways",
      title: "Earn Your PhD With Expert Guidance",
      desc: "Structured doctoral programs with complete academic support from admission to completion.",
      btn: "View PhD Programs",
    },
    {
      image: slide3,
      tag: "Prestige Recognition",
      title: "Honorary Doctorate Opportunities",
      desc: "Celebrate leadership, impact, and achievements through distinguished honorary recognition pathways.",
      btn: "Learn More",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const auto = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(auto);
  }, [slides.length]);

  return (
    <section className="hero-slider">

      {/* 🔥 Animated Background Layer */}
      <div className="animated-bg">
        <span className="blob blob1"></span>
        <span className="blob blob2"></span>
        <span className="blob blob3"></span>
      </div>

      {slides.map((slide, index) => (
        <div
          key={index}
          className={index === current ? "slide active" : "slide"}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="hero-overlay">
            <div className="hero-content">
              <span>{slide.tag}</span>

              <h1>{slide.title}</h1>

              <p>{slide.desc}</p>

              <button>{slide.btn}</button>
            </div>
          </div>
        </div>
      ))}

      <div className="dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={i === current ? "dot active-dot" : "dot"}
            onClick={() => setCurrent(i)}
          ></button>
        ))}
      </div>
    </section>
  );
}

export default HeroSlider;