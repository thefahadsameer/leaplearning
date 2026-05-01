import "../styles/Contact.css";

function Contact() {
  return (
    <div className="contact-page">

      {/* ===== HERO ===== */}
      <section className="contact-hero">
        <div className="contact-container">
          <h1>Get In Touch With Our Advisory Team</h1>
          <p>
            Connect with us to explore structured academic pathways
            tailored to your goals.
          </p>
        </div>
      </section>


      {/* ===== MAIN SECTION ===== */}
      <section className="contact-section">
        <div className="contact-container contact-grid">

          {/* LEFT INFO */}
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


          {/* RIGHT FORM */}
          <div className="contact-form-wrapper">
            <form className="contact-form">

              <div className="form-group">
                <label>Full Name *</label>
                <input type="text" placeholder="Enter your full name" required />
              </div>

              <div className="form-group">
                <label>Email ID *</label>
                <input type="email" placeholder="Enter your email address" required />
              </div>

              <div className="form-group">
                <label>Phone Number (Optional)</label>
                <input type="tel" placeholder="Enter your phone number" />
              </div>

              <div className="form-group">
                <label>Preferred Time Slot</label>
                <select>
                  <option value="">Select a time slot</option>
                  <option>10:00 AM – 12:00 PM</option>
                  <option>12:00 PM – 2:00 PM</option>
                  <option>2:00 PM – 4:00 PM</option>
                  <option>4:00 PM – 6:00 PM</option>
                </select>
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea rows="4" placeholder="Write your message here..."></textarea>
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
