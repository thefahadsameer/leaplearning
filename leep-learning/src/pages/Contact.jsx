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

    console.log("🚀 Submitting form:", formData);

    try {
      const res = await fetch("https://leaplearning.onrender.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("📡 Response status:", res.status);

      const data = await res.json();
      console.log("📦 Response data:", data);

      if (data.success) {
        alert("✅ Inquiry submitted successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          timeSlot: "",
          message: "",
        });
      } else {
        alert("❌ Submission failed");
      }

    } catch (err) {
      console.error("❌ Frontend Error:", err);
      alert("Server error");
    }
  };

  return (
    <div className="contact-page">

      <section className="contact-hero">
        <div className="contact-container">
          <h1>Get In Touch With Our Advisory Team</h1>
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-container contact-grid">

          <div className="contact-info">
            <h2>Contact Information</h2>
            <p>Noida, India</p>
          </div>

          <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={handleSubmit}>

              <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
              <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
              <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />

              <select name="timeSlot" value={formData.timeSlot} onChange={handleChange}>
                <option value="">Select Time</option>
                <option>10 AM - 12 PM</option>
              </select>

              <textarea name="message" value={formData.message} onChange={handleChange} />

              <button type="submit">Submit</button>

            </form>
          </div>

        </div>
      </section>
    </div>
  );
}

export default Contact;