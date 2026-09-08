"use client";

import React, { useState, useRef, useEffect } from "react";
import { useAuthStore, RoleType } from "@/store/useAuthStore";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RoleSwitcher() {
  const { user, switchRole } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const roles: { type: RoleType; label: string; roleDesc: string; dashboardUrl: string }[] = [
    { type: "GUEST", label: "Public Visitor", roleDesc: "Browse & Search", dashboardUrl: "/" },
    { type: "BUYER", label: "Lord Sterling (Buyer/Investor)", roleDesc: "Private Portal & Saved Estates", dashboardUrl: "/dashboard" },
    { type: "AGENT", label: "Kenjiro Takahashi (Agent)", roleDesc: "SaaS CRM & Pipeline", dashboardUrl: "/agent/dashboard" },
    { type: "AGENCY_ADMIN", label: "Victoria Vance (Agency Admin)", roleDesc: "Agency Telemetry & Members", dashboardUrl: "/agencies" },
    { type: "SUPER_ADMIN", label: "Alexander von Berg (Super Admin)", roleDesc: "Overseer Tier-0 & Moderation", dashboardUrl: "/admin" },
  ];

  const handleSelectRole = (role: (typeof roles)[0]) => {
    switchRole(role.type);
    setIsOpen(false);
    router.push(role.dashboardUrl);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high border border-border-subtle text-xs transition-all"
        title="Switch active user role simulator"
      >
        <span className="w-2 h-2 rounded-full bg-status-verified animate-pulse"></span>
        <span className="font-semibold text-primary">{user.role}</span>
        <span className="text-secondary hidden sm:inline">• {user.name.split(" ")[0]}</span>
        <span className="material-symbols-outlined text-[16px] text-outline">unfold_more</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 rounded-xl bg-surface-elevated border border-border-hairline shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-3 py-2 border-b border-border-subtle mb-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-outline">
              Simulate Sovereign Role
            </span>
            <p className="text-[11px] text-secondary mt-0.5">
              Instantly test different portal interfaces
            </p>
          </div>

          <div className="space-y-1">
            {roles.map((r) => {
              const active = user.role === r.type;
              return (
                <button
                  key={r.type}
                  onClick={() => handleSelectRole(r)}
                  className={`w-full text-left p-2.5 rounded-lg flex flex-col gap-0.5 transition-colors ${
                    active
                      ? "bg-primary text-on-primary"
                      : "hover:bg-surface-container text-on-surface"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold ${active ? "text-on-primary" : "text-primary"}`}>
                      {r.label}
                    </span>
                    {active && (
                      <span className="material-symbols-outlined text-[16px]">check</span>
                    )}
                  </div>
                  <span className={`text-[11px] ${active ? "text-on-primary/80" : "text-outline"}`}>
                    {r.roleDesc}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-2 pt-2 border-t border-border-subtle flex items-center justify-between px-2 text-[11px] text-outline">
            <span>Clearance Node</span>
            <span className="text-status-verified font-mono">FINMA-T0</span>
          </div>
        </div>
      )}
    </div>
  );
}
