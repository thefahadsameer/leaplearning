import { useState } from "react";
import axios from "axios";
import "./Chatbot.css";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

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

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.reply
        }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            "Sorry, we're unable to respond right now."
        }
      ]);
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
            className="chat-launcher"
            onClick={() => setOpen(true)}
          >
            Chat
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