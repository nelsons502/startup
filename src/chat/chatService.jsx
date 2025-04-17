const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
const apiUrl = import.meta.env.VITE_OPENROUTER_API_URL || "https://openrouter.ai/api/v1/chat/completions";
const model = import.meta.env.VITE_OPENROUTER_API_MODEL || "qwen/qwen-2.5-coder-32b-instruct:free";

export async function sendMessageToAI(messages) {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: messages.map(({ role, content }) => ({ role, content })),
      }),
    });

    if (!response.ok) throw new Error("Failed to get response from OpenRouter");

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "No response.";
  } catch (error) {
    console.error("AI error:", error);
    return "Sorry, something went wrong.";
  }
}
