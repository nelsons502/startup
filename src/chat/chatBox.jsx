import React, { useState } from "react";
import { sendMessageToAI } from "./chatService";

export default function ChatBox({ onNewMessage }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    onNewMessage(userMessage);

    setLoading(true);
    setInput("");
    const aiReply = await sendMessageToAI([userMessage]);
    setLoading(false);

    const aiMessage = { role: "assistant", content: aiReply };
    onNewMessage(aiMessage);
  };

  return (
    <div className="chat-footer">
      <input
        type="text"
        placeholder="Type your message"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={loading}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !loading) {
            handleSend();
          }
        }}
        />
        <button onClick={handleSend} disabled={loading}>
            {loading ? "..." : "Send"}
        </button>
        <div className="loading-indicator">
            {loading && <span>Loading...</span>}
        </div>
    </div>
  );
}