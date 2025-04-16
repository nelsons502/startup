import { Chat } from "./chatClass";

export async function getChats() {
  const res = await fetch('/api/chats', {
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch chats');
  }
  return await res.json();
}

export async function getChatById(chatId) {
  const res = await fetch(`/api/chats/${chatId}`, {
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch chat');
  }
  return await res.json();
}

export async function createNewChat() {
  const res = await fetch('/api/chats', {
    method: 'POST',
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Failed to create new chat');
  }
  return await res.json();
}

export async function addMessageToChat(chatId, message) {
  const res = await fetch(`/api/chats/${chatId}/message`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(message),
  });
  if (!res.ok) {
    throw new Error('Failed to add message to chat');
  }
  return await res.json();
}

/*
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
  */