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
    throw new Error('Failed to fetch chat: getChatById');
  }
  return await res.json();
}

export async function createNewChat() {
  const res = await fetch('/api/chats', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'New Chat' }),
  });
  if (!res.ok) {
    throw new Error('Failed to create new chat');
  }
  const newChat = await res.json();
  return newChat;
}

export async function addMessageToChat(chatId, message) {
  const res = await fetch(`/api/chats/${chatId}/message`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(message),
  });
  if (!res.ok) {
    throw new Error('Failed to add message to chat: addMessageToChat');
  }

  const updatedChat = await res.json();
  return updatedChat;
}
