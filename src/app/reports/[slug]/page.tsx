import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import ReportActionBar from "@/components/reports/ReportActionBar";
import Link from "next/link";

export const revalidate = 0;

interface ReportDetailPageProps {
  params: { slug: string };
}

export default async function ReportDetailPage({ params }: ReportDetailPageProps) {
  const monograph = await prisma.monographReport.findUnique({
    where: { slug: params.slug },
  });

  if (!monograph) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-outline">
            <Link href="/" className="hover:text-primary transition-colors">EstatePro</Link>
            <span>/</span>
            <Link href="/reports" className="hover:text-primary transition-colors">Reports</Link>
            <span>/</span>
            <span className="text-secondary truncate">{monograph.title}</span>
          </div>

          {/* Title Header */}
          <div className="space-y-4 text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2">
              <span className="px-3 py-1 rounded-full bg-surface-container text-[10px] uppercase font-mono tracking-widest text-primary border border-white/10">
                {monograph.volume}
              </span>
              <span className="px-3 py-1 rounded-full bg-chart-accent/20 text-[10px] uppercase font-mono tracking-widest text-chart-accent border border-chart-accent/30">
                {monograph.category}
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl text-primary font-normal leading-tight">
              {monograph.title}
            </h1>
            {monograph.subtitle && (
              <p className="text-xs sm:text-sm font-mono uppercase text-outline">
                {monograph.subtitle}
              </p>
            )}
            <div className="text-xs text-outline pt-2">
              Published by EstatePro Capital Research Desk • {monograph.publishedAt.toISOString().split("T")[0]}
            </div>
          </div>

          {/* Hero Media */}
          {monograph.coverImage && (
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden bg-surface-card border border-border-subtle shadow-2xl">
              <img
                src={monograph.coverImage}
                alt={monograph.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Executive Summary Callout */}
          <div className="p-6 sm:p-8 rounded-2xl bg-surface-container-low border border-border-subtle space-y-2">
            <span className="text-[10px] uppercase font-mono text-outline tracking-widest block">
              Executive Summary &amp; Key Findings
            </span>
            <p className="font-serif text-base sm:text-lg text-primary italic leading-relaxed">
              "{monograph.summary}"
            </p>
          </div>

          {/* Narrative Content */}
          <div className="prose prose-invert max-w-none text-sm text-secondary font-light leading-relaxed space-y-6 pt-4 border-t border-border-subtle">
            <p className="text-base text-on-surface leading-relaxed font-normal">
              {monograph.content}
            </p>
            <p>
              Capital allocation across ultra-prime residential hubs continues to be governed by unencumbered physical security, fiscal stability, and sovereign title guarantees. Our telemetry monitors private banking transaction clearing across Geneva, Zurich, Tokyo, New York, and London.
            </p>
            <p>
              Family offices seeking to hedge against currency depreciation are systematically prioritizing architectural landmarks that feature self-sufficient micro-grids, private aviation access, and historical rarity value that cannot be replicated.
            </p>
          </div>

          {/* Download & Share Bar */}
          <ReportActionBar />
        </article>
      </main>
      <Footer />
    </div>
  );
}
