import React, { useEffect, useState } from "react";
import "../styles/crmInquiry.css";

const API_URL = "https://leaplearning.onrender.com";

function CRMInquiry() {
  const sessionData = JSON.parse(
    localStorage.getItem("employeeSession") || "{}",
  );
  const token = sessionData ? sessionData.token : null;

  const [leads, setLeads] = useState([]);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(
    function () {
      if (token) {
        fetchLeads();
      }
    },
    [token],
  );

  function fetchLeads() {
    fetch(API_URL + "/api/leads?stage=INQUIRY", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        setLeads(data);
      })
      .catch(function (err) {
        console.error("Fetch error:", err);
      });
  }

  function toggleSelect(id) {
    if (selectedLeads.includes(id)) {
      setSelectedLeads(
        selectedLeads.filter(function (item) {
          return item !== id;
        }),
      );
    } else {
      setSelectedLeads(selectedLeads.concat(id));
    }
  }

  function handleSelectAll() {
    if (selectedLeads.length === leads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(
        leads.map(function (lead) {
          return lead.id;
        }),
      );
    }
  }

  /* ============================
     UPDATED MOVE FUNCTION (BULK SAFE)
  ============================ */
  function handleMove() {
    if (selectedLeads.length === 0) return;

    fetch(API_URL + "/api/leads/stage", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        ids: selectedLeads,
        stage: "crm",
      }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function () {
        // ✅ Remove moved leads instantly (UI sync)
        setLeads(
          leads.filter(function (lead) {
            return !selectedLeads.includes(lead.id);
          }),
        );

        setSelectedLeads([]);
      })
      .catch(function (err) {
        console.error("Move error:", err);
      });
  }

  function handleDelete() {
    Promise.all(
      selectedLeads.map(function (id) {
        return fetch(API_URL + "/api/leads/" + id, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
          },
        });
      }),
    ).then(function () {
      setLeads(
        leads.filter(function (lead) {
          return !selectedLeads.includes(lead.id);
        }),
      );

      setSelectedLeads([]);
    });
  }

  const filteredLeads = leads.filter(function (lead) {
    if (!lead.full_name) return false;

    return lead.full_name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="crm-page">
      <div className="crm-header">
        <h1>CRM Inquiry</h1>

        <input
          className="crm-search"
          placeholder="Search candidate..."
          value={search}
          onChange={function (e) {
            setSearch(e.target.value);
          }}
        />
      </div>

      <div className="crm-card">
        <table className="crm-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={
                    filteredLeads.length > 0 &&
                    selectedLeads.length === filteredLeads.length
                  }
                />
              </th>

              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>City</th>
              <th>Program</th>
              <th>Confirmation</th>
            </tr>
          </thead>

          <tbody>
            {filteredLeads.map(function (lead) {
              return (
                <tr key={lead.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedLeads.includes(lead.id)}
                      onChange={function () {
                        toggleSelect(lead.id);
                      }}
                    />
                  </td>

                  <td>{lead.full_name}</td>
                  <td>{lead.phone}</td>
                  <td>{lead.email || "--"}</td>
                  <td>{lead.city || "--"}</td>
                  <td>{lead.program_interest || "--"}</td>

                  <td>
                    {lead.confirmation_status === "SERIOUS"
                      ? "Serious about PhD"
                      : "Just exploring"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredLeads.length === 0 && (
          <div className="no-data">No leads in inquiry.</div>
        )}
      </div>

      {selectedLeads.length > 0 && (
        <div className="floating-actions">
          <span>{selectedLeads.length} selected</span>

          <button className="move-btn" onClick={handleMove}>
            Move to CRM
          </button>

          <button className="delete-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default CRMInquiry;
