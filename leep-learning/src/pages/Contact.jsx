import { useState } from "react";
import "../styles/Contact.css";
import { MapPin, Mail, Clock, Phone } from "lucide-react";

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
      const res = await fetch("https://leaplearning.onrender.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

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
      alert("Server error");
    }
  };

  return (
    <div className="contact-page">

      {/* HERO */}
      <section className="contact-hero">
        <h1>Contact Our Support Team</h1>
        <p>Based in London, supporting students globally</p>
      </section>

      {/* MAIN */}
      <section className="contact-section">
        <div className="contact-container contact-grid">

          {/* LEFT SIDE */}
          <div className="contact-left">

            {/* LOCATION */}
            <div className="contact-card">
              <div className="icon-title">
                <MapPin size={20} />
                <h3>Office Location</h3>
              </div>
              <p>London, United Kingdom</p>
            </div>

            {/* EMAIL */}
            <div className="contact-card">
              <div className="icon-title">
                <Mail size={20} />
                <h3>Email</h3>
              </div>
              <p>support@leaplearning.co.in</p>
            </div>

            {/* PHONE */}
            <div className="contact-card">
              <div className="icon-title">
                <Phone size={20} />
                <h3>Phone</h3>
              </div>
              <p>+44 7428 278975</p>
            </div>

            {/* WORKING HOURS */}
            <div className="contact-card">
              <div className="icon-title">
                <Clock size={20} />
                <h3>Working Hours</h3>
              </div>
              <p>Mon - Sat | 10 AM - 7 PM</p>
            </div>

          </div>

          {/* FORM */}
          <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={handleSubmit}>

              <div className="form-group">
                <label>Name *</label>
                <input name="name" value={formData.name} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input name="email" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input name="phone" value={formData.phone} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Preferred Time</label>
                <select name="timeSlot" value={formData.timeSlot} onChange={handleChange}>
                  <option value="">Select Time</option>
                  <option>10 AM - 12 PM</option>
                  <option>12 PM - 2 PM</option>
                  <option>2 PM - 4 PM</option>
                </select>
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} />
              </div>

              <button type="submit" className="contact-btn">
                Submit Inquiry
              </button>

            </form>
          </div>

        </div>
      </section>

      {/* MAP */}
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

    </div>
  );
}

export default Contact;