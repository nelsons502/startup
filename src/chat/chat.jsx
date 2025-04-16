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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    async function checkLogin() {
      try {
        const res = await fetch("/api/user/me", { credentials: "include" });
        setIsLoggedIn(res.ok);
      } catch {
        setIsLoggedIn(false);
      } finally {
        setAuthChecked(true);
      }
    }
    checkLogin(); // initial load
  }, []);

  useEffect(() => {
    async function loadChats() {
      try {
        const loadedChats = await getChats();
        setChats(loadedChats);
        if (loadedChats.length > 0) {
          setCurrentChatId(loadedChats[0].id);
          setMessages(loadedChats[0].messages);
        }
      } catch (err) {
        console.error("Failed to load chats", err);
      }
    }
    loadChats();
  }, []);

  useEffect(() => {
    async function loadChatMessages() {
      if (currentChatId) {
        try {
          const chat = await getChatById(currentChatId);
          setMessages(chat ? chat.messages : []);
        } catch (err) {
          console.error("Failed to fetch chat", err);
          setMessages([]);
        }
      }
    }
    loadChatMessages();
  }, [currentChatId]);
  
  if (!authChecked) {
    return (
      <main>
        <div className="center-container">
          <p>Checking login status...</p>
        </div>
      </main>
    );
  }

  if (!isLoggedIn) {
    return (
      <main>
        <div className="center-container">
          <p>You must log in to use/view this feature.</p>
        </div>
      </main>
    );
  }

  const handleNewMessage = async (msg) => {
    setMessages((prev) => [...prev, msg]);
    try {
      await addMessageToChat(currentChatId, msg);
    } catch (err) {
      console.error("Failed to add message", err);
    }
  };

  const handleNewChat = async () => {
    try {
      const newChat = await createNewChat();
      setChats([newChat, ...chats]);
      setCurrentChatId(newChat.id);
      setMessages([]);
    } catch (err) {
      console.error("Failed to create new chat", err);
    }
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