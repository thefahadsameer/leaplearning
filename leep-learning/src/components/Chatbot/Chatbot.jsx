import { useState } from "react";
import axios from "axios";
import "./Chatbot.css";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! Welcome to Leap Learning. How can I help you today?"
    }
  ]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/chat`,
        {
          message
        }
      );

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
          text: "Sorry, I'm having trouble responding right now."
        }
      ]);
    }

    setMessage("");
  };

  return (
    <>
      <button
        className="chat-toggle"
        onClick={() => setOpen(!open)}
      >
        AI
      </button>

      {open && (
        <div className="chat-window">
          <div className="chat-header">
            Leap Learning Assistant
          </div>

          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={msg.sender}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-footer">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask something..."
            />

            <button onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}