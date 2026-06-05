import { useState } from "react";
import { FaWhatsapp, FaTimes } from "react-icons/fa";
import "./WhatsAppChat.css";

function WhatsAppChat() {
  const [open, setOpen] = useState(false);

  const phoneNumber = "447428278975";

  const message =
    "Hello! Leap Learning, I am interested in more about your programs.";

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <>
      <div
        className={`whatsapp-widget ${open ? "open" : ""}`}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <button
          className="whatsapp-tab"
          onClick={() => setOpen(!open)}
          aria-label="Open WhatsApp Chat"
        >
          <FaWhatsapp />
          <span>WhatsApp</span>
        </button>

        <div className="whatsapp-panel">
          <button
            className="close-btn"
            onClick={() => setOpen(false)}
            aria-label="Close"
          >
            <FaTimes />
          </button>

          <div className="panel-header">
            <FaWhatsapp className="panel-icon" />
            <h4>Leap Learning</h4>
          </div>

          <p>
            Greetings from Leap Learning.
          </p>

          <p>
            Let us know your interested program and convenient time to discuss.
          </p>

          <p>
            Our team will contact you ASAP.
          </p>

          <a
            href={whatsappURL}
            target="_blank"
            rel="noopener noreferrer"
            className="chat-btn"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}

export default WhatsAppChat;