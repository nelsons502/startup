import React, { useEffect, useState } from "react";
import ChatBox from "./chatBox";
import "./chat.css";

import {
  getChats,
  createNewChat,
  addMessageToChat,
  getChatById,
} from "./chatManager";

export default function Chat() {
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const loadedChats = getChats();
    setChats(loadedChats);
    if (loadedChats.length > 0) {
      setCurrentChatId(loadedChats[0].id);
      setMessages(loadedChats[0].messages);
    }
  }, []);

  useEffect(() => {
    if (currentChatId) {
      const chat = getChatById(currentChatId);
      setMessages(chat ? chat.messages : []);
    }
  }, [currentChatId]);

  const handleNewMessage = (msg) => {
    setMessages((prev) => [...prev, msg]);
    addMessageToChat(currentChatId, msg);
  };

  const handleNewChat = () => {
    const newChat = createNewChat();
    setChats([newChat, ...chats]);
    setCurrentChatId(newChat.id);
    setMessages([]);
  };

  return (
    <main>
      <div className="sidebar">
        <h2>Recent Chats</h2>
        <div className="chat-list">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`chat-item ${chat.id === currentChatId ? "active" : ""}`}
              onClick={() => setCurrentChatId(chat.id)}
            >
              {chat.title}
            </div>
          ))}
        </div>
        <button onClick={handleNewChat}>+ New Chat</button>
      </div>

      <div className="main-chat">
        <div className="chat-header">
          {chats.find((chat) => chat.id === currentChatId)?.title || "Current Chat"}
        </div>
        <div className="chat-body">
          {messages.map((msg, index) => (
            <p key={index} className={msg.role === "user" ? "usr-msg" : "ai-msg"}>
              {msg.content}
            </p>
          ))}
        </div>
        <ChatBox onNewMessage={handleNewMessage} chatId={currentChatId} />
      </div>
    </main>
  );
}