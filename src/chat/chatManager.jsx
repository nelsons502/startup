import { Chat } from "./chatClass";

const CHAT_STORAGE_KEY = "focus_coding_chats";

function loadChats() {
  const stored = localStorage.getItem(CHAT_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveChats(chats) {
  localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(chats));
}

export function getChats() {
  return loadChats();
}

export function getChatById(chatId) {
  const chats = loadChats();
  return chats.find(chat => chat.id === chatId);
}

export function createNewChat() {
  const chats = loadChats();
  const num = chats.length + 1;
  const newChat = new Chat(num);
  chats.unshift(newChat);
  saveChats(chats);
  return newChat;
}

export function addMessageToChat(chatId, message) {
  const chats = loadChats();
  const chatIndex = chats.findIndex(chat => chat.id === chatId);
  if (chatIndex === -1) return;

  const chat = chats[chatIndex];
  const updatedChat = new Chat();
  Object.assign(updatedChat, chat);  // revive class methods
  updatedChat.addMessage(message);
  updatedChat.update();

  // Remove old position and move to top
  chats.splice(chatIndex, 1);
  chats.unshift(updatedChat);

  saveChats(chats);
}