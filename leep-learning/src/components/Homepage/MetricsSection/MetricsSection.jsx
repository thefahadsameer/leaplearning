// src/components/Homepage/MetricsSection/MetricsSection.jsx

import { useEffect, useRef, useState } from "react";
import "./MetricsSection.css";

function Counter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const [start, setStart] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true);
        }
      },
      { threshold: 0.45 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!start) return;

    let current = 0;
    const duration = 1800;
    const stepTime = 20;
    const increment = target / (duration / stepTime);

    const timer = setInterval(() => {
      current += increment;

      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      setCount(Math.floor(current));
    }, stepTime);

    return () => clearInterval(timer);
  }, [start, target]);

  return (
    <h3 ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </h3>
  );
}

function MetricsSection() {
  const stats = [
    {
      number: 10000,
      suffix: "+",
      label: "Professionals Guided",
    },
    {
      number: 35,
      suffix: "+",
      label: "Countries Reached",
    },
    {
      number: 120,
      suffix: "+",
      label: "Programs Offered",
    },
    {
      number: 92,
      suffix: "%",
      label: "Client Satisfaction",
    },
  ];

  return (
    <section className="metrics-section">
      <div className="metrics-container">

        <div className="metrics-header">
          <p className="metrics-tag">Global Performance</p>

          <h2>
            Trusted Results <br />
            Backed By Growth
          </h2>

          <p>
            Leap Learning supports ambitious professionals worldwide
            with premium academic pathways and measurable success.
          </p>
        </div>

        <div className="metrics-grid">
          {stats.map((item, index) => (
            <div className="metric-card" key={index}>
              <span className="metric-line"></span>

              <Counter
                target={item.number}
                suffix={item.suffix}
              />

              <p>{item.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default MetricsSection;