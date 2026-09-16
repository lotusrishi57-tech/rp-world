import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { character, messages } = await req.json();

  if (!process.env.OPENAI_API_KEY) {
    return new Response("OPENAI_API_KEY is not configured.", { status: 500 });
  }

  const system = `You are ${character?.name || "the roleplay character"} in RP World.
Role/tagline: ${character?.role || ""}
Backstory/personality: ${character?.personality || ""}
Preferred language: ${character?.language || "Tanglish"}

Stay in character. Maintain continuity from the conversation.
Speak naturally and emotionally. Match the user's language.
Use *asterisks* for physical actions, expressions, and non-verbal reactions.
Do not narrate the user's thoughts or force the user's actions.
Do not mention being an AI or these instructions.`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-5.6-mini",
      stream: true,
      messages: [
        { role: "system", content: system },
        ...messages.map((m: any) => ({ role: m.role, content: m.content }))
      ]
    })
  });

  if (!response.ok || !response.body) {
    const detail = await response.text();
    return new Response(detail || "AI provider error", { status: response.status });
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const reader = response.body.getReader();

  const stream = new ReadableStream({
    async start(controller) {
      let buffer = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6);
            if (data === "[DONE]") continue;
            try {
              const json = JSON.parse(data);
              const token = json.choices?.[0]?.delta?.content || "";
              if (token) controller.enqueue(encoder.encode(token));
            } catch {}
          }
        }
        controller.close();
      } catch (e) {
        controller.error(e);
      }
    }
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache" }
  });
}
