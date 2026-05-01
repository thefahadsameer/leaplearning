import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/StudentDashboard.css";

function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [payments, setPayments] = useState([]);

  const navigate = useNavigate();

  const API_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:5000"
      : "https://leaplearning.onrender.com";

  useEffect(() => {
    fetchDashboard();
    fetchPayments();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

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

      const data = await res.json();
      setStudent(data);
    } catch (error) {
      console.error(
        "Dashboard Error:",
        error
      );
    }
  };

  const fetchPayments = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${API_URL}/api/payments/my`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":
              "application/json",
          },
        }
      );

      const data = await res.json();

      if (Array.isArray(data)) {
        setPayments(data);
      }
    } catch (error) {
      console.error(
        "Payments Error:",
        error
      );
    }
  };

  const handleDownloadInvoice =
    (file) => {
      if (!file) {
        alert(
          "No invoice available yet."
        );
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
        `${API_URL}/invoices/${file}`,
        "_blank"
      );
    };

  const handleLatestInvoice =
    () => {
      if (payments.length === 0) {
        alert(
          "No payment found yet."
        );
        return;
      }

      const latestPayment =
        payments[0];

      handleDownloadInvoice(
        latestPayment.invoice_file
      );
    };

  const handleDocuments =
    () => {
      alert(
        "Documents section coming soon."
      );
    };

  if (!student) {
    return <p>Loading...</p>;
  }

  const totalFee = Number(
    student.total_fee || 0
  );

  const totalPaid = Number(
    student.total_paid || 0
  );

  const pendingFees = Number(
    student.pending_fees || 0
  );

  const lastPayment = Number(
    student.last_payment || 0
  );

  const progress =
    totalFee > 0
      ? Math.min(
          (totalPaid / totalFee) *
            100,
          100
        )
      : 0;

  return (
    <div className="dashboard-page">
      {/* TOP HERO */}
      <div className="hero-card">
        <div>
          <h1>
            Welcome,{" "}
            {student.full_name}
          </h1>

          <p>
            Manage your student
            profile, fees and
            progress from one place.
          </p>

          <span className="hero-tag">
            {student.program ||
              "Student Program"}
          </span>
        </div>

        <img
          src={
            student.profile_image
              ? student.profile_image
              : `https://ui-avatars.com/api/?name=${student.full_name}`
          }
          alt="student"
          className="hero-image"
        />
      </div>

      {/* GRID */}
      <div className="dashboard-grid">
        {/* LEFT SIDE */}
        <div className="left-area">
          {/* SUMMARY */}
          <div className="summary-grid">
            <div className="card">
              <p>Total Fees</p>
              <h3>₹{totalFee}</h3>
            </div>

            <div className="card">
              <p>Total Paid</p>
              <h3>₹{totalPaid}</h3>
            </div>

            <div className="card">
              <p>Pending Fees</p>
              <h3>₹{pendingFees}</h3>
            </div>

            <div className="card">
              <p>Last Payment</p>
              <h3>₹{lastPayment}</h3>
            </div>
          </div>

          {/* PROGRESS */}
          <div className="card">
            <h3>
              Fee Completion
            </h3>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${progress}%`,
                }}
              ></div>
            </div>

            <p className="small-text">
              ₹{totalPaid} paid of ₹
              {totalFee}
            </p>
          </div>

          {/* ANNOUNCEMENTS */}
          <div className="card">
            <h3>
              Announcements
            </h3>

            <ul className="list">
              <li>
                Welcome to your
                student portal.
              </li>
              <li>
                Keep your profile
                updated regularly.
              </li>
              <li>
                Upload pending
                documents if
                required.
              </li>
            </ul>
          </div>

          {/* QUICK ACTIONS */}
          <div className="card">
            <h3>
              Quick Actions
            </h3>

            <div className="action-grid">
              <button
                onClick={() =>
                  navigate(
                    "/student/profile"
                  )
                }
              >
                Update Profile
              </button>

              <button
                onClick={() =>
                  navigate(
                    "/student/payments"
                  )
                }
              >
                Pay Fees
              </button>

              <button
                onClick={
                  handleLatestInvoice
                }
              >
                Download Invoice
              </button>

              <button
                onClick={
                  handleDocuments
                }
              >
                View Documents
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="right-area">
          <div className="card">
            <h3>
              Recent Activity
            </h3>

            <ul className="list">
              <li>
                Last payment: ₹
                {lastPayment}
              </li>
              <li>
                Profile status:
                Active
              </li>
              <li>
                Program:{" "}
                {student.program}
              </li>
            </ul>
          </div>

          <div className="card">
            <h3>Notices</h3>

            <ul className="list">
              <li>
                Please check fee
                due dates.
              </li>
              <li>
                Keep login details
                secure.
              </li>
              <li>
                New updates will
                appear here.
              </li>
            </ul>
          </div>

          <div className="card">
            <h3>
              Upcoming Sessions
            </h3>

            <ul className="list">
              <li>
                Orientation Session
                - Coming Soon
              </li>
              <li>
                Career Guidance -
                To Be Announced
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;