import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import BuyerSidebar from "@/components/dashboards/BuyerSidebar";
import RoleSwitcher from "@/components/common/RoleSwitcher";
import ChatClient from "@/components/messaging/ChatClient";

export const revalidate = 0;

export default async function BuyerMessagesPage() {
  const conversations = await prisma.conversation.findMany({
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  const formatted = conversations.map((c) => ({
    ...c,
    updatedAt: c.updatedAt.toISOString(),
    messages: c.messages.map((m) => ({
      ...m,
      createdAt: m.createdAt.toISOString(),
    })),
  }));

  return (
    <div className="min-h-screen bg-surface flex">
      <BuyerSidebar />
      <div className="flex-1 md:pl-72 flex flex-col min-w-0">
        <header className="h-20 bg-surface/80 backdrop-blur-xl border-b border-border-subtle px-6 sm:px-8 flex items-center justify-between gap-4 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <Link href="/" className="md:hidden text-primary font-bold font-serif text-lg">
              EP
            </Link>
            <div className="flex items-center gap-2 text-xs font-mono text-outline">
              <span className="material-symbols-outlined text-[16px] text-chart-accent">lock</span>
              <span className="text-on-surface">Encrypted Communications // Private Desk</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <RoleSwitcher />
          </div>
        </header>

        <main className="flex-1 p-6 sm:p-8 space-y-6 max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl text-primary font-normal">
                Confidential Inquiry Channels
              </h1>
              <p className="text-xs text-secondary font-light">
                Direct encrypted liaison with Senior Private Advisors and Family Office mandate desks.
              </p>
            </div>
          </div>

          <ChatClient initialConversations={formatted as any} portalType="buyer" />
        </main>
      </div>
    </div>
  );
}
