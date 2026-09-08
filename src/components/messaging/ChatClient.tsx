"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";

interface MessageItem {
  id: string;
  conversationId: string;
  senderName: string;
  senderRole: string;
  content: string;
  createdAt: string;
  isRead: boolean;
}

interface ConversationItem {
  id: string;
  title: string;
  propertyId?: string | null;
  updatedAt: string;
  messages: MessageItem[];
}

interface ChatClientProps {
  initialConversations: ConversationItem[];
  portalType: "buyer" | "agent";
}

export default function ChatClient({
  initialConversations,
  portalType,
}: ChatClientProps) {
  const { user } = useAuthStore();
  const [conversations, setConversations] = useState<ConversationItem[]>(initialConversations);
  const [activeConvId, setActiveConvId] = useState<string>(
    initialConversations[0]?.id || ""
  );
  const [inputText, setInputText] = useState("");
  const [sending, setSending] = useState(false);

  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConv) return;

    const currentText = inputText;
    setInputText("");
    setSending(true);

    const senderRole = portalType === "agent" ? "Senior Private Advisor" : "Principal / Buyer";
    const senderName = user.name || (portalType === "agent" ? "Kenjiro Takahashi" : "Lord Sterling Sterling");

    const optimisticMsg: MessageItem = {
      id: `msg-${Date.now()}`,
      conversationId: activeConv.id,
      senderName,
      senderRole,
      content: currentText,
      createdAt: new Date().toISOString(),
      isRead: true,
    };

    // Optimistic update
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConv.id
          ? { ...c, messages: [...c.messages, optimisticMsg], updatedAt: new Date().toISOString() }
          : c
      )
    );

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId: activeConv.id,
          senderName,
          senderRole,
          content: currentText,
        }),
      });

      const data = await res.json();
      if (data?.data?.id) {
        setConversations((prev) =>
          prev.map((c) =>
            c.id === activeConv.id
              ? {
                  ...c,
                  messages: c.messages.map((m) =>
                    m.id === optimisticMsg.id ? { ...m, id: data.data.id } : m
                  ),
                }
              : c
          )
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="h-[calc(100vh-10rem)] rounded-2xl bg-surface-card border border-border-subtle overflow-hidden flex flex-col shadow-2xl">
      {/* Top Security Banner */}
      <div className="bg-surface-container-lowest border-b border-border-subtle px-6 py-2.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-status-verified font-mono">
          <span className="w-2 h-2 rounded-full bg-status-verified animate-pulse"></span>
          <span>Encrypted Mandate Communication Protocol (256-Bit E2EE)</span>
        </div>
        <div className="flex items-center gap-3 text-outline font-mono text-[10px]">
          <span>Notarized Handshake: Active</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">Portal: {portalType === "agent" ? "Broker Desk" : "Investor Vault"}</span>
        </div>
      </div>

      <div className="flex-1 flex min-h-0">
        {/* Left: Active Inquiries List */}
        <div className="w-80 border-r border-border-subtle bg-surface-container-lowest/50 flex flex-col hidden sm:flex">
          <div className="p-4 border-b border-border-subtle">
            <h4 className="font-serif text-sm text-primary font-medium">Confidential Threads</h4>
            <span className="text-[10px] text-secondary font-mono">{conversations.length} Active Mandates</span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-border-subtle">
            {conversations.map((conv) => {
              const active = conv.id === activeConv?.id;
              const lastMsg = conv.messages[conv.messages.length - 1];

              return (
                <button
                  key={conv.id}
                  onClick={() => setActiveConvId(conv.id)}
                  className={`w-full text-left p-4 transition-colors ${
                    active ? "bg-surface-container-high" : "hover:bg-surface-container/40"
                  }`}
                >
                  <span className="font-serif text-xs font-medium text-primary block truncate">
                    {conv.title}
                  </span>
                  <p className="text-[11px] text-secondary truncate mt-1 font-light">
                    {lastMsg ? lastMsg.content : "No messages yet"}
                  </p>
                  <span className="text-[9px] font-mono text-outline block mt-1">
                    {new Date(conv.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Message Feed & Input */}
        <div className="flex-1 flex flex-col min-w-0 bg-surface">
          {/* Thread Header */}
          <div className="h-16 px-6 border-b border-border-subtle flex items-center justify-between bg-surface-container-lowest">
            <div>
              <h3 className="font-serif text-base text-primary font-medium">
                {activeConv?.title || "Confidential Conversation"}
              </h3>
              <span className="text-[10px] text-secondary font-mono">
                Participants: Lead Partner &amp; Private Principal
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/vip-viewing"
                className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-[10px] font-mono uppercase text-chart-accent border border-chart-accent/30 transition-colors"
              >
                Charter Flight
              </Link>
              <Link
                href="/compare"
                className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-[10px] font-mono uppercase text-secondary hover:text-primary border border-border-hairline transition-colors"
              >
                Compare
              </Link>
            </div>
          </div>

          {/* Messages Scroll Feed */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {activeConv?.messages.map((msg) => {
              const isMine =
                (portalType === "agent" && msg.senderRole.includes("Advisor")) ||
                (portalType === "buyer" && msg.senderRole.includes("Buyer"));

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMine ? "items-end" : "items-start"}`}
                >
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-xs font-serif font-medium text-primary">
                      {msg.senderName}
                    </span>
                    <span className="text-[9px] font-mono text-outline uppercase">
                      {msg.senderRole}
                    </span>
                    <span className="text-[9px] font-mono text-outline">
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>

                  <div
                    className={`max-w-lg p-4 rounded-2xl text-xs leading-relaxed font-light ${
                      isMine
                        ? "bg-primary text-on-primary rounded-tr-none shadow-lg"
                        : "bg-surface-container-high text-on-surface rounded-tl-none border border-border-subtle"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Input Footer */}
          <form
            onSubmit={handleSendMessage}
            className="p-4 border-t border-border-subtle bg-surface-container-lowest flex items-center gap-3"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Transmit confidential message or term sheet inquiry..."
              className="flex-1 px-4 py-3 rounded-xl bg-surface text-xs text-primary placeholder:text-outline border border-border-subtle focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              disabled={sending || !inputText.trim()}
              className="px-6 py-3 rounded-xl bg-primary text-on-primary text-xs font-semibold uppercase tracking-wider hover:bg-primary-container disabled:opacity-30 transition-all flex items-center gap-2 shadow"
            >
              <span>Send</span>
              <span className="material-symbols-outlined text-[16px]">send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
