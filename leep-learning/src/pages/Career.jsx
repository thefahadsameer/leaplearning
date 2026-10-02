// src/pages/Career.jsx

import { useEffect, useState } from "react";
import "../styles/Career.css";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import {
  BriefcaseBusiness,
  GraduationCap,
  TrendingUp,
  Users,
  Clock3,
  ArrowRight,
  CheckCircle2,
  X,
  Upload,
  FileText,
  Image as ImageIcon,
} from "lucide-react";

function Career() {
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [cvFile, setCvFile] = useState(null);

  useEffect(() => {
    if (showApplicationModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showApplicationModal]);

  const openApplicationModal = () => {
    setSubmitMessage("");
    setSubmitError("");
    setShowApplicationModal(true);
  };

  const closeApplicationModal = () => {
    if (submitting) return;

    setShowApplicationModal(false);
    setSubmitMessage("");
    setSubmitError("");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      setPhotoFile(null);
      return;
    }

    const maxSize = 10 * 1024 * 1024;

    if (file.size > maxSize) {
      setSubmitError("Passport photo must not exceed 10 MB.");
      event.target.value = "";
      setPhotoFile(null);
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];

    if (!allowedTypes.includes(file.type)) {
      setSubmitError(
        "Please upload a JPG, JPEG, or PNG passport size photo.",
      );
      event.target.value = "";
      setPhotoFile(null);
      return;
    }

    setSubmitError("");
    setPhotoFile(file);
  };

  const handleCvChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      setCvFile(null);
      return;
    }

    const maxSize = 10 * 1024 * 1024;

    if (file.size > maxSize) {
      setSubmitError("CV must not exceed 10 MB.");
      event.target.value = "";
      setCvFile(null);
      return;
    }

    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      setSubmitError("Please upload your CV in PDF format only.");
      event.target.value = "";
      setCvFile(null);
      return;
    }

    setSubmitError("");
    setCvFile(file);
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      middleName: "",
      lastName: "",
      phone: "",
      email: "",
    });

    setPhotoFile(null);
    setCvFile(null);

    const photoInput = document.getElementById(
      "career-photo",
    );

    const cvInput = document.getElementById(
      "career-cv",
    );

    if (photoInput) {
      photoInput.value = "";
    }

    if (cvInput) {
      cvInput.value = "";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmitError("");
    setSubmitMessage("");

    if (!formData.firstName.trim()) {
      setSubmitError("Please enter your first name.");
      return;
    }

    if (!formData.lastName.trim()) {
      setSubmitError("Please enter your last name.");
      return;
    }

    if (!formData.phone.trim()) {
      setSubmitError("Please enter your phone number.");
      return;
    }

    if (!formData.email.trim()) {
      setSubmitError("Please enter your email address.");
      return;
    }

    if (!photoFile) {
      setSubmitError("Please upload your passport size photo.");
      return;
    }

    if (!cvFile) {
      setSubmitError("Please upload your CV in PDF format.");
      return;
    }

    setSubmitting(true);

    try {
      const submissionData = new FormData();

      submissionData.append(
        "firstName",
        formData.firstName.trim(),
      );

      submissionData.append(
        "middleName",
        formData.middleName.trim(),
      );

      submissionData.append(
        "lastName",
        formData.lastName.trim(),
      );

      submissionData.append(
        "phone",
        formData.phone.trim(),
      );

      submissionData.append(
        "email",
        formData.email.trim(),
      );

      submissionData.append(
        "photo",
        photoFile,
      );

      submissionData.append(
        "cv",
        cvFile,
      );

      const response = await fetch(
        "https://leaplearning.onrender.com/api/career/apply",
        {
          method: "POST",
          body: submissionData,
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error ||
            "Unable to submit your application. Please try again.",
        );
      }

      setSubmitMessage(
        "Your application has been submitted successfully. A confirmation email has been sent to your email address.",
      );

      resetForm();
    } catch (error) {
      console.error(
        "Career application error:",
        error,
      );

      setSubmitError(
        error.message ||
          "Something went wrong while submitting your application. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="career-page">

      {/* ================= HERO ================= */}

      <section className="career-hero">
        <div className="career-hero-overlay"></div>

        <div className="career-hero-content">
          <span className="career-eyebrow">
            CAREERS AT LEAP LEARNING
          </span>

          <h1>
            Build Your Career.
            <br />
            <span>Shape Your Future.</span>
          </h1>

          <p>
            Join a growing education and professional learning company
            where your skills, ideas, and ambition can make a meaningful
            difference.
          </p>

          <a
            href="#open-positions"
            className="career-hero-btn"
          >
            Explore Open Positions
            <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* ================= INTRO ================= */}

      <section className="career-intro">
        <div className="career-container">

          <div className="career-intro-heading">
            <span className="career-section-label">
              WORK WITH US
            </span>

            <h2>
              Grow With Leap Learning
            </h2>
          </div>

          <div className="career-intro-content">
            <p>
              At Leap Learning, we believe that great work starts with
              great people. Our team works across education, admissions,
              business development, client relations, technology, and
              business operations.
            </p>

            <p>
              We are building a professional and growth-oriented
              environment where individuals can develop their skills,
              take ownership of their responsibilities, and contribute
              to the continued growth of the organization.
            </p>
          </div>

        </div>
      </section>

      {/* ================= WHY JOIN ================= */}

      <section className="career-benefits">
        <div className="career-container">

          <div className="career-section-heading">
            <span className="career-section-label">
              WHY LEAP LEARNING
            </span>

            <h2>
              More Than Just a Job
            </h2>

            <p>
              Build professional experience while working in a
              collaborative and growth-focused environment.
            </p>
          </div>

          <div className="career-benefit-grid">

            <div className="career-benefit-card">
              <div className="career-benefit-icon">
                <TrendingUp size={25} />
              </div>

              <h3>Career Growth</h3>

              <p>
                Develop practical skills and take on opportunities
                that support your professional growth.
              </p>
            </div>

            <div className="career-benefit-card">
              <div className="career-benefit-icon">
                <GraduationCap size={25} />
              </div>

              <h3>Continuous Learning</h3>

              <p>
                Learn through real-world responsibilities, guidance,
                collaboration, and hands-on experience.
              </p>
            </div>

            <div className="career-benefit-card">
              <div className="career-benefit-icon">
                <Users size={25} />
              </div>

              <h3>Collaborative Environment</h3>

              <p>
                Work with a team where communication, accountability,
                and professional collaboration matter.
              </p>
            </div>

            <div className="career-benefit-card">
              <div className="career-benefit-icon">
                <BriefcaseBusiness size={25} />
              </div>

              <h3>Meaningful Work</h3>

              <p>
                Contribute to services that connect learners with
                academic and professional opportunities.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= OPEN POSITIONS ================= */}

      <section
        className="career-openings"
        id="open-positions"
      >
        <div className="career-container">

          <div className="career-section-heading career-openings-heading">
            <span className="career-section-label">
              CURRENT OPPORTUNITIES
            </span>

            <h2>
              Open Positions
            </h2>

            <p>
              Explore our current opportunities and find a role that
              matches your skills and career goals.
            </p>
          </div>

          {/* ================= JOB CARD ================= */}

          <article className="career-job-card">

            <div className="career-job-main">

              <div className="career-job-icon">
                <BriefcaseBusiness size={26} />
              </div>

              <div className="career-job-title-area">
                <span className="career-job-status">
                  OPEN POSITION
                </span>

                <h3>
                  Business Development Executive
                </h3>

                <div className="career-job-meta">

                  <span>
                    <Clock3 size={16} />
                    Full-time
                  </span>

                  <span>
                    <GraduationCap size={16} />
                    Graduate
                  </span>

                </div>
              </div>

            </div>

            <div className="career-job-description">

              <p>
                Join Leap Learning as a Business Development Executive
                and work closely with prospective learners and clients
                throughout the admissions process.
              </p>

              <div className="career-job-details">

                <div>
                  <h4>Key Responsibilities</h4>

                  <ul>
                    <li>
                      <CheckCircle2 size={16} />
                      Communicate with prospective clients and applicants.
                    </li>

                    <li>
                      <CheckCircle2 size={16} />
                      Explain academic programs and relevant offerings.
                    </li>

                    <li>
                      <CheckCircle2 size={16} />
                      Conduct timely client follow-ups.
                    </li>

                    <li>
                      <CheckCircle2 size={16} />
                      Coordinate the admissions process with applicants.
                    </li>

                    <li>
                      <CheckCircle2 size={16} />
                      Work towards assigned sales and revenue targets.
                    </li>
                  </ul>
                </div>

                <div>
                  <h4>Requirements</h4>

                  <ul>
                    <li>
                      <CheckCircle2 size={16} />
                      Graduate in any discipline.
                    </li>

                    <li>
                      <CheckCircle2 size={16} />
                      Freshers are welcome to apply.
                    </li>

                    <li>
                      <CheckCircle2 size={16} />
                      Good verbal and written communication skills.
                    </li>

                    <li>
                      <CheckCircle2 size={16} />
                      Professional approach towards clients.
                    </li>

                    <li>
                      <CheckCircle2 size={16} />
                      Willingness to learn and achieve targets.
                    </li>
                  </ul>
                </div>

              </div>

            </div>

            <div className="career-job-footer">

              <div className="career-job-summary">
                <span>
                  <strong>Experience:</strong> Fresher
                </span>
              </div>

              <button
                type="button"
                className="career-apply-btn"
                onClick={openApplicationModal}
              >
                View Details & Apply
                <ArrowRight size={17} />
              </button>

            </div>

          </article>

        </div>
      </section>

      {/* ================= CTA ================= */}

      <section className="career-cta">
        <div className="career-container">

          <div className="career-cta-content">

            <span className="career-section-label">
              YOUR NEXT OPPORTUNITY
            </span>

            <h2>
              Ready to Take the Next Step?
            </h2>

            <p>
              Explore opportunities at Leap Learning and become part
              of a team focused on creating meaningful academic and
              professional experiences.
            </p>

            <Link
              to="/contact"
              className="career-cta-btn"
            >
              Contact Leap Learning
              <ArrowRight size={18} />
            </Link>

          </div>

        </div>
      </section>

      {/* =========================================================
         APPLICATION MODAL
         ========================================================= */}

      {showApplicationModal && (
        <div
          className="career-modal-overlay"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget &&
              !submitting
            ) {
              closeApplicationModal();
            }
          }}
        >
          <div className="career-application-modal">

            {/* ================= MODAL HEADER ================= */}

            <div className="career-modal-header">
              <div>
                <span className="career-modal-eyebrow">
                  JOB APPLICATION
                </span>

                <h2>
                  Business Development Executive
                </h2>

                <p>
                  Complete the form below to submit your application.
                </p>
              </div>

              <button
                type="button"
                className="career-modal-close"
                onClick={closeApplicationModal}
                disabled={submitting}
                aria-label="Close application form"
              >
                <X size={22} />
              </button>
            </div>

            {/* ================= FORM ================= */}

            <form
              className="career-application-form"
              onSubmit={handleSubmit}
            >

              <div className="career-form-grid">

                {/* FIRST NAME */}

                <div className="career-form-group">
                  <label htmlFor="career-first-name">
                    First Name <span>*</span>
                  </label>

                  <input
                    id="career-first-name"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter first name"
                    autoComplete="given-name"
                    required
                  />
                </div>

                {/* MIDDLE NAME */}

                <div className="career-form-group">
                  <label htmlFor="career-middle-name">
                    Middle Name
                    <small>Optional</small>
                  </label>

                  <input
                    id="career-middle-name"
                    type="text"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleInputChange}
                    placeholder="Enter middle name"
                    autoComplete="additional-name"
                  />
                </div>

                {/* LAST NAME */}

                <div className="career-form-group">
                  <label htmlFor="career-last-name">
                    Last Name <span>*</span>
                  </label>

                  <input
                    id="career-last-name"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter last name"
                    autoComplete="family-name"
                    required
                  />
                </div>

                {/* PHONE */}

                <div className="career-form-group career-phone-group">
                  <label>
                    Phone Number <span>*</span>
                  </label>

                  <PhoneInput
                    country="in"
                    value={formData.phone}
                    onChange={(phone) =>
                      setFormData((previous) => ({
                        ...previous,
                        phone,
                      }))
                    }
                    enableSearch
                    countryCodeEditable={false}
                    inputProps={{
                      name: "phone",
                      required: true,
                      autoComplete: "tel",
                    }}
                    containerClass="career-phone-container"
                    inputClass="career-phone-input"
                    buttonClass="career-phone-button"
                    dropdownClass="career-phone-dropdown"
                  />
                </div>

              </div>

              {/* EMAIL */}

              <div className="career-form-group">
                <label htmlFor="career-email">
                  Email ID <span>*</span>
                </label>

                <input
                  id="career-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  autoComplete="email"
                  required
                />
              </div>

              {/* FILE UPLOADS */}

              <div className="career-file-grid">

                {/* PHOTO */}

                <div className="career-file-group">
                  <label>
                    Passport Size Photo <span>*</span>
                  </label>

                  <label
                    htmlFor="career-photo"
                    className={`career-file-upload ${
                      photoFile
                        ? "career-file-selected"
                        : ""
                    }`}
                  >
                    <input
                      id="career-photo"
                      type="file"
                      accept="image/jpeg,image/jpg,image/png"
                      onChange={handlePhotoChange}
                    />

                    {photoFile ? (
                      <>
                        <ImageIcon size={22} />

                        <div>
                          <strong>
                            {photoFile.name}
                          </strong>

                          <small>
                            {(photoFile.size / 1024 / 1024).toFixed(2)} MB
                          </small>
                        </div>
                      </>
                    ) : (
                      <>
                        <Upload size={22} />

                        <div>
                          <strong>
                            Upload Passport Photo
                          </strong>

                          <small>
                            JPG, JPEG or PNG • Maximum 10 MB
                          </small>
                        </div>
                      </>
                    )}
                  </label>
                </div>

                {/* CV */}

                <div className="career-file-group">
                  <label>
                    Attach CV <span>*</span>
                  </label>

                  <label
                    htmlFor="career-cv"
                    className={`career-file-upload ${
                      cvFile
                        ? "career-file-selected"
                        : ""
                    }`}
                  >
                    <input
                      id="career-cv"
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={handleCvChange}
                    />

                    {cvFile ? (
                      <>
                        <FileText size={22} />

                        <div>
                          <strong>
                            {cvFile.name}
                          </strong>

                          <small>
                            {(cvFile.size / 1024 / 1024).toFixed(2)} MB
                          </small>
                        </div>
                      </>
                    ) : (
                      <>
                        <FileText size={22} />

                        <div>
                          <strong>
                            Upload CV
                          </strong>

                          <small>
                            PDF only • Maximum 10 MB
                          </small>
                        </div>
                      </>
                    )}
                  </label>
                </div>

              </div>

              {/* ERROR */}

              {submitError && (
                <div className="career-form-error">
                  {submitError}
                </div>
              )}

              {/* SUCCESS */}

              {submitMessage && (
                <div className="career-form-success">
                  {submitMessage}
                </div>
              )}

              {/* SUBMIT */}

              <div className="career-form-actions">

                <button
                  type="submit"
                  className="career-submit-btn"
                  disabled={submitting}
                >
                  {submitting
                    ? "Submitting Application..."
                    : "Apply"}

                  {!submitting && (
                    <ArrowRight size={18} />
                  )}
                </button>

              </div>

            </form>

          </div>
        </div>
      )}

    </main>
  );
}

export default Career;