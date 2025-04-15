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

export function createNewChat(title = "New Chat") {
  const chats = loadChats();
  const newChat = {
    id: Date.now(),
    title,
    messages: []
  };
  chats.unshift(newChat);
  saveChats(chats);
  return newChat;
}

export function addMessageToChat(chatId, message) {
  const chats = loadChats();
  const chatIndex = chats.findIndex(chat => chat.id === chatId);
  if (chatIndex === -1) return;

  chats[chatIndex].messages.push(message);
  saveChats(chats);
}