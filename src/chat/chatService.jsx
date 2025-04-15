const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
const apiUrl = import.meta.env.VITE_OPENROUTER_API_URL || "https://openrouter.ai/api/v1/chat/completions";
const model = import.meta.env.VITE_OPENROUTER_API_MODEL || "qwen/qwen-2.5-coder-32b-instruct:free";

/**
 * Sends the full chat history to the OpenRouter API for a response.
 * @param {Array} messages - Full array of messages including user and assistant roles.
 * @returns {string} Assistant's reply content.
 */
export async function sendMessageToAI(messages) {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        messages: formatMessagesForAPI(messages) // Ensure formatMessagesForAPI is applied before sending
      })
    });

    if (!response.ok) throw new Error("Failed to get response from OpenRouter");

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "No response.";
  } catch (error) {
    console.error("AI error:", error);
    return "Sorry, something went wrong.";
  }
}

function formatMessagesForAPI(messages) {
    return messages.map(({ role, content }) => ({ role, content }));
}

export async function sendMessageToServer(chatId, message) {
    // TODO: POST message to your server's /chats/:id/messages
    console.log("Sending message to server:", { chatId, message });
}

export async function createChatOnServer(title) {
    // TODO: POST to /chats with title
    console.log("Creating new chat on server:", title);
    return { id: Date.now(), title, messages: [] }; // placeholder
}