import { useEffect, useState } from "react";

function Payments() {
  const [payments, setPayments] = useState([]);
  const [student, setStudent] = useState({});
  const [lastCount, setLastCount] = useState(0);

  const token = localStorage.getItem("token");

  /* ================= FETCH PAYMENTS ================= */
  const fetchPayments = async () => {
    try {
      const res = await fetch(
        "https://leaplearning.onrender.com/api/payments/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.length > lastCount && lastCount !== 0) {
        alert("Payment Successful");
      }

      setLastCount(data.length);
      setPayments(data);
    } catch (err) {
      console.error("Fetch payments error:", err);
    }
  };

  /* ================= FETCH PROFILE ================= */
  const fetchStudentProfile = async () => {
    try {
      const res = await fetch(
        "https://leaplearning.onrender.com/api/students/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setStudent(data);
    } catch (err) {
      console.error("Profile fetch error:", err);
    }
  };

  /* ================= PAYMENT SUCCESS RETURN ================= */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("payment") === "success") {
      alert("Payment Successful");

      fetchPayments();
      fetchStudentProfile();

      window.history.replaceState(
        {},
        document.title,
        "/student/payments"
      );
    }
  }, []);

  /* ================= FIRST LOAD ================= */
  useEffect(() => {
    fetchPayments();
    fetchStudentProfile();
  }, []);

  /* ================= AUTO REFRESH ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      fetchPayments();
      fetchStudentProfile();
    }, 5000);

    return () => clearInterval(interval);
  }, [lastCount]);

  /* ================= PAY BUTTON ================= */
  const handlePayment = () => {
    if (!token) {
      alert("Please login first");
      return;
    }

    window.location.href = "https://rzp.io/rzp/pXAvdLhz";
  };

  /* ================= DOWNLOAD INVOICE ================= */
  const handleDownloadInvoice = (file) => {
    if (!file) {
      alert("Invoice not available");
      return;
    }

    if (
      file.startsWith("http://") ||
      file.startsWith("https://")
    ) {
      window.open(file, "_blank");
      return;
    }

    window.open(
      `https://leaplearning.onrender.com/invoices/${file}`,
      "_blank"
    );
  };

  /* ================= USE STUDENTS TABLE VALUES ================= */
  const courseFee = Number(student.total_fee || 0);
  const totalPaid = Number(student.total_paid || 0);
  const pending = Number(student.pending_fees || 0);
  const lastPayment = Number(student.last_payment || 0);

  const progress =
    courseFee > 0
      ? Math.min(
          (totalPaid / courseFee) * 100,
          100
        )
      : 0;

  return (
    <div style={{ padding: "25px" }}>
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <h2 style={{ margin: 0 }}>Payments</h2>

        <button
          onClick={handlePayment}
          style={{
            background: "#f97316",
            color: "#fff",
            border: "none",
            padding: "12px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Pay Now
        </button>
      </div>

      {/* SUMMARY */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "18px",
          marginBottom: "25px",
        }}
      >
        <div style={cardStyle}>
          <p style={labelStyle}>Total Fees</p>
          <h3 style={valueStyle}>₹{courseFee}</h3>
        </div>

        <div style={cardStyle}>
          <p style={labelStyle}>Total Paid</p>
          <h3 style={valueStyle}>₹{totalPaid}</h3>
        </div>

        <div style={cardStyle}>
          <p style={labelStyle}>Pending Fees</p>
          <h3 style={valueStyle}>₹{pending}</h3>
        </div>

        <div style={cardStyle}>
          <p style={labelStyle}>Last Payment</p>
          <h3 style={valueStyle}>₹{lastPayment}</h3>
        </div>
      </div>

      {/* PROGRESS */}
      <div style={cardStyle}>
        <p style={labelStyle}>Fee Completion</p>

        <div
          style={{
            background: "#eee",
            height: "12px",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              background: "#22c55e",
              height: "100%",
            }}
          ></div>
        </div>

        <p
          style={{
            marginTop: "10px",
            fontSize: "14px",
          }}
        >
          ₹{totalPaid} paid of ₹{courseFee}
        </p>
      </div>

      {/* HISTORY */}
      <div
        style={{
          ...cardStyle,
          marginTop: "25px",
        }}
      >
        <h3 style={{ marginBottom: "15px" }}>
          Payment History
        </h3>

        {payments.length === 0 ? (
          <p>No payments yet...</p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#f8fafc",
                  textAlign: "left",
                }}
              >
                <th style={th}>Date</th>
                <th style={th}>Amount</th>
                <th style={th}>Invoice No</th>
                <th style={th}>Invoice</th>
                <th style={th}>Status</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((p, i) => (
                <tr key={i}>
                  <td style={td}>
                    {new Date(
                      p.payment_date
                    ).toLocaleDateString()}
                  </td>

                  <td style={td}>₹{p.amount}</td>

                  <td style={td}>
                    {p.invoice_number || "-"}
                  </td>

                  <td style={td}>
                    <button
                      onClick={() =>
                        handleDownloadInvoice(
                          p.invoice_file
                        )
                      }
                      style={downloadBtn}
                    >
                      Download
                    </button>
                  </td>

                  <td style={td}>
                    <span
                      style={{
                        background: "#dcfce7",
                        padding: "5px 10px",
                        borderRadius: "20px",
                        fontSize: "12px",
                      }}
                    >
                      Paid
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */
const cardStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
};

const labelStyle = {
  margin: 0,
  color: "#666",
  fontSize: "14px",
};

const valueStyle = {
  margin: "10px 0 0",
};

const th = {
  padding: "12px",
  borderBottom: "1px solid #eee",
};

const td = {
  padding: "12px",
  borderBottom: "1px solid #f3f4f6",
};

const downloadBtn = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "6px 10px",
  borderRadius: "6px",
  cursor: "pointer",
};

export default Payments;