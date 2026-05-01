import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CRM.css";

const API_URL = "https://leaplearning.onrender.com";

function CRM() {
  const sessionData = JSON.parse(localStorage.getItem("employeeSession") || "{}");

  const token = sessionData?.token;
  const employeeId = sessionData?.id; // ✅ NEW

  const navigate = useNavigate();

  const [leads, setLeads] = useState([]);
  const [payments, setPayments] = useState({});
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [activeLead, setActiveLead] = useState(null);

  const [paymentInput, setPaymentInput] = useState({
    amount: "",
    date: "",
    method: "UPI"
  });

  /* FETCH LEADS */
  const fetchLeads = useCallback(async () => {
    try {
      // ✅ PRIMARY FETCH (WITH EMPLOYEE FILTER)
      let res = await fetch(
        API_URL + `/api/leads?stage=crm&assigned_to=${employeeId}`,
        {
          headers: { Authorization: "Bearer " + token }
        }
      );

      let data = await res.json();

      // ✅ FALLBACK (if needed)
      if (!Array.isArray(data) || data.length === 0) {
        const altRes = await fetch(
          API_URL + `/api/leads?stage=CRM&assigned_to=${employeeId}`,
          {
            headers: { Authorization: "Bearer " + token }
          }
        );
        data = await altRes.json();
      }

      const formatted = Array.isArray(data)
        ? data.map((l) => ({
            ...l,
            remarks: Array.isArray(l.remarks) ? l.remarks : []
          }))
        : [];

      setLeads(formatted);
    } catch (error) {
      console.error("Fetch CRM leads error:", error);
    }
  }, [token, employeeId]);

  useEffect(() => {
    if (token && employeeId) {
      fetchLeads();
    }
  }, [fetchLeads, token, employeeId]);

  /* LOAD PAYMENTS */
  useEffect(() => {
    if (!leads.length || !token) return;

    const loadPayments = async () => {
      try {
        const updated = {};

        await Promise.all(
          leads.map(async (lead) => {
            try {
              const res = await fetch(API_URL + "/api/payments/" + lead.id, {
                headers: { Authorization: "Bearer " + token }
              });

              const data = await res.json();
              updated[lead.id] = Array.isArray(data) ? data : [];
            } catch (error) {
              console.error("Payment fetch error for lead:", lead.id, error);
              updated[lead.id] = [];
            }
          })
        );

        setPayments(updated);
      } catch (error) {
        console.error("Load payments error:", error);
      }
    };

    loadPayments();
  }, [leads, token]);

  /* SELECT */
  const toggleSelect = (id) => {
    setSelectedLeads((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (leads.length > 0 && selectedLeads.length === leads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(leads.map((lead) => lead.id));
    }
  };

  /* DELETE */
  const handleDeleteLeads = async () => {
    if (!window.confirm("Delete selected leads?")) return;

    try {
      await Promise.all(
        selectedLeads.map((id) =>
          fetch(API_URL + "/api/leads/" + id, {
            method: "DELETE",
            headers: { Authorization: "Bearer " + token }
          })
        )
      );

      setLeads((prev) => prev.filter((lead) => !selectedLeads.includes(lead.id)));
      setSelectedLeads([]);
    } catch (error) {
      console.error("Delete leads error:", error);
    }
  };

  /* UPDATE */
  const updateLead = async (lead) => {
    setLeads((prev) =>
      prev.map((item) => (item.id === lead.id ? lead : item))
    );

    try {
      await fetch(API_URL + "/api/leads/" + lead.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify({
          total_fees: lead.total_fees,
          remarks: lead.remarks,
          status: lead.status
        })
      });
    } catch (error) {
      console.error("Update lead error:", error);
    }
  };

  /* REMARKS */
  const addRemark = (lead, value) => {
    if (!value.trim()) return;

    updateLead({
      ...lead,
      remarks: [...lead.remarks, value.trim()]
    });
  };

  const removeRemark = (lead, index) => {
    updateLead({
      ...lead,
      remarks: lead.remarks.filter((_, i) => i !== index)
    });
  };

  /* PAYMENT */
  const handlePaymentSubmit = async () => {
    if (!paymentInput.amount || !paymentInput.date) return;

    const leadId = activeLead;

    try {
      await fetch(API_URL + "/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify({
          lead_id: leadId,
          amount: paymentInput.amount,
          payment_date: paymentInput.date,
          payment_method: paymentInput.method
        })
      });

      setPayments((prev) => ({
        ...prev,
        [leadId]: [
          ...(prev[leadId] || []),
          {
            amount: paymentInput.amount,
            payment_date: paymentInput.date,
            payment_method: paymentInput.method
          }
        ]
      }));

      setActiveLead(null);
      setPaymentInput({
        amount: "",
        date: "",
        method: "UPI"
      });
    } catch (error) {
      console.error("Add payment error:", error);
    }
  };

  /* CALCULATIONS */
  const calculatePaid = (leadId) => {
    return (payments[leadId] || []).reduce(
      (sum, payment) => sum + Number(payment.amount || 0),
      0
    );
  };

  const formatDate = (date) => {
    if (!date) return "--";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  /* DETAIL PAGE NAVIGATION */
  const openLeadDetailPage = (lead) => {
    navigate("/employee/crm/lead/" + lead.id);
  };

  return (
    <div className="crm-page">
      <h1 className="crm-title">CRM Management</h1>

      <div className="crm-card">
        <table className="crm-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={
                    leads.length > 0 &&
                    selectedLeads.length === leads.length
                  }
                />
              </th>
              <th>Date</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Program</th>
              <th>Total Fees</th>
              <th>Paid</th>
              <th>Pending</th>
              <th>Remarks</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => {
              const paid = calculatePaid(lead.id);
              const pending = Number(lead.total_fees || 0) - paid;

              return (
                <tr
                  key={lead.id}
                  onDoubleClick={() => openLeadDetailPage(lead)}
                >
                  <td onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedLeads.includes(lead.id)}
                      onChange={() => toggleSelect(lead.id)}
                    />
                  </td>

                  <td>{formatDate(lead.created_at)}</td>
                  <td>{lead.full_name || "--"}</td>
                  <td>{lead.phone || "--"}</td>
                  <td>{lead.program_type || lead.program_interest || "--"}</td>

                  <td onClick={(e) => e.stopPropagation()}>
                    <input
                      className="input-modern"
                      value={lead.total_fees || ""}
                      onChange={(e) =>
                        updateLead({
                          ...lead,
                          total_fees: e.target.value
                        })
                      }
                    />
                  </td>

                  <td className="paid">₹ {paid}</td>
                  <td className="pending">₹ {pending}</td>

                  <td onClick={(e) => e.stopPropagation()}>
                    <div className="remarks-container">
                      <div className="remarks-tags">
                        {lead.remarks.map((remark, index) => (
                          <div key={index} className="remark-chip">
                            {remark}
                            <button
                              type="button"
                              className="remark-delete"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeRemark(lead, index);
                              }}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>

                      <input
                        className="input-modern small"
                        placeholder="Add remark..."
                        onClick={(e) => e.stopPropagation()}
                        onDoubleClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            addRemark(lead, e.target.value);
                            e.target.value = "";
                          }
                        }}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selectedLeads.length > 0 && (
        <div className="floating-actions">
          <span>{selectedLeads.length} selected</span>

          {selectedLeads.length === 1 && (
            <button
              className="action-btn primary"
              onClick={() => setActiveLead(selectedLeads[0])}
            >
              + Add Payment
            </button>
          )}

          <button className="action-btn danger" onClick={handleDeleteLeads}>
            Delete
          </button>
        </div>
      )}

      {activeLead && (
        <div className="payment-modal">
          <div className="payment-box">
            <h3>Add Payment</h3>

            <input
              placeholder="Amount"
              value={paymentInput.amount}
              onChange={(e) =>
                setPaymentInput({ ...paymentInput, amount: e.target.value })
              }
            />

            <input
              type="date"
              value={paymentInput.date}
              onChange={(e) =>
                setPaymentInput({ ...paymentInput, date: e.target.value })
              }
            />

            <select
              value={paymentInput.method}
              onChange={(e) =>
                setPaymentInput({ ...paymentInput, method: e.target.value })
              }
            >
              <option value="UPI">UPI</option>
              <option value="Cash">Cash</option>
              <option value="Bank">Bank</option>
              <option value="Card">Card</option>
            </select>

            <div className="payment-actions">
              <button onClick={handlePaymentSubmit}>Submit</button>
              <button onClick={() => setActiveLead(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CRM;