import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import BuyerSidebar from "@/components/dashboards/BuyerSidebar";
import RoleSwitcher from "@/components/common/RoleSwitcher";

export const revalidate = 0;

export default async function AppointmentsPage() {
  const appointments = await prisma.appointment.findMany({
    orderBy: { date: "asc" },
    include: {
      property: true,
      agent: { include: { user: true } },
    },
  });

  return (
    <div className="min-h-screen bg-surface flex">
      <BuyerSidebar />
      <div className="flex-1 md:pl-72 flex flex-col min-w-0">
        <header className="h-20 bg-surface/80 backdrop-blur-xl border-b border-border-subtle px-6 sm:px-8 flex items-center justify-between gap-4 sticky top-0 z-40">
          <div className="flex items-center gap-2 text-xs font-mono text-outline">
            <span>VIP ITINERARIES</span>
            <span>•</span>
            <span className="text-status-verified font-bold">FLIGHTS &amp; GROUND TRANSITS</span>
          </div>
          <RoleSwitcher />
        </header>

        <main className="flex-1 p-6 sm:p-8 space-y-6 max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl text-primary font-normal">
                Scheduled Private Viewings &amp; Aviation Itineraries
              </h1>
              <p className="text-xs text-secondary font-light">
                Confirmed flight manifests, chauffeur pickups, and advisory escorts.
              </p>
            </div>

            <Link
              href="/vip-viewing"
              className="px-5 py-2.5 rounded-full bg-primary text-on-primary text-xs uppercase font-semibold tracking-wider hover:bg-primary-container transition-all shadow"
            >
              + Reserve New VIP Viewing
            </Link>
          </div>

          <div className="space-y-4">
            {appointments.map((appt) => (
              <div
                key={appt.id}
                className="rounded-xl bg-surface-card border border-border-subtle p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined text-2xl">flight_takeoff</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-lg text-primary font-medium">{appt.property?.title || "Sovereign Estate Viewing"}</h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-status-verified/20 text-status-verified font-mono text-[10px] uppercase font-bold">
                        {appt.status}
                      </span>
                    </div>
                    <p className="text-xs text-secondary mt-1">
                      Lead Client: <strong>{appt.clientName}</strong> ({appt.clientEmail})
                    </p>
                    <p className="text-[11px] text-outline mt-0.5 font-light">
                      Transfer Type: {appt.transferType} • Time: {appt.timeSlot}
                    </p>
                    {appt.notes && (
                      <p className="text-[11px] text-chart-accent mt-1 italic">
                        "{appt.notes}"
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-outline">{new Date(appt.date).toLocaleDateString()}</span>
                  <Link
                    href="/vip-viewing"
                    className="px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs text-primary font-semibold transition-colors"
                  >
                    View Manifest
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
