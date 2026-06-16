import { useState } from "react";
import "../styles/Contact.css";
import { MapPin, Mail, Clock, Phone } from "lucide-react";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    timeSlot: "",
    message: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const timeOptions = [
    "10 AM - 10:30 AM",
    "10:30 AM - 11 AM",
    "11 AM - 11:30 AM",
    "11:30 AM - 12 PM",
    "12 PM - 12:30 PM",
    "12:30 PM - 1 PM",
    "1 PM - 1:30 PM",
    "1:30 PM - 2 PM",
    "2 PM - 2:30 PM",
    "2:30 PM - 3 PM",
    "3 PM - 3:30 PM",
    "3:30 PM - 4 PM",
    "4 PM - 4:30 PM",
    "4:30 PM - 5 PM",
    "5 PM - 5:30 PM",
    "5:30 PM - 6 PM",
    "6 PM - 6:30 PM",
    "6:30 PM - 7 PM",
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const res = await fetch("https://leaplearning.onrender.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitting(false);
        setShowSuccess(true);

        setFormData({
          name: "",
          email: "",
          phone: "",
          timeSlot: "",
          message: "",
        });
      } else {
        setSubmitting(false);
        alert("Submission failed");
      }
    } catch {
      setSubmitting(false);
      alert("Server error");
    }
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <h1>Contact Our Support Team</h1>
        <p>Based in London, supporting students globally</p>
      </section>

      <section className="contact-section">
        <div className="contact-container contact-grid">
          <div className="contact-left">
            <div className="contact-card">
              <div className="icon-title">
                <MapPin size={20} />
                <h3>Office Location</h3>
              </div>
              <p>London, United Kingdom</p>
            </div>

            <div className="contact-card">
              <div className="icon-title">
                <Mail size={20} />
                <h3>Email</h3>
              </div>
              <p>support@leaplearning.co.in</p>
            </div>

            <div className="contact-card">
              <div className="icon-title">
                <Phone size={20} />
                <h3>Phone</h3>
              </div>
              <p>+44 7428 278975</p>
            </div>

            <div className="contact-card">
              <div className="icon-title">
                <Clock size={20} />
                <h3>Working Hours</h3>
              </div>
              <p>Mon - Sat | 10 AM - 7 PM</p>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name *</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone</label>

                <PhoneInput
                  country={"gb"}
                  value={formData.phone}
                  onChange={(phone) =>
                    setFormData({
                      ...formData,
                      phone,
                    })
                  }
                  inputStyle={{
                    width: "100%",
                    height: "56px",
                    borderRadius: "14px",
                    border: "1px solid #dbe3ef",
                    background: "#ffffff",
                    fontSize: "15px",
                    paddingLeft: "58px",
                    color: "#0f172a",
                  }}
                  buttonStyle={{
                    borderTopLeftRadius: "14px",
                    borderBottomLeftRadius: "14px",
                    border: "1px solid #dbe3ef",
                    background: "#ffffff",
                  }}
                  containerStyle={{
                    width: "100%",
                  }}
                />
              </div>

              <div className="form-group">
                <label>Preferred Time</label>

                <select
                  name="timeSlot"
                  value={formData.timeSlot}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      timeSlot: e.target.value,
                    })
                  }
                >
                  <option value="">Select Time</option>

                  {timeOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Message</label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="contact-btn"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Inquiry"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="map-section">
        <iframe
          title="London Office"
          src="https://maps.google.com/maps?q=10%20Winterslow%20Rd,%20SW9%207RS,%20London&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="400"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
      </section>

      {showSuccess && (
        <div className="contact-success-overlay">
          <div className="contact-success-modal">
            <div className="success-check">✓</div>

            <h2>Inquiry Submitted Successfully</h2>

            <p>
              Thank you for reaching <strong>Leap Learning</strong>.
            </p>

            <p>Our support team will connect with you soon.</p>

            <button
              className="success-btn"
              onClick={() => setShowSuccess(false)}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contact;
