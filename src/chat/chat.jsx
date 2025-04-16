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
  const [userEmail, setUserEmail] = useState('');
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/user/me', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setUserEmail(data.email);
        } else {
          console.error('Unauthorized access or user not logged in');
        }
      } catch (err) {
        console.error('Error fetching user info:', err);
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    async function loadChats() {
      try {
        const loadedChats = await getChats();
        const userChats = loadedChats.filter(chat => chat.owner === userEmail);
        setChats(userChats);
        if (userChats.length > 0) {
          setCurrentChatId(userChats[0].id);
          setMessages(userChats[0].messages);
        }
      } catch (err) {
        console.error("Failed to load chats", err);
      }
    }
    if (userEmail) {
      loadChats();
    }
  }, [userEmail]);

  useEffect(() => {
    async function loadChatMessages() {
      if (currentChatId) {
        try {
          const chat = await getChatById(currentChatId);
          setMessages(chat ? chat.messages : []);
        } catch (err) {
          console.error("Failed to fetch chat: loadChatMessages", err);
          setMessages([]);
        }
      }
    }
    loadChatMessages();
  }, [currentChatId]);

  const handleNewMessage = async (msg) => {
    setMessages((prev) => [...prev, msg]);
    try {
      await addMessageToChat(currentChatId, msg);
    } catch (err) {
      console.error("Failed to add message: handleNewMessage", err);
    }
  };

  const handleNewChat = async () => {
    try {
      const newChat = await createNewChat(userEmail);
      setChats([newChat, ...chats]);
      setCurrentChatId(newChat.id);
      setMessages([]);
    } catch (err) {
      console.error("Failed to create new chat: handleNewChat", err);
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