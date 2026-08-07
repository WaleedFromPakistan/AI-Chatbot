"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Script from "next/script";
import type { UIMessage } from "ai";
import { plusJakarta } from "../fonts";
import styles from "./chat.module.css";
import { ChatThread } from "./chat-thread";

interface ConversationSummary {
  id: string;
  title: string;
  updated_at: string;
}

const models = [
  { id: "pro", name: "SoftlexAI Pro", desc: "Advanced reasoning · best quality", icon: "ph-fill ph-sparkle" },
  { id: "fast", name: "SoftlexAI Fast", desc: "Quick everyday answers", icon: "ph-fill ph-lightning" },
  { id: "mini", name: "SoftlexAI Mini", desc: "Lightweight · lowest latency", icon: "ph-fill ph-feather" },
];

function getSessionId(): string {
  let id = localStorage.getItem("chat_session_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("chat_session_id", id);
  }
  return id;
}

export function ChatView() {
  const [ready, setReady] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modelMenu, setModelMenu] = useState(false);
  const [modelId, setModelId] = useState("pro");
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [activeMessages, setActiveMessages] = useState<UIMessage[]>([]);

  const refreshList = useCallback(async (sid: string) => {
    const res = await fetch(`/api/conversations?sessionId=${encodeURIComponent(sid)}`);
    const data = await res.json();
    setConversations(data.conversations ?? []);
    return (data.conversations ?? []) as ConversationSummary[];
  }, []);

  const loadChat = useCallback(async (id: string) => {
    const res = await fetch(`/api/conversations/${id}`);
    const data = await res.json();
    setActiveChatId(id);
    setActiveMessages(data.messages ?? []);
    setMobileOpen(false);
    setModelMenu(false);
  }, []);

  const newChat = useCallback(async (sid: string) => {
    const res = await fetch("/api/conversations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: sid }),
    });
    const data = await res.json();
    const conv = data.conversation as ConversationSummary;
    setConversations((prev) => [conv, ...prev]);
    setActiveChatId(conv.id);
    setActiveMessages([]);
    setMobileOpen(false);
    setModelMenu(false);
  }, []);

  useEffect(() => {
    const sid = getSessionId();
    setSessionId(sid);
    (async () => {
      const list = await refreshList(sid);
      if (list.length > 0) {
        await loadChat(list[0].id);
      } else {
        await newChat(sid);
      }
      setReady(true);
    })();
  }, [refreshList, loadChat, newChat]);

  const onExchangeSettled = useCallback(() => {
    if (sessionId) refreshList(sessionId);
  }, [sessionId, refreshList]);

  const activeChat = conversations.find((c) => c.id === activeChatId);
  const activeModel = models.find((m) => m.id === modelId)!;

  if (!ready) {
    return (
      <div className={`${styles.root} ${plusJakarta.variable}`} style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <span style={{ color: "#B0A69D", fontSize: 14 }}>Loading…</span>
      </div>
    );
  }

  return (
    <div className={`${styles.root} ${plusJakarta.variable}`}>
      <Script src="https://unpkg.com/@phosphor-icons/web@2.1.1" strategy="afterInteractive" />
      <div style={{ display: "flex", height: "100vh", width: "100%", overflow: "hidden", background: "#fff" }}>
        {/* MOBILE BACKDROP */}
        <div
          className={`${styles.mbackdrop} ${mobileOpen ? styles.show : ""}`}
          onClick={() => setMobileOpen(false)}
        />

        {/* SIDEBAR */}
        <aside
          className={`${styles.sidebar} ${mobileOpen ? styles.open : ""}`}
          style={{ flex: "none", width: collapsed ? "0px" : "276px", display: collapsed ? "none" : "flex", flexDirection: "column", background: "#FFFBF8", borderRight: "1px solid #F1E7DF" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 16px 12px" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <span style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg,#FF7A3C,#E85818)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                <i className="ph-fill ph-chat-teardrop-dots" style={{ fontSize: 15 }} />
              </span>
              <span style={{ fontWeight: 800, fontSize: 16.5, letterSpacing: "-.02em" }}>
                Softlex<span style={{ color: "#FF6B2C" }}>AI</span>
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setCollapsed(true)}
              title="Collapse"
              style={{ border: "none", background: "transparent", color: "#8A807A", cursor: "pointer", width: 30, height: 30, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}
            >
              <i className="ph ph-sidebar-simple" />
            </button>
          </div>

          <div style={{ padding: "0 12px 8px" }}>
            <button
              type="button"
              onClick={() => newChat(sessionId)}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, fontSize: 14.5, fontWeight: 700, color: "#fff", background: "linear-gradient(135deg,#FF7A3C,#E85818)", border: "none", padding: "11px 14px", borderRadius: 11, cursor: "pointer", boxShadow: "0 6px 14px rgba(232,88,24,.26)" }}
            >
              <i className="ph-bold ph-plus" style={{ fontSize: 15 }} />
              New chat
            </button>
          </div>

          <div style={{ padding: "8px 12px 4px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, background: "#fff", border: "1px solid #EEE2D8", borderRadius: 10, padding: "8px 11px" }}>
              <i className="ph ph-magnifying-glass" style={{ color: "#B4A99F", fontSize: 15 }} />
              <span style={{ fontSize: 13.5, color: "#B4A99F" }}>Search chats</span>
            </div>
          </div>

          <div className={styles.sidescroll} style={{ flex: 1, overflowY: "auto", padding: "10px 8px 12px" }}>
            <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "#B0A69D", padding: "8px 10px 6px" }}>
              Recent
            </div>
            {conversations.map((chat) => (
              <button
                key={chat.id}
                type="button"
                className={`${styles.histbtn} ${chat.id === activeChatId ? styles.active : ""}`}
                onClick={() => loadChat(chat.id)}
                style={{ width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: 10, border: "none", background: "transparent", padding: "9px 11px", borderRadius: 9, cursor: "pointer", color: "#3A332E", transition: "background .12s" }}
              >
                <i className="ph ph-chat-circle-text" style={{ flex: "none", color: "#C89A82", fontSize: 16 }} />
                <span style={{ flex: 1, fontSize: 13.5, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {chat.title}
                </span>
              </button>
            ))}
          </div>

          <div style={{ borderTop: "1px solid #F1E7DF", padding: 12, display: "flex", alignItems: "center", gap: 11 }}>
            <span style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#FFB98F,#E85818)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 14 }}>
              A
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Alex Morgan</div>
              <div style={{ fontSize: 12, color: "#FF6B2C", fontWeight: 600 }}>Pro plan</div>
            </div>
            <i className="ph ph-gear" style={{ color: "#8A807A", fontSize: 17, cursor: "pointer" }} />
          </div>
        </aside>

        {/* MAIN */}
        <main style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, background: "#fff" }}>
          <header className={styles.topbar} style={{ flex: "none", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 22px", borderBottom: "1px solid #F4ECE5" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button
                type="button"
                className={styles.menubtn}
                onClick={() => setMobileOpen(true)}
                style={{ border: "none", background: "transparent", color: "#8A807A", cursor: "pointer", width: 32, height: 32, borderRadius: 8, fontSize: 20, alignItems: "center", justifyContent: "center" }}
              >
                <i className="ph ph-list" />
              </button>
              {collapsed && (
                <button
                  type="button"
                  className={styles.deskcollapse}
                  onClick={() => setCollapsed(false)}
                  style={{ border: "none", background: "transparent", color: "#8A807A", cursor: "pointer", width: 32, height: 32, borderRadius: 8, fontSize: 19 }}
                >
                  <i className="ph ph-sidebar-simple" />
                </button>
              )}
              <div style={{ fontSize: 15.5, fontWeight: 700, letterSpacing: "-.01em" }}>
                {activeChat ? activeChat.title : "New chat"}
              </div>
            </div>

            {/* model picker */}
            <div style={{ position: "relative" }}>
              <button
                type="button"
                onClick={() => setModelMenu((v) => !v)}
                style={{ display: "flex", alignItems: "center", gap: 8, background: "#FFFBF8", border: "1px solid #EEE2D8", padding: "8px 12px", borderRadius: 10, cursor: "pointer", fontSize: 13.5, fontWeight: 600, color: "#3A332E" }}
              >
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#FF6B2C" }} />
                {activeModel.name}
                <i className="ph-bold ph-caret-down" style={{ fontSize: 12, color: "#8A807A" }} />
              </button>
              {modelMenu && (
                <div style={{ position: "absolute", right: 0, top: 44, width: 250, background: "#fff", border: "1px solid #EEE2D8", borderRadius: 14, boxShadow: "0 18px 40px -14px rgba(90,50,20,.25)", padding: 6, zIndex: 30 }}>
                  {models.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        setModelId(m.id);
                        setModelMenu(false);
                      }}
                      style={{ width: "100%", textAlign: "left", display: "flex", gap: 11, alignItems: "flex-start", border: "none", background: "transparent", padding: "10px 11px", borderRadius: 10, cursor: "pointer" }}
                    >
                      <i className={m.icon} style={{ color: "#E85818", fontSize: 18, marginTop: 1 }} />
                      <span style={{ flex: 1 }}>
                        <span style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#1B1714" }}>{m.name}</span>
                        <span style={{ display: "block", fontSize: 12.5, color: "#8A807A" }}>{m.desc}</span>
                      </span>
                      {m.id === modelId && <i className="ph-bold ph-check" style={{ color: "#FF6B2C", fontSize: 16, marginTop: 2 }} />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </header>

          {activeChatId && (
            <ChatThread
              key={activeChatId}
              conversationId={activeChatId}
              sessionId={sessionId}
              initialMessages={activeMessages}
              userName="Alex"
              onExchangeSettled={onExchangeSettled}
            />
          )}
        </main>
      </div>
    </div>
  );
}
