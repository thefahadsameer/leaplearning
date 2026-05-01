// src/components/Homepage/TrustSection/TrustSection.jsx

import "./TrustSection.css";

function TrustSection() {
  const items = [
    {
      title: "Global Recognition",
      desc: "Programs designed with international relevance for professionals worldwide.",
    },
    {
      title: "Expert Guidance",
      desc: "Dedicated advisors support you from consultation to final milestones.",
    },
    {
      title: "Fast Processing",
      desc: "Structured workflows help reduce delays and improve turnaround time.",
    },
    {
      title: "Dedicated Support",
      desc: "Responsive assistance for every step of your academic journey.",
    },
    {
      title: "Confidential Handling",
      desc: "Your documents and personal details are managed professionally.",
    },
    {
      title: "Career Growth Focus",
      desc: "Programs aligned with leadership, recognition, and advancement goals.",
    },
  ];

  return (
    <section className="trust-section">
      <div className="trust-container">

        <div className="trust-header">
          <span className="trust-badge">Why Leap Learning</span>

          <h2>
            Trusted Academic Solutions <br />
            For Serious Professionals
          </h2>

          <p>
            We combine guidance, speed, privacy, and global perspective
            to help you move forward confidently.
          </p>
        </div>

        <div className="trust-grid">
          {items.map((item, index) => (
            <div className="trust-card" key={index}>
              <div className="trust-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <h3>{item.title}</h3>

              <p>{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default TrustSection;