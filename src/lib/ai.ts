// Universal AI helper - works with z-ai-web-dev-sdk (container) or OpenAI API (Vercel)

type ChatRole = "system" | "user" | "assistant";

interface ChatMessage {
  role: ChatRole;
  content: string;
}

async function getAICompletion(messages: ChatMessage[]) {
  // Try z-ai-web-dev-sdk first (container environment)
  try {
    const ZAI = (await import("z-ai-web-dev-sdk")).default;
    const zai = await ZAI.create();
    const completion = await zai.chat.completions.create({ messages });
    return completion.choices?.[0]?.message?.content || null;
  } catch {
    // Fallback to OpenAI-compatible API (Vercel environment)
    const apiKey = process.env.OPENAI_API_KEY;
    const baseUrl = process.env.OPENAI_BASE_URL || "https://api.openai.com/v1";
    const model = process.env.AI_MODEL || "gpt-3.5-turbo";

    if (!apiKey) {
      throw new Error("No AI API configured. Set OPENAI_API_KEY env variable.");
    }

    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ model, messages }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`API error: ${res.status} - ${errText}`);
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content || null;
  }
}

// Universal search helper
async function webSearch(query: string, num: number = 10) {
  try {
    const ZAI = (await import("z-ai-web-dev-sdk")).default;
    const zai = await ZAI.create();
    return await zai.functions.invoke("web_search", { query, num });
  } catch {
    // No web search available in Vercel environment
    return [];
  }
}

export { getAICompletion, webSearch };
export type { ChatMessage, ChatRole };
