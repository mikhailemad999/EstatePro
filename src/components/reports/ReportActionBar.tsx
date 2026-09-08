"use client";

import React from "react";
import Link from "next/link";

export default function ReportActionBar() {
  return (
    <div className="pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
      <button
        type="button"
        onClick={() => window.print()}
        className="px-6 py-3 rounded-full bg-primary text-on-primary text-xs font-semibold uppercase tracking-wider hover:bg-primary-container transition-all shadow flex items-center gap-2"
      >
        <span className="material-symbols-outlined text-[18px]">download</span>
        <span>Download PDF Research Monograph</span>
      </button>
      <Link
        href="/reports"
        className="text-xs uppercase font-semibold text-secondary hover:text-primary transition-colors"
      >
        ← Return to Research Hub
      </Link>
    </div>
  );
}
