import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";

const STARTERS = [
  "How does his background map to a Head of Technology Risk mandate?",
  "Outline the third-party risk redesign he led at Diligent.",
  "What is his current remit at JPMorgan Chase?",
  "Which regulatory frameworks has he implemented first-hand?",
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
    <section id="ai-chat" className="overflow-hidden bg-ink px-6 py-24 text-ink-foreground">
      <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2">
        <div>
          <div className="mb-6 flex items-center gap-4">
            <span className="h-px w-10 bg-brand-soft" aria-hidden />
            <p className="text-xs uppercase tracking-[0.24em] text-brand-soft">Enquire Directly</p>
          </div>
          <h2 className="mb-6 font-serif text-3xl font-medium tracking-tight md:text-4xl">
            Examine the record in conversation.
          </h2>
          <p className="mb-8 leading-relaxed text-ink-muted">
            This assistant responds to questions regarding Subhrojeet&apos;s methodology, the
            programmes he has led, the frameworks he has implemented and the suitability of his
            background for a given mandate. Every response is drawn from his professional record.
          </p>

          <div className="flex flex-wrap gap-3">
            {STARTERS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => send(prompt)}
                disabled={busy}
                className="border border-ink-foreground/15 bg-ink-foreground/5 px-4 py-2 text-left text-xs text-ink-muted transition-colors hover:border-brand-soft/50 hover:text-brand-soft disabled:opacity-50"
              >
                &quot;{prompt}&quot;
              </button>
            ))}
          </div>
        </div>

        <div className="flex h-[520px] flex-col border border-ink-foreground/15 bg-ink-foreground/5 p-4 sm:p-6">
          <Conversation className="flex-1">
            <ConversationContent className="gap-5 px-0">
              {messages.length === 0 && (
                <div className="max-w-[85%] rounded-none border-l-2 border-brand-soft bg-ink-foreground/5 p-4 text-sm text-ink-muted">
                  Good day. I can provide detail on Subhrojeet&apos;s work in technology risk,
                  third-party risk, audit and security governance. How may I assist?
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
                          ? "group-[.is-user]:rounded-none group-[.is-user]:bg-brand-soft group-[.is-user]:text-ink"
                          : "group-[.is-assistant]:text-ink-foreground [&_*]:text-ink-foreground"
                      }
                    >
                      <MessageResponse>{text}</MessageResponse>
                    </MessageContent>
                  </Message>
                );
              })}

              {status === "submitted" && (
                <Shimmer className="text-sm text-ink-muted">Thinking...</Shimmer>
              )}

              {error && (
                <p className="text-sm text-red-400">
                  The assistant is temporarily unavailable. Please try again shortly, or use the
                  contact form below.
                </p>
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>

          <PromptInput
            className="mt-4 rounded-none border-ink-foreground/20 bg-ink-foreground/5"
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
              placeholder="Submit an enquiry about his experience..."
              className="text-ink-foreground placeholder:text-ink-muted/60"
            />
            <PromptInputFooter className="justify-end border-ink-foreground/10">
              <PromptInputSubmit status={status} disabled={!input.trim() && !busy} />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </div>
    </section>
  );
}
