import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { Line } from "react-chartjs-2";
import "../styles/employeeDashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

function EmployeeDashboard() {
  const navigate = useNavigate();

  const sessionData = JSON.parse(localStorage.getItem("employeeSession"));
  const token = sessionData?.token;
  const employee = sessionData?.employee;

  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  /* ================= AUTH GUARD ================= */
  useEffect(() => {
    if (!token) {
      navigate("/employee/login");
    }
  }, [token, navigate]);

  /* ================= FETCH LEADS ================= */
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/leads",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        const grouped = data.reduce((acc, lead) => {
          acc[lead.lead_status] =
            (acc[lead.lead_status] || 0) + 1;
          return acc;
        }, {});

        setStats(grouped);
      } catch (error) {
        console.error("Error fetching leads:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchLeads();
  }, [token]);

  const statusList = [
    "NEW",
    "INTERESTED",
    "NOT_INTERESTED",
    "DNP",
    "DUPLICATE",
    "CALL_BACK",
    "FUTURE",
    "COLD",
    "FOLLOW_UP",
    "INVALID",
    "CONVERTED"
  ];

  /* ================= SAFE CHART DATA ================= */
  const trendData = {
    labels: statusList,
    datasets: [
      {
        label: "Leads Trend",
        data: statusList.map((s) => stats[s] || 0),
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.2)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#2563eb"
      }
    ]
  };

  const monthlyData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Monthly Conversions",
        data: [2, 5, 3, 8, 4, 6],
        borderColor: "#16a34a",
        backgroundColor: "rgba(22, 163, 74, 0.2)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#16a34a"
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    animation: {
      duration: 1500,
      easing: "easeInOutQuart"
    },
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="employee-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Employee Dashboard</h1>
          <p className="employee-sub">
            Welcome, <b>{employee?.full_name}</b>
          </p>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* ===== STATUS CARDS ===== */}
          <div className="dashboard-grid">
            {statusList.map((status) => (
              <div key={status} className="status-card">
                <h3>{status.replace("_", " ")}</h3>
                <p className={`status-count ${status}`}>
                  {stats[status] || 0}
                </p>
              </div>
            ))}
          </div>

          {/* ===== LEADS TREND GRAPH ===== */}
          <div className="graph-section">
            <h2>Leads Trend Overview</h2>
            <Line data={trendData} options={chartOptions} />

            <h2 style={{ marginTop: "50px" }}>
              Monthly Performance
            </h2>
            <Line data={monthlyData} options={chartOptions} />
          </div>
        </>
      )}
    </div>
  );
}

export default EmployeeDashboard;