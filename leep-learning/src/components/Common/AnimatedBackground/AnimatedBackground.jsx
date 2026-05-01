// src/components/Common/AnimatedBackground/AnimatedBackground.jsx

import "./AnimatedBackground.css";

function AnimatedBackground() {
  return (
    <div className="animated-bg-wrapper">
      <div className="bg-gradient"></div>

      <div className="bg-shape shape1"></div>
      <div className="bg-shape shape2"></div>
      <div className="bg-shape shape3"></div>
    </div>
  );
}

export default AnimatedBackground;