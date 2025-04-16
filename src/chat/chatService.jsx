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
    const response = await fetch(`/api/chats/${chatId}/message`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({ content: message })
    });

    if (!response.ok) {
        throw new Error("Failed to send message to server");
    }

    return await response.json();
}

export async function createChatOnServer(title) {
    const response = await fetch(`/api/chats`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({ title })
    });

    if (!response.ok) {
        throw new Error("Failed to create chat on server");
    }

    return await response.json();
}