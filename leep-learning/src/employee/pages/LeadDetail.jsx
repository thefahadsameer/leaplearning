import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/leadDetail.css";

const API_URL = "https://leaplearning.onrender.com";

function LeadDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const sessionData = JSON.parse(localStorage.getItem("employeeSession") || "{}");
  const token = sessionData?.token;

  const [lead, setLead] = useState(null);
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    city: "",
    state: "",
    highest_education: "",
    working_professional: "",
    work_experience: "",
    program_interest: "",
    interested_topic: "",
    interested_specialization: "",
    id_document_url: ""
  });

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (id && token) {
      fetchLeadDetail();
    }
  }, [id, token]);

  const fetchLeadDetail = async () => {
    try {
      const res = await fetch(API_URL + "/api/leads/" + id, {
        headers: {
          Authorization: "Bearer " + token
        }
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch lead details");
      }

      setLead(data);

      setFormData({
        full_name: data.full_name || "",
        phone: data.phone || "",
        city: data.city || "",
        state: data.state || "",
        highest_education: data.highest_education || "",
        working_professional:
          data.working_professional === true
            ? "Yes"
            : data.working_professional === false
            ? "No"
            : "",
        work_experience: data.work_experience || "",
        program_interest: data.program_type || data.program_interest || "",
        interested_topic: data.interested_topic || "",
        interested_specialization: data.interested_specialization || "",
        id_document_url: data.id_document_url || ""
      });
    } catch (error) {
      console.error("Lead detail fetch error:", error);
      alert("Failed to load lead details.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const res = await fetch(API_URL + "/api/leads/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify({
          full_name: formData.full_name,
          phone: formData.phone,
          city: formData.city,
          state: formData.state,
          highest_education: formData.highest_education,
          program_type: formData.program_interest,
          working_professional:
            formData.working_professional === "Yes"
              ? true
              : formData.working_professional === "No"
              ? false
              : null,
          work_experience: formData.work_experience,
          interested_topic: formData.interested_topic,
          interested_specialization: formData.interested_specialization,
          id_document_url: formData.id_document_url
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update lead details");
      }

      await fetchLeadDetail();
      alert("Lead details updated successfully.");
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to update lead details.");
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      setUploading(true);

      const fileFormData = new FormData();
      fileFormData.append("document", file);

      const res = await fetch(API_URL + "/api/leads/" + id + "/upload-id", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token
        },
        body: fileFormData
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Upload failed");
      }

      setFormData((prev) => ({
        ...prev,
        id_document_url: data.fileUrl
      }));

      await fetchLeadDetail();
      alert("National ID document uploaded successfully.");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload document.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  if (!lead) {
    return (
      <div className="lead-detail-page">
        <div className="lead-detail-loading">Loading lead details...</div>
      </div>
    );
  }

  return (
    <div className="lead-detail-page">
      <div className="lead-detail-header">
        <div>
          <h1>Lead Full Details</h1>
          <p>View and update candidate details</p>
        </div>

        <button
          className="lead-back-btn"
          onClick={() => navigate("/employee/crm")}
        >
          Back to CRM
        </button>
      </div>

      <div className="lead-detail-card">
        <div className="lead-detail-grid">

          <div className="detail-field">
            <label>Full Name</label>
            <input
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Enter full name"
            />
          </div>

          <div className="detail-field">
            <label>Phone Number</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </div>

          <div className="detail-field">
            <label>City</label>
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
            />
          </div>

          <div className="detail-field">
            <label>State</label>
            <input
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter state"
            />
          </div>

          <div className="detail-field">
            <label>Highest Education</label>
            <input
              name="highest_education"
              value={formData.highest_education}
              onChange={handleChange}
              placeholder="Enter highest education"
            />
          </div>

          <div className="detail-field">
            <label>Interested Program</label>
            <input
              name="program_interest"
              value={formData.program_interest}
              onChange={handleChange}
              placeholder="Enter interested program"
            />
          </div>

          <div className="detail-field">
            <label>Working Professional</label>
            <select
              name="working_professional"
              value={formData.working_professional}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="detail-field">
            <label>Work Experience</label>
            <input
              name="work_experience"
              value={formData.work_experience}
              onChange={handleChange}
              placeholder="Enter work experience"
            />
          </div>

          <div className="detail-field detail-field-full">
            <label>Interested Topic</label>
            <input
              name="interested_topic"
              value={formData.interested_topic}
              onChange={handleChange}
              placeholder="Enter interested topic"
            />
          </div>

          <div className="detail-field detail-field-full">
            <label>Interested Specialization</label>
            <input
              name="interested_specialization"
              value={formData.interested_specialization}
              onChange={handleChange}
              placeholder="Enter interested specialization"
            />
          </div>

          <div className="detail-field detail-field-full">
            <label>National ID Document</label>

            <div className="lead-doc-box">
              <input
                type="file"
                onChange={handleFileUpload}
                disabled={uploading}
                accept=".jpg,.jpeg,.png,.pdf,.webp,.doc,.docx"
              />

              <p className="lead-doc-note">
                {uploading
                  ? "Uploading document..."
                  : "Upload candidate national ID document."}
              </p>

              {formData.id_document_url && (
                <a
                  href={formData.id_document_url}
                  target="_blank"
                  rel="noreferrer"
                  className="lead-doc-link"
                >
                  View Current Document
                </a>
              )}
            </div>
          </div>

        </div>

        <div className="lead-detail-actions">
          <button
            className="lead-save-btn"
            onClick={handleSave}
            disabled={saving || uploading}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeadDetail;