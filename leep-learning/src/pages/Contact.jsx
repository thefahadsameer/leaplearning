import { useState } from "react";
import "../styles/Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    timeSlot: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Sending data:", formData); // DEBUG

      const res = await fetch("https://leaplearning.onrender.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      console.log("Response:", data); // DEBUG

      if (data.success) {
        alert("Inquiry submitted successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          timeSlot: "",
          message: "",
        });
      } else {
        alert("Submission failed");
      }

    } catch (err) {
      console.error("Frontend Error:", err);
      alert("Server error");
    }
  };

  return (
    <div className="contact-page">

      <section className="contact-hero">
        <div className="contact-container">
          <h1>Get In Touch With Our Advisory Team</h1>
          <p>
            Connect with us to explore structured academic pathways
            tailored to your goals.
          </p>
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-container contact-grid">

          <div className="contact-info">
            <h2>Contact Information</h2>

            <div className="info-item">
              <h4>Office Location</h4>
              <p>Noida, Uttar Pradesh, India</p>
            </div>

            <div className="info-item">
              <h4>Email</h4>
              <p>admissions@leaplearning.co.in</p>
            </div>

            <div className="info-item">
              <h4>Working Hours</h4>
              <p>Monday – Saturday</p>
              <p>10:00 AM – 7:00 PM</p>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={handleSubmit}>

              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email ID *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Preferred Time Slot</label>
                <select
                  name="timeSlot"
                  value={formData.timeSlot}
                  onChange={handleChange}
                >
                  <option value="">Select a time slot</option>
                  <option>10:00 AM – 12:00 PM</option>
                  <option>12:00 PM – 2:00 PM</option>
                  <option>2:00 PM – 4:00 PM</option>
                  <option>4:00 PM – 6:00 PM</option>
                </select>
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className="contact-btn">
                Submit Inquiry
              </button>

            </form>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Contact;