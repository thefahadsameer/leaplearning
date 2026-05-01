import { useEffect, useState } from "react";
import "../styles/Profile.css";

function Profile() {
  const [student, setStudent] =
    useState(null);
  const [form, setForm] =
    useState({});
  const [editMode, setEditMode] =
    useState(false);
  const [image, setImage] =
    useState(null);
  const [preview, setPreview] =
    useState(null);

  /* NEW DOCUMENT STATES */
  const [documents, setDocuments] =
    useState({
      academic: null,
      idproof: null,
      resume: null,
      other: null,
    });

  const API_URL =
    window.location.hostname ===
    "localhost"
      ? "http://localhost:5000"
      : "https://leaplearning.onrender.com";

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token =
        localStorage.getItem(
          "token"
        );

      const res = await fetch(
        `${API_URL}/api/students/profile`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":
              "application/json",
          },
        }
      );

      const data =
        await res.json();

      setStudent(data);
      setForm(data);
    } catch (err) {
      console.error(
        "PROFILE ERROR:",
        err
      );
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleImage = (e) => {
    const file =
      e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(
      URL.createObjectURL(file)
    );
  };

  const handleDocChange = (
    type,
    file
  ) => {
    if (!file) return;

    setDocuments({
      ...documents,
      [type]: file,
    });
  };

  const handleUploadDocument =
    async (type) => {
      try {
        const file =
          documents[type];

        if (!file) {
          alert(
            "Please select file first"
          );
          return;
        }

        const token =
          localStorage.getItem(
            "token"
          );

        const formData =
          new FormData();

        formData.append(
          "document",
          file
        );

        formData.append(
          "document_type",
          type
        );

        const res =
          await fetch(
            `${API_URL}/api/students/documents`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formData,
            }
          );

        const data =
          await res.json();

        if (!res.ok) {
          alert(
            data.message ||
              "Upload failed"
          );
          return;
        }

        alert(
          "Document uploaded successfully ✅"
        );

        fetchProfile();

        setDocuments({
          ...documents,
          [type]: null,
        });
      } catch (err) {
        console.error(
          "DOCUMENT ERROR:",
          err
        );
      }
    };

  const handleViewDocument =
    (type) => {
      if (
        student &&
        student[type]
      ) {
        window.open(
          student[type],
          "_blank"
        );
      } else {
        alert(
          "No document uploaded yet"
        );
      }
    };

  const handleSave = async () => {
    try {
      const token =
        localStorage.getItem(
          "token"
        );

      const formData =
        new FormData();

      Object.keys(form).forEach(
        (key) => {
          if (
            form[key] !==
              undefined &&
            form[key] !== ""
          ) {
            formData.append(
              key,
              form[key]
            );
          }
        }
      );

      if (image) {
        formData.append(
          "profile_image",
          image
        );
      }

      const res = await fetch(
        `${API_URL}/api/students/profile`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data =
        await res.json();

      const updatedStudent =
        data.data
          ? data.data[0]
          : data;

      setStudent(
        updatedStudent
      );
      setForm(
        updatedStudent
      );

      setEditMode(false);
      setPreview(null);
      setImage(null);

      alert(
        "Profile updated successfully ✅"
      );
    } catch (err) {
      console.error(
        "UPDATE ERROR:",
        err
      );
    }
  };

  const renderField = (
    label,
    name,
    disabled = false
  ) => {
    return (
      <div className="field">
        <label>{label}</label>

        {editMode &&
        !disabled ? (
          <input
            name={name}
            value={
              form[name] || ""
            }
            onChange={
              handleChange
            }
          />
        ) : (
          <p>
            {student[name] ||
              "-"}
          </p>
        )}
      </div>
    );
  };

  const renderDocRow = (
    title,
    keyName
  ) => {
    return (
      <div className="doc-row">
        <div>
          <h4>{title}</h4>

          <p>
            {documents[
              keyName
            ]
              ? documents[
                  keyName
                ].name
              : student[
                  keyName
                ]
              ? "Uploaded"
              : "No file selected"}
          </p>
        </div>

        <div className="doc-actions">
          <label className="upload-btn">
            Choose
            <input
              type="file"
              hidden
              onChange={(e) =>
                handleDocChange(
                  keyName,
                  e.target
                    .files[0]
                )
              }
            />
          </label>

          <button
            className="upload-btn"
            onClick={() =>
              handleUploadDocument(
                keyName
              )
            }
          >
            Upload
          </button>

          <button
            className="view-btn"
            onClick={() =>
              handleViewDocument(
                keyName
              )
            }
          >
            View
          </button>
        </div>
      </div>
    );
  };

  if (!student)
    return <p>Loading...</p>;

  return (
    <div className="profile-main">
      {/* LEFT */}
      <div className="profile-preview">
        <div className="image-container">
          <img
            src={
              preview
                ? preview
                : student.profile_image
                ? student.profile_image +
                  "?t=" +
                  new Date().getTime()
                : "https://ui-avatars.com/api/?name=" +
                  student.full_name
            }
            className="preview-img"
            alt="profile"
          />

          {editMode && (
            <label className="edit-image-btn">
              <input
                type="file"
                hidden
                onChange={
                  handleImage
                }
              />
              ✎
            </label>
          )}
        </div>

        <h3>
          {student.full_name}
        </h3>

        <p className="program">
          {student.program}
        </p>

        <span className="status">
          Active Student
        </span>
      </div>

      {/* RIGHT */}
      <div className="profile-form">
        <div className="form-header">
          <h2>My Profile</h2>

          {!editMode ? (
            <button
              className="edit-btn"
              onClick={() =>
                setEditMode(
                  true
                )
              }
            >
              Edit
            </button>
          ) : (
            <div>
              <button
                className="save-btn"
                onClick={
                  handleSave
                }
              >
                Save
              </button>

              <button
                className="cancel-btn"
                onClick={() => {
                  setEditMode(
                    false
                  );
                  setForm(
                    student
                  );
                  setPreview(
                    null
                  );
                  setImage(
                    null
                  );
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="form-grid">
          {renderField(
            "Full Name",
            "full_name"
          )}
          {renderField(
            "Email",
            "email"
          )}
          {renderField(
            "Phone",
            "phone"
          )}
          {renderField(
            "Address",
            "address"
          )}
          {renderField(
            "Qualification",
            "qualification"
          )}
          {renderField(
            "Field of Study",
            "field_of_study"
          )}
          {renderField(
            "Year of Completion",
            "year_of_completion"
          )}
          {renderField(
            "Program",
            "program",
            true
          )}
        </div>

        {/* DOCUMENTS */}
        <div className="docs-box">
          <h2>
            My Documents
          </h2>

          {renderDocRow(
            "Academic Documents",
            "academic"
          )}

          {renderDocRow(
            "National ID Proof",
            "idproof"
          )}

          {renderDocRow(
            "Resume / CV",
            "resume"
          )}

          {renderDocRow(
            "Other Documents",
            "other"
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;