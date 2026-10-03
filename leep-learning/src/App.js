// src/App.js

import { useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

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
import WhatsAppChat from "./components/WhatsAppChat/WhatsAppChat";

/* ================= PROMOTION POPUP ================= */

import PromotionPopup from "./components/PromotionPopup/PromotionPopup";

/* ================= PUBLIC PAGES ================= */

import Home from "./pages/Home";
import About from "./pages/About";
import Brochure from "./pages/Brochure";
import Contact from "./pages/Contact";
import Apply from "./pages/Apply";

/* ================= LEGAL PAGES ================= */

import TermsAndConditions from "./pages/TermsAndConditions";
import RefundPolicy from "./pages/RefundPolicy";

/* ================= STUDENT ================= */

import ProtectedStudentRoute from "./student/routes/ProtectedStudentRoute";
import StudentLayout from "./student/layout/StudentLayout";
import StudentDashboard from "./student/pages/StudentDashboard";
import Profile from "./student/pages/Profile";
import Payments from "./student/pages/Payments";


/* =========================================================
   SCROLL TO TOP
   =========================================================
   Whenever the route changes, the page automatically returns
   to the beginning of the new page.
   ========================================================= */

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [pathname]);

  return null;
}


/* =========================================================
   PUBLIC WEBSITE LAYOUT
   ========================================================= */

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />

      {children}

      <Footer />

      <FloatingCTA />

      <WhatsAppChat />
    </>
  );
}


/* =========================================================
   CRM PORTAL
   =========================================================

   The CRM is hosted separately on Vercel.

   IMPORTANT:
   The browser remains on:

   https://leaplearning.co.in/login

   The CRM itself is loaded inside this page.

   This route has intentionally NOT been changed.
   ========================================================= */

function CRMPortal() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        margin: 0,
        padding: 0,
        overflow: "hidden",
        background: "#ffffff",
      }}
    >
      <iframe
        title="LeapCRM"
        src="https://leapcrm.vercel.app/login"
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          border: "none",
          margin: 0,
          padding: 0,
        }}
        allow="clipboard-read; clipboard-write"
      />
    </div>
  );
}


/* =========================================================
   APPLICATION
   ========================================================= */

function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>

        {/* ================= PUBLIC WEBSITE ================= */}

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

        {/* ================= CRM LOGIN ================= */}

        <Route
          path="/login"
          element={<CRMPortal />}
        />

        {/* ================= APPLY ================= */}

        <Route
          path="/apply"
          element={
            <PublicLayout>
              <Apply />
            </PublicLayout>
          }
        />

        {/* ================= LEGAL PAGES ================= */}

        <Route
          path="/terms-and-conditions"
          element={
            <PublicLayout>
              <TermsAndConditions />
            </PublicLayout>
          }
        />

        <Route
          path="/refund-policy"
          element={
            <PublicLayout>
              <RefundPolicy />
            </PublicLayout>
          }
        />

        {/* ================= STUDENT PORTAL ================= */}

        <Route
          path="/student"
          element={
            <ProtectedStudentRoute>
              <StudentLayout />
            </ProtectedStudentRoute>
          }
        >
          <Route
            path="dashboard"
            element={<StudentDashboard />}
          />

          <Route
            path="profile"
            element={<Profile />}
          />

          <Route
            path="payments"
            element={<Payments />}
          />
        </Route>

        {/* ================= PROGRAMS ================= */}

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

      {/* =====================================================
          GLOBAL PROMOTION POPUP

          This remains outside Routes so the popup can appear
          across the public website.

          It does NOT affect the CRM route.
          ===================================================== */}

      <PromotionPopup />
    </>
  );
}

export default App;