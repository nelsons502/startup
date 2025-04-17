export async function getChats() {
  const res = await fetch('/api/chats', {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to fetch chats');
  return res.json();
}

export async function getChatById(chatId) {
  const res = await fetch(`/api/chats/${chatId}`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to fetch chat by ID');
  return res.json();
}

export async function createNewChat(title = `Chat ${new Date(Date.now()).toLocaleString()}`)  {
  const res = await fetch('/api/chats', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error('Failed to create new chat');
  return res.json();
}

export async function addMessageToChat(chatId, message) {
  const res = await fetch(`/api/chats/${chatId}/message`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(message),
  });
  if (!res.ok) throw new Error('Failed to add message to chat');
  return res.json();
}