// src/components/Homepage/Testimonials/Testimonials.jsx

import "./Testimonials.css";

function Testimonials() {
  const reviews = [
    {
      name: "Rahul Sharma",
      role: "Business Professional, India",
      text:
        "Leap Learning helped me understand the right DBA pathway clearly. Their guidance was professional and smooth.",
    },
    {
      name: "Ahmed Kareem",
      role: "Entrepreneur, UAE",
      text:
        "The support team was responsive and transparent throughout the process. Highly recommended for busy professionals.",
    },
    {
      name: "Grace Mensah",
      role: "Senior Manager, Africa",
      text:
        "I appreciated the structured communication and premium level assistance from start to finish.",
    },
  ];

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">

        <div className="testimonials-header">
          <span className="testimonials-badge">Client Success</span>

          <h2>
            Trusted By Ambitious <br />
            Professionals Worldwide
          </h2>

          <p>
            Real experiences from individuals who chose Leap Learning
            for growth, recognition, and guidance.
          </p>
        </div>

        <div className="testimonials-grid">
          {reviews.map((item, index) => (
            <div className="testimonial-card" key={index}>
              <div className="quote-mark">“</div>

              <p className="testimonial-text">{item.text}</p>

              <h3>{item.name}</h3>

              <span>{item.role}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Testimonials;