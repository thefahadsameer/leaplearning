import { useState } from "react";
import Swal from "sweetalert2";
import "./Apply.css";

function Apply() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    qualification: "",
    field: "",
    year: "",
    institution: "",
    program: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateStep = () => {
    let newErrors = {};

    if (currentStep === 1) {
      if (!formData.fullName) newErrors.fullName = true;
      if (!formData.email) newErrors.email = true;
      if (!formData.phone) newErrors.phone = true;
      if (!formData.address) newErrors.address = true;
    }

    if (currentStep === 2) {
      if (!formData.qualification) newErrors.qualification = true;
      if (!formData.field) newErrors.field = true;
      if (!formData.year) newErrors.year = true;
      if (!formData.institution) newErrors.institution = true;
    }

    if (currentStep === 3) {
      if (!formData.program) newErrors.program = true;
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://leaplearning.onrender.com/api/applications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Application submission failed");
      }

      await Swal.fire({
        icon: "success",
        title: "Application Submitted Successfully",
        html: `
        <div style="font-size:15px">
          Thank you for applying with <b>Leap Learning</b>.<br><br>
          Our academic advisor will review your application and contact you within 24–48 hours.
        </div>
      `,
        confirmButtonText: "Continue",
        confirmButtonColor: "#f59e0b",
        allowOutsideClick: false,
      });

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        qualification: "",
        field: "",
        year: "",
        institution: "",
        program: "",
      });

      setErrors({});
      setCurrentStep(1);
    } catch (error) {
      console.error("APPLICATION SUBMIT ERROR:", error);

      await Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.message || "Failed to submit application.",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="apply-page">
      <div className="apply-container">
        <div className="apply-header">
          <h1>Apply for Academic Guidance</h1>

          <p>
            Start your academic journey with expert consultation and
            institution-aligned pathways designed for confident outcomes.
          </p>
        </div>

        <div className="apply-progress">
          <div className={`step ${currentStep === 1 ? "active" : ""}`}>
            1. Personal Info
          </div>

          <div className={`step ${currentStep === 2 ? "active" : ""}`}>
            2. Academic Background
          </div>

          <div className={`step ${currentStep === 3 ? "active" : ""}`}>
            3. Program Interest
          </div>
        </div>

        {currentStep === 1 && (
          <div className="apply-section">
            <h2>Personal Information</h2>

            <div className="form-grid">
              <input
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className={errors.fullName ? "error" : ""}
              />

              <input
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
              />

              <input
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? "error" : ""}
              />

              <input
                name="address"
                placeholder="Current Address"
                value={formData.address}
                onChange={handleChange}
                className={`form-full ${errors.address ? "error" : ""}`}
              />
            </div>

            <div className="apply-submit">
              <button onClick={handleNext}>Next</button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="apply-section">
            <h2>Academic Background</h2>

            <div className="form-grid">
              <input
                name="qualification"
                placeholder="Highest Qualification"
                value={formData.qualification}
                onChange={handleChange}
                className={errors.qualification ? "error" : ""}
              />

              <input
                name="field"
                placeholder="Field of Study"
                value={formData.field}
                onChange={handleChange}
                className={errors.field ? "error" : ""}
              />

              <input
                name="year"
                placeholder="Year of Completion"
                value={formData.year}
                onChange={handleChange}
                className={errors.year ? "error" : ""}
              />

              <input
                name="institution"
                placeholder="Institution Name"
                value={formData.institution}
                onChange={handleChange}
                className={`form-full ${errors.institution ? "error" : ""}`}
              />
            </div>

            <div className="apply-submit">
              <button onClick={handleNext}>Next</button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="apply-section">
            <h2>Program Interest</h2>

            <select
              name="program"
              value={formData.program}
              onChange={handleChange}
              className={`form-full ${errors.program ? "error" : ""}`}
            >
              <option value="">Select Program Type</option>

              <option>Doctorate of Philosophy (PhD)</option>

              <option>Doctorate of Business Administration (DBA)</option>

              <option>Honorary Doctorate Program</option>

              <option>Post Doctorate Program</option>
            </select>

            <div className="apply-submit">
              <button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting
                  ? "Submitting..."
                  : "Submit Application & Request Consultation"}
              </button>
            </div>
          </div>
        )}

        <p className="apply-note">
          Our academic advisor will contact you within 24–48 hours.
        </p>
      </div>
    </div>
  );
}

export default Apply;
