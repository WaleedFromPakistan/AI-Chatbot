"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import styles from "./chat.module.css";

interface ChatThreadProps {
  conversationId: string;
  sessionId: string;
  initialMessages: UIMessage[];
  userName: string;
  onExchangeSettled: () => void;
}

const suggestions = [
  { icon: "ph-fill ph-pen-nib", title: "Draft an email", sub: "Professional and to the point", text: "Draft a professional email introducing SoftlexAI to a new client." },
  { icon: "ph-fill ph-code", title: "Explain some code", sub: "Line by line", text: "Explain what a React useEffect hook does, with a simple example." },
  { icon: "ph-fill ph-lightbulb", title: "Brainstorm ideas", sub: "Get unstuck fast", text: "Give me 5 creative ideas for a product launch campaign." },
  { icon: "ph-fill ph-list-checks", title: "Make a plan", sub: "Step by step", text: "Make me a 7-day plan to learn the basics of Python." },
];

function textOf(message: UIMessage): string {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => (part as { text: string }).text)
    .join("");
}

export function ChatThread({ conversationId, sessionId, initialMessages, userName, onExchangeSettled }: ChatThreadProps) {
  const [draft, setDraft] = useState("");
  const [focused, setFocused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const prevStatusRef = useRef<string>("ready");

  const { messages, sendMessage, regenerate, status } = useChat({
    id: conversationId,
    messages: initialMessages,
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: { sessionId, conversationId },
    }),
  });

  useEffect(() => {
    if (prevStatusRef.current === "streaming" && status === "ready") {
      onExchangeSettled();
    }
    prevStatusRef.current = status;
  }, [status, onExchangeSettled]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  const autosize = (el: HTMLTextAreaElement | null) => {
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 180) + "px";
  };

  const send = useCallback(() => {
    const text = draft.trim();
    if (!text || status !== "ready") return;
    sendMessage({ text });
    setDraft("");
    if (inputRef.current) inputRef.current.style.height = "auto";
  }, [draft, status, sendMessage]);

  const useSuggestion = (text: string) => {
    setDraft(text);
    setTimeout(() => {
      autosize(inputRef.current);
      inputRef.current?.focus();
    }, 0);
  };

  const empty = messages.length === 0;
  const trimmed = draft.trim();
  const sendDisabled = !trimmed || status !== "ready";

  return (
    <>
      {/* Conversation / empty state */}
      <div ref={scrollRef} className={`${styles.chatscroll}`} style={{ flex: 1, overflowY: "auto", position: "relative" }}>
        {empty ? (
          <div style={{ display: "flex", minHeight: "100%", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center" }}>
            <span style={{ width: 62, height: 62, borderRadius: 18, background: "linear-gradient(135deg,#FF7A3C,#E85818)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 30, boxShadow: "0 14px 30px rgba(232,88,24,.3)" }}>
              <i className="ph-fill ph-chat-teardrop-dots" />
            </span>
            <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-.025em", margin: "22px 0 8px" }}>How can I help, {userName}?</h1>
            <p style={{ fontSize: 16, color: "#7A716A", maxWidth: 440 }}>Ask a question, paste a task, or pick a starting point below.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,240px))", gap: 12, marginTop: 30 }}>
              {suggestions.map((s) => (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => useSuggestion(s.text)}
                  style={{ textAlign: "left", display: "flex", gap: 12, alignItems: "flex-start", background: "#FFFBF8", border: "1px solid #F1E7DF", borderRadius: 14, padding: "15px 16px", cursor: "pointer" }}
                >
                  <i className={`${s.icon}`} style={{ color: "#E85818", fontSize: 19, marginTop: 1 }} />
                  <span style={{ flex: 1 }}>
                    <span style={{ display: "block", fontSize: 14, fontWeight: 700, color: "#1B1714" }}>{s.title}</span>
                    <span style={{ display: "block", fontSize: 13, color: "#8A807A", marginTop: 2 }}>{s.sub}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.thread} style={{ display: "flex", maxWidth: 760, margin: "0 auto", padding: "30px 24px 24px", flexDirection: "column", gap: 26 }}>
            {messages.map((msg, idx) => {
              const isUser = msg.role === "user";
              const text = textOf(msg);
              const isLast = idx === messages.length - 1;
              const isStreamingThis = isLast && !isUser && (status === "submitted" || status === "streaming");
              const showTyping = isStreamingThis && text.length === 0;
              const showActions = !isUser && !isStreamingThis;

              return (
                <div key={msg.id} className={styles.msgUpAnim} style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start" }}>
                  {isUser ? (
                    <div style={{ maxWidth: "78%", background: "linear-gradient(135deg,#FF7A3C,#E85818)", color: "#fff", padding: "13px 17px", borderRadius: "16px 16px 5px 16px", fontSize: 15, lineHeight: 1.55, boxShadow: "0 8px 18px rgba(232,88,24,.22)", whiteSpace: "pre-wrap" }}>
                      {text}
                    </div>
                  ) : (
                    <div style={{ display: "flex", gap: 13, maxWidth: "100%" }}>
                      <span style={{ flex: "none", width: 32, height: 32, borderRadius: 10, background: "#FFF1EA", color: "#E85818", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
                        <i className="ph-fill ph-sparkle" />
                      </span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#B8420F", marginBottom: 5 }}>SoftlexAI</div>
                        <div style={{ fontSize: 15, lineHeight: 1.65, color: "#2A2420", whiteSpace: "pre-wrap" }}>
                          {text}
                          {showTyping && (
                            <span style={{ display: "inline-flex", gap: 5 }}>
                              <span className={styles.dotbAnim} style={{ width: 7, height: 7, borderRadius: "50%", background: "#FF8A57", display: "inline-block" }} />
                              <span className={styles.dotbAnim} style={{ width: 7, height: 7, borderRadius: "50%", background: "#FF8A57", display: "inline-block", animationDelay: ".2s" }} />
                              <span className={styles.dotbAnim} style={{ width: 7, height: 7, borderRadius: "50%", background: "#FF8A57", display: "inline-block", animationDelay: ".4s" }} />
                            </span>
                          )}
                        </div>
                        {showActions && (
                          <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
                            <span
                              role="button"
                              tabIndex={0}
                              onClick={() => navigator.clipboard.writeText(text)}
                              style={{ width: 30, height: 30, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#9A9088", cursor: "pointer", fontSize: 15 }}
                            >
                              <i className="ph ph-copy" />
                            </span>
                            <span style={{ width: 30, height: 30, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#9A9088", cursor: "pointer", fontSize: 15 }}>
                              <i className="ph ph-thumbs-up" />
                            </span>
                            <span style={{ width: 30, height: 30, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#9A9088", cursor: "pointer", fontSize: 15 }}>
                              <i className="ph ph-thumbs-down" />
                            </span>
                            <span
                              role="button"
                              tabIndex={0}
                              onClick={() => regenerate({ messageId: msg.id })}
                              style={{ width: 30, height: 30, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#9A9088", cursor: "pointer", fontSize: 15 }}
                            >
                              <i className="ph ph-arrows-clockwise" />
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* PROMPT BAR */}
      <div className={styles.promptpad} style={{ flex: "none", padding: "12px 24px 20px", background: "linear-gradient(180deg,rgba(255,255,255,0),#fff 30%)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10, background: "#fff", border: `1.5px solid ${focused ? "#FF6B2C" : "#EEE2D8"}`, borderRadius: 20, padding: "10px 10px 10px 16px", boxShadow: "0 8px 26px -12px rgba(90,50,20,.18)", transition: "border-color .15s" }}>
            <span style={{ flex: "none", color: "#B4A99F", fontSize: 21, cursor: "pointer", paddingBottom: 6 }}>
              <i className="ph ph-paperclip" />
            </span>
            <textarea
              ref={inputRef}
              value={draft}
              onChange={(e) => {
                setDraft(e.target.value);
                autosize(e.target);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              rows={1}
              placeholder="Ask SoftlexAI anything…"
              style={{ flex: 1, border: "none", outline: "none", resize: "none", fontSize: 15.5, lineHeight: 1.5, color: "#1B1714", background: "transparent", padding: "6px 0", maxHeight: 180 }}
            />
            <button
              type="button"
              onClick={send}
              disabled={sendDisabled}
              style={{ flex: "none", width: 40, height: 40, borderRadius: 13, border: "none", cursor: sendDisabled ? "default" : "pointer", background: sendDisabled ? "#F0D9CC" : "linear-gradient(135deg,#FF7A3C,#E85818)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, transition: "background .15s,transform .1s" }}
            >
              <i className="ph-fill ph-arrow-up" />
            </button>
          </div>
          <p style={{ textAlign: "center", fontSize: 12, color: "#B0A69D", marginTop: 9 }}>
            SoftlexAI can make mistakes. Consider checking important information.
          </p>
        </div>
      </div>
    </>
  );
}
