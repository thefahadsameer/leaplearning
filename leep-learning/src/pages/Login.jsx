// src/pages/Login.jsx

export default function Login() {
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
        title="LeapCRM Login"
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