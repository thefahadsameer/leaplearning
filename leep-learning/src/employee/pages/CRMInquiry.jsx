import React, { useEffect, useState } from "react";
import "../styles/crmInquiry.css";

const API_URL = "https://leaplearning.onrender.com";

function CRMInquiry() {
  const sessionData = JSON.parse(
    localStorage.getItem("employeeSession") || "{}"
  );

  const employee = sessionData.employee || {};

  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (employee.id) {
      fetchAssignedApplications();
    }
  }, [employee.id]);

  const fetchAssignedApplications = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/employees/${employee.id}/applications`
      );

      const data = await response.json();

      setApplications(data || []);
    } catch (error) {
      console.error("Failed to load assigned applications:", error);
    }
  };

  const filteredApplications = applications.filter((app) => {
    const query = search.toLowerCase();

    return (
      (app.full_name || "").toLowerCase().includes(query) ||
      (app.email || "").toLowerCase().includes(query) ||
      (app.program || "").toLowerCase().includes(query)
    );
  });

  return (
    <div className="crm-page">
      <div className="crm-header">
        <h1>Assigned Applications</h1>

        <input
          className="crm-search"
          placeholder="Search applicant..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="crm-card">
        <table className="crm-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Program</th>
              <th>Status</th>
              <th>Applied On</th>
            </tr>
          </thead>

          <tbody>
            {filteredApplications.map((app) => (
              <tr key={app.id}>
                <td>{app.full_name}</td>
                <td>{app.phone}</td>
                <td>{app.email}</td>
                <td>{app.program}</td>
                <td>{app.status}</td>
                <td>
                  {new Date(
                    app.created_at
                  ).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredApplications.length === 0 && (
          <div className="no-data">
            No assigned applications found.
          </div>
        )}
      </div>
    </div>
  );
}

export default CRMInquiry;