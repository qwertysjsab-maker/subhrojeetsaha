import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";

const STARTERS = [
  "Why is he a strong fit for a Technology Risk lead role?",
  "Walk me through his TPRM redesign at Diligent.",
  "What is he doing at JPMorgan Chase today?",
  "Which frameworks has he actually implemented?",
];

export function ChatSection() {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const hasInteracted = useRef(false);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (!hasInteracted.current) return;
    if (!busy) textareaRef.current?.focus();
  }, [busy]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    hasInteracted.current = true;
    void sendMessage({ text: trimmed });
    setInput("");
  };

  return (
    <section
      id="ai-chat"
      className="overflow-hidden bg-slate-950 px-6 py-24 text-white"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2">
        <div>
          <h2 className="mb-6 font-mono text-4xl font-bold italic tracking-tight text-brand">
            Query the Expert_
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-slate-400">
            Ask about Subhrojeet&apos;s methodology, the programs he has run,
            the frameworks he has implemented, or whether his background maps to
            the role you are hiring for. The assistant answers from his actual
            record — nothing embellished.
          </p>
          <div className="flex flex-wrap gap-3">
            {STARTERS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => send(prompt)}
                disabled={busy}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-left font-mono text-xs text-slate-300 transition-colors hover:border-brand/40 hover:text-brand disabled:opacity-50"
              >
                &quot;{prompt}&quot;
              </button>
            ))}
          </div>
        </div>

        <div className="flex h-[520px] flex-col rounded-2xl border border-white/10 bg-slate-900 p-4 sm:p-6">
          <Conversation className="flex-1">
            <ConversationContent className="gap-5 px-0">
              {messages.length === 0 && (
                <div className="max-w-[85%] rounded-xl rounded-bl-none bg-white/5 p-4 text-sm text-slate-300">
                  Hello — I can walk you through Subhrojeet&apos;s work in
                  technology risk, third-party risk, audit and security
                  governance. What would you like to know?
                </div>
              )}

              {messages.map((message) => {
                const text = message.parts
                  .map((part) => (part.type === "text" ? part.text : ""))
                  .join("");
                if (!text) return null;

                return (
                  <Message key={message.id} from={message.role}>
                    <MessageContent
                      className={
                        message.role === "user"
                          ? "group-[.is-user]:bg-brand group-[.is-user]:text-brand-foreground"
                          : "group-[.is-assistant]:text-white [&_*]:text-white"
                      }
                    >
                      <MessageResponse>{text}</MessageResponse>
                    </MessageContent>
                  </Message>
                );
              })}

              {status === "submitted" && (
                <Shimmer className="text-sm text-slate-400">
                  Thinking...
                </Shimmer>
              )}

              {error && (
                <p className="text-sm text-red-400">
                  The assistant is unavailable right now. Please try again in a
                  moment, or use the contact form below.
                </p>
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>

          <PromptInput
            className="mt-4 border-white/15 bg-white/5"
            onSubmit={(_message, event) => {
              event.preventDefault();
              send(input);
            }}
          >
            <PromptInputTextarea
              ref={textareaRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onFocus={() => {
                hasInteracted.current = true;
              }}
              placeholder="Ask about his experience..."
              className="text-slate-100 placeholder:text-slate-500"
            />
            <PromptInputFooter className="justify-end border-white/10">
              <PromptInputSubmit
                status={status}
                disabled={!input.trim() && !busy}
              />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </div>
    </section>
  );
}

