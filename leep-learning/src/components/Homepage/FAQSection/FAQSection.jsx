// src/components/Homepage/FAQSection/FAQSection.jsx

import { useState } from "react";
import "./FAQSection.css";

function FAQSection() {
  const [active, setActive] = useState(0);

  const faqs = [
    {
      question: "What is a DBA degree?",
      answer:
        "A Doctor of Business Administration (DBA) is a prestigious doctoral qualification designed for senior professionals, executives, entrepreneurs, and leaders who want advanced business expertise with academic recognition.",
    },
    {
      question: "What is the difference between DBA and PhD?",
      answer:
        "A DBA focuses more on practical business leadership, executive strategy, and real-world decision making, while a PhD is often more research and academic theory oriented.",
    },
    {
      question: "Can working professionals apply for these programs?",
      answer:
        "Yes. Many programs are designed for busy professionals who want flexible pathways while continuing their careers and businesses.",
    },
    {
      question: "What is an Honorary Doctorate?",
      answer:
        "An Honorary Doctorate is a prestigious recognition awarded to individuals for exceptional achievements, leadership, innovation, philanthropy, or social contribution.",
    },
    {
      question: "Does Leap Learning support global applicants?",
      answer:
        "Yes. Leap Learning supports applicants from India and worldwide with expert guidance, program matching, documentation support, and admissions assistance.",
    },
    {
      question: "How can I apply?",
      answer:
        "Simply visit the Apply Now page, submit your details, and our admissions team will contact you with the best available pathways.",
    },
  ];

  const toggleFAQ = (index) => {
    setActive(active === index ? -1 : index);
  };

  return (
    <section className="faq-section">
      <div className="faq-container">

        <div className="faq-header">
          <p className="faq-tag">Frequently Asked Questions</p>

          <h2>
            Answers To Common <br />
            Questions
          </h2>

          <p>
            Everything professionals usually ask before starting
            their DBA, PhD or Honorary Doctorate journey.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((item, index) => (
            <div
              className={`faq-card ${
                active === index ? "active" : ""
              }`}
              key={index}
            >
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <span>{item.question}</span>
                <span className="faq-icon">
                  {active === index ? "−" : "+"}
                </span>
              </button>

              {active === index && (
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default FAQSection;