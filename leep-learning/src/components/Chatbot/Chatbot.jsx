import { useState } from "react";
import axios from "axios";
import "./Chatbot.css";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Welcome to Leap Learning. How can we help you today?"
    }
  ]);

  const quickActions = [
    "Admissions",
    "Programs",
    "Fees",
    "Application Status"
  ];

  const sendMessage = async (text = message) => {
    if (!text.trim()) return;

    const userMessage = {
      sender: "user",
      text
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const { data } = await axios.post("/api/chat", {
        message: text
      });

      const botReply = {
        sender: "bot",
        text: data.reply
      };

      setMessages((prev) => [...prev, botReply]);

      if (!open) {
        setUnreadCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("CHAT ERROR:", error);

      const errorReply = {
        sender: "bot",
        text: "Sorry, we're unable to respond right now."
      };

      setMessages((prev) => [...prev, errorReply]);

      if (!open) {
        setUnreadCount((prev) => prev + 1);
      }
    }

    setMessage("");
  };

  return (
    <>
      {!open && (
        <>
          <div className="chat-greeting">
            Hi! How can we help?
          </div>

          <button
            className={`chat-launcher ${
              unreadCount > 0 ? "has-unread" : ""
            }`}
            onClick={() => {
              setOpen(true);
              setUnreadCount(0);
            }}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21 12C21 16.4 16.97 20 12 20C11.2 20 10.42 19.92 9.68 19.76L4 21L5.15 16.2C3.81 14.99 3 13.56 3 12C3 7.6 7.03 4 12 4C16.97 4 21 7.6 21 12Z"
                fill="white"
              />
            </svg>

            {unreadCount > 0 && (
              <span className="chat-badge">
                {unreadCount}
              </span>
            )}
          </button>
        </>
      )}

      {open && (
        <div className="chat-widget">
          <div className="chat-header">
            <span>Leap Learning Support</span>

            <button
              className="close-btn"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </div>

          <div className="chat-body">
            <div className="quick-actions">
              {quickActions.map((item) => (
                <button
                  key={item}
                  onClick={() => sendMessage(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender}`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-footer">
            <input
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              onKeyDown={(e) =>
                e.key === "Enter" && sendMessage()
              }
              placeholder="Type your message..."
            />

            <button
              onClick={() => sendMessage()}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}