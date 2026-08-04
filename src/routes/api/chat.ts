import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { buildSystemPrompt } from "@/lib/chat-prompt.server";

type ChatRequestBody = { messages?: unknown };

const MAX_MESSAGES = 30;
const MAX_CHARS_PER_MESSAGE = 4000;
const MAX_TOTAL_CHARS = 20000;
const MAX_BODY_BYTES = 64 * 1024;

function messageText(message: unknown): string {
  const parts = (message as { parts?: unknown })?.parts;
  if (!Array.isArray(parts)) return "";
  return parts
    .map((part) =>
      part && typeof part === "object" && (part as { type?: string }).type === "text"
        ? String((part as { text?: unknown }).text ?? "")
        : "",
    )
    .join("");
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const raw = await request.text();
        if (raw.length > MAX_BODY_BYTES) {
          return new Response("Request too large", { status: 413 });
        }

        let parsed: ChatRequestBody;
        try {
          parsed = JSON.parse(raw) as ChatRequestBody;
        } catch {
          return new Response("Invalid JSON body", { status: 400 });
        }

        const { messages } = parsed;
        if (!Array.isArray(messages) || messages.length === 0) {
          return new Response("Messages are required", { status: 400 });
        }
        if (messages.length > MAX_MESSAGES) {
          return new Response("Too many messages", { status: 400 });
        }

        let total = 0;
        for (const message of messages) {
          const text = messageText(message);
          if (text.length > MAX_CHARS_PER_MESSAGE) {
            return new Response("Message too long", { status: 400 });
          }
          total += text.length;
        }
        if (total > MAX_TOTAL_CHARS) {
          return new Response("Conversation too long", { status: 400 });
        }

        const key = process.env.LOVABLE_API_KEY;
        if (!key) {
          return new Response("AI is not configured", { status: 500 });
        }

        const gateway = createLovableAiGatewayProvider(key);

        const result = streamText({
          model: gateway("google/gemini-3.6-flash"),
          system: buildSystemPrompt(),
          messages: await convertToModelMessages(messages as UIMessage[]),
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages as UIMessage[],
        });
      },
    },
  },
});
