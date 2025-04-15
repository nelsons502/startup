import React from "react";

export default function MessageBubble({ message }) {
  const isUser = message.role === "user";
  const className = isUser ? "usr-msg" : "ai-msg";

  return (
    <p className={className}>
      {message.content}
    </p>
  );
}