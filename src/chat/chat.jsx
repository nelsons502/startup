/*
1.	chat.jsx
	•	Displays sidebar + current chat view
	•	Uses chatManager to get current chat state
*/

import React, { useState } from "react";
import ChatBox from "./chatBox";

// use `const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;` to access my API key
// use `const apiUrl = import.meta.env.VITE_OPENROUTER_API_URL;` to access my API URL
// use `const apiKey = import.meta.env.VITE_OPENROUTER_API_MODEL;` to access my API model

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: "user", content: "Can you help me understand recursion?" },
    { role: "assistant", content: "Sure! Recursion is a method of solving problems where a function calls itself as a subroutine..." }
  ]);

  const handleNewMessage = (msg) => {
    setMessages((prev) => [...prev, msg]);
  };

  return (
    <main>
      <div className="sidebar">
        <h2>Recent Chats</h2>
        <div className="chat-list">
          <div className="chat-item active">Chat with AI (current)</div>
          <div className="chat-item">Chat from yesterday</div>
          <div className="chat-item">Chat from two days ago</div>
          <div className="chat-item">Chat from two days ago in the morning</div>
          <div className="chat-item">Chat from a week ago</div>
        </div>
      </div>

      <div className="main-chat">
        <div className="chat-header">
          Current Chat [Current topic]
        </div>
        <div className="chat-body">
          {messages.map((msg, index) => (
            <p key={index} className={msg.role === "user" ? "usr-msg" : "ai-msg"}>
              {msg.content}
            </p>
          ))}
        </div>
        <ChatBox onNewMessage={handleNewMessage} />
      </div>
    </main>
  );
}