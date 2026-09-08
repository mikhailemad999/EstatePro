import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export const revalidate = 0;

export default async function ReportsPage() {
  const monographs = await prisma.monographReport.findMany({
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border-subtle">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-outline">
                Research &amp; Macro Intelligence
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl text-primary mt-1">
                Prime Market Intelligence Monographs
              </h1>
              <p className="text-xs sm:text-sm text-secondary mt-1 font-light max-w-2xl">
                Quarterly research publications examining super-prime residential valuations, global wealth migrations, and cross-border regulatory shifts.
              </p>
            </div>
            <span className="text-xs font-mono text-status-verified">
              Volume IV Active Edition
            </span>
          </div>

          {/* Monographs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {monographs.map((mono) => (
              <div
                key={mono.id}
                className="rounded-2xl bg-surface-card border border-border-subtle overflow-hidden flex flex-col group hover:border-outline-variant transition-all duration-300 shadow-xl"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-surface-container">
                  <img
                    src={mono.coverImage || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80"}
                    alt={mono.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-surface-lowest/90 backdrop-blur-md text-[10px] uppercase font-mono tracking-widest text-primary border border-white/10">
                      {mono.volume}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-chart-accent/20 backdrop-blur-md text-[10px] uppercase font-mono tracking-widest text-chart-accent border border-chart-accent/30">
                      {mono.category}
                    </span>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-2">
                    <h2 className="font-serif text-2xl text-primary leading-snug group-hover:text-secondary-fixed transition-colors">
                      {mono.title}
                    </h2>
                    {mono.subtitle && (
                      <p className="text-xs font-mono uppercase text-outline">{mono.subtitle}</p>
                    )}
                    <p className="text-xs sm:text-sm text-secondary font-light leading-relaxed pt-2">
                      {mono.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border-subtle flex items-center justify-between text-xs">
                    <span className="text-outline">{mono.publishedAt.toISOString().split("T")[0]}</span>
                    <Link
                      href={`/reports/${mono.slug}`}
                      className="px-5 py-2.5 rounded-full bg-primary text-on-primary font-semibold text-xs uppercase tracking-wider hover:bg-primary-container transition-all shadow"
                    >
                      Inspect Monograph →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
