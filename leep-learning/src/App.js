// src/App.js

import { Routes, Route } from "react-router-dom";

/* ================= PROGRAM PAGES ================= */
import PhDProgram from "./pages/programs/PhDProgram";
import DBAProgram from "./pages/programs/DBAProgram";
import HonoraryDoctorate from "./pages/programs/HonoraryDoctorate";
import PostDoctorate from "./pages/programs/PostDoctorate";
import DLittProgram from "./pages/programs/DLittProgram";
import Professorship from "./pages/programs/Professorship";

/* ================= PUBLIC LAYOUT ================= */
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import FloatingCTA from "./components/Common/FloatingCTA/FloatingCTA";

/* ================= ADMIN RECYCLE BIN ================= */

import AdminRecycleBin from "./admin/pages/AdminRecycleBin";

/* ================= PUBLIC PAGES ================= */
import Home from "./pages/Home";
import About from "./pages/About";
import Brochure from "./pages/Brochure";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Apply from "./pages/Apply";

/* ================= ADMIN EMPLOYEE ================= */
import AdminEmployees from "./admin/pages/AdminEmployees";

/* ================= ADMIN PAGES ================= */
import AdminLogin from "./admin/pages/AdminLogin";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminApplications from "./admin/pages/AdminApplications";
import AdminApplicationDetail from "./admin/pages/AdminApplicationDetail";
import AdminSettings from "./admin/pages/AdminSettings";
import AdminNotificationsPage from "./admin/pages/AdminNotificationsPage";
import AdminStudents from "./admin/pages/AdminStudents";

/* ================= ADMIN UTILITIES ================= */
import ProtectedAdminRoute from "./admin/routes/ProtectedAdminRoute";
import AdminLayout from "./admin/layout/AdminLayout";

/* ================= EMPLOYEE PAGES ================= */
import EmployeeDashboard from "./employee/pages/EmployeeDashboard";
import EmployeeLogin from "./employee/pages/EmployeeLogin";
import CRMInquiry from "./employee/pages/CRMInquiry";
import CRM from "./employee/pages/CRM";
import LeadDetail from "./employee/pages/LeadDetail";

/* ================= EMPLOYEE LAYOUT ================= */
import EmployeeLayout from "./employee/layout/EmployeeLayout";

/* ================= EMPLOYEE UTILITIES ================= */
import ProtectedEmployeeRoute from "./employee/routes/ProtectedEmployeeRoute";

/* ================= STUDENT ================= */
import ProtectedStudentRoute from "./student/routes/ProtectedStudentRoute";
import StudentLayout from "./student/layout/StudentLayout";
import StudentDashboard from "./student/pages/StudentDashboard";
import Profile from "./student/pages/Profile";
import Payments from "./student/pages/Payments";

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <FloatingCTA />
    </>
  );
}

function App() {
  return (
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}

      <Route
        path="/"
        element={
          <PublicLayout>
            <Home />
          </PublicLayout>
        }
      />

      <Route
        path="/about"
        element={
          <PublicLayout>
            <About />
          </PublicLayout>
        }
      />

      <Route
        path="/brochure"
        element={
          <PublicLayout>
            <Brochure />
          </PublicLayout>
        }
      />

      <Route
        path="/contact"
        element={
          <PublicLayout>
            <Contact />
          </PublicLayout>
        }
      />

      <Route
        path="/login"
        element={
          <PublicLayout>
            <Login />
          </PublicLayout>
        }
      />

      <Route
        path="/apply"
        element={
          <PublicLayout>
            <Apply />
          </PublicLayout>
        }
      />

      {/* ================= ADMIN ROUTES ================= */}

      <Route path="/admin/login" element={<AdminLogin />} />

      <Route
        path="/admin"
        element={
          <ProtectedAdminRoute>
            <AdminLayout />
          </ProtectedAdminRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />

        <Route path="applications" element={<AdminApplications />} />

        <Route path="employees" element={<AdminEmployees />} />

        <Route path="applications/:id" element={<AdminApplicationDetail />} />

        <Route path="settings" element={<AdminSettings />} />

        <Route path="notifications" element={<AdminNotificationsPage />} />

        <Route path="students" element={<AdminStudents />} />

        <Route path="recycle-bin" element={<AdminRecycleBin />} />
      </Route>

      {/* ================= EMPLOYEE ROUTES ================= */}

      <Route path="/employee/login" element={<EmployeeLogin />} />

      <Route
        path="/employee"
        element={
          <ProtectedEmployeeRoute>
            <EmployeeLayout />
          </ProtectedEmployeeRoute>
        }
      >
        <Route path="dashboard" element={<EmployeeDashboard />} />
        <Route path="crm-inquiry" element={<CRMInquiry />} />
        <Route path="crm" element={<CRM />} />
        <Route path="crm/lead/:id" element={<LeadDetail />} />
      </Route>

      {/* ================= STUDENT ROUTES ================= */}

      <Route
        path="/student"
        element={
          <ProtectedStudentRoute>
            <StudentLayout />
          </ProtectedStudentRoute>
        }
      >
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="payments" element={<Payments />} />
      </Route>

      {/* ================= PROGRAM ROUTES ================= */}

      <Route
        path="/programs/phd"
        element={
          <PublicLayout>
            <PhDProgram />
          </PublicLayout>
        }
      />

      <Route
        path="/programs/dba"
        element={
          <PublicLayout>
            <DBAProgram />
          </PublicLayout>
        }
      />

      <Route
        path="/programs/honorary-doctorate"
        element={
          <PublicLayout>
            <HonoraryDoctorate />
          </PublicLayout>
        }
      />

      <Route
        path="/programs/post-doctorate"
        element={
          <PublicLayout>
            <PostDoctorate />
          </PublicLayout>
        }
      />

      <Route
        path="/programs/dlitt"
        element={
          <PublicLayout>
            <DLittProgram />
          </PublicLayout>
        }
      />

      <Route
        path="/programs/professorship"
        element={
          <PublicLayout>
            <Professorship />
          </PublicLayout>
        }
      />

      {/* ================= FALLBACK ================= */}

      <Route
        path="*"
        element={
          <PublicLayout>
            <Home />
          </PublicLayout>
        }
      />
    </Routes>
  );
}

export default App;
