import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function AdminEmployees() {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const response = await fetch(
        "https://leaplearning.onrender.com/api/employees"
      );

      const data = await response.json();

      setEmployees(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h1>Employees</h1>

        <button
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 16px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Add Employee
        </button>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fff",
        }}
      >
        <thead>
          <tr>
            <th style={th}>Name</th>
            <th style={th}>Phone</th>
            <th style={th}>Role</th>
            <th style={th}>Status</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td style={td}>{employee.full_name}</td>
              <td style={td}>{employee.phone}</td>
              <td style={td}>{employee.role}</td>

              <td style={td}>
                {employee.active
                  ? "Active"
                  : "Inactive"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const th = {
  textAlign: "left",
  padding: "12px",
  borderBottom: "1px solid #ddd",
};

const td = {
  padding: "12px",
  borderBottom: "1px solid #eee",
};

export default AdminEmployees;