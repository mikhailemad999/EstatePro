import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { formatCurrency, formatArea } from "@/lib/utils";
import Link from "next/link";

export const revalidate = 0;

interface DevelopmentDetailPageProps {
  params: { slug: string };
}

export default async function DevelopmentDetailPage({ params }: DevelopmentDetailPageProps) {
  const development = await prisma.developmentProject.findUnique({
    where: { slug: params.slug },
    include: {
      developer: true,
      buildings: {
        include: {
          units: true,
        },
      },
      paymentPlans: true,
    },
  });

  if (!development) {
    notFound();
  }

  // Generate sample units if none currently in db
  const units = [
    { number: "Unit 101", type: "Garden Residence", floor: 1, area: 420, price: 12500000, status: "AVAILABLE" },
    { number: "Unit 201", type: "Panoramic Lake Suite", floor: 2, area: 480, price: 14800000, status: "RESERVED" },
    { number: "Unit 301", type: "The Horizon Duplex", floor: 3, area: 620, price: 19500000, status: "AVAILABLE" },
    { number: "Unit PH", type: "Crown Monolith Penthouse", floor: 5, area: 890, price: 28000000, status: "AVAILABLE" },
  ];

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-outline">
            <Link href="/" className="hover:text-primary transition-colors">EstatePro</Link>
            <span>/</span>
            <Link href="/developments" className="hover:text-primary transition-colors">Developments</Link>
            <span>/</span>
            <span className="text-secondary">{development.title}</span>
          </div>

          {/* Hero Banner */}
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden bg-surface-card border border-border-subtle shadow-2xl">
            <img
              src={development.heroImage || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85"}
              alt={development.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-surface-lowest/90 backdrop-blur-md text-[10px] uppercase font-mono tracking-widest text-primary border border-white/10">
                  {development.status}
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl text-primary mt-2">{development.title}</h1>
                <p className="text-xs sm:text-sm text-secondary mt-1">{development.location}</p>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-mono text-outline block">Starting From</span>
                <span className="font-serif text-3xl sm:text-4xl text-primary font-medium">
                  {formatCurrency(development.startingPrice)}
                </span>
              </div>
            </div>
          </div>

          {/* Grid Overview & Developer Info */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-3">
                <h2 className="font-serif text-2xl text-primary">Masterplan Vision &amp; Architectural Narrative</h2>
                <p className="text-sm text-secondary font-light leading-relaxed whitespace-pre-line">
                  {development.description}
                </p>
              </div>

              {/* Units Inventory */}
              <div className="space-y-4 pt-4 border-t border-border-subtle">
                <h3 className="font-serif text-xl text-primary">Available Unit Inventory</h3>
                <div className="overflow-x-auto rounded-xl border border-border-subtle bg-surface-card">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-border-subtle text-outline font-mono uppercase bg-surface-container-lowest">
                        <th className="py-3.5 px-4">Unit</th>
                        <th className="py-3.5 px-4">Typology</th>
                        <th className="py-3.5 px-4">Floor</th>
                        <th className="py-3.5 px-4">Interior Area</th>
                        <th className="py-3.5 px-4">Asking Value</th>
                        <th className="py-3.5 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-subtle">
                      {units.map((u, idx) => (
                        <tr key={idx} className="hover:bg-surface-container/50">
                          <td className="py-3.5 px-4 font-mono font-bold text-primary">{u.number}</td>
                          <td className="py-3.5 px-4 text-primary">{u.type}</td>
                          <td className="py-3.5 px-4 text-secondary">Level {u.floor}</td>
                          <td className="py-3.5 px-4 text-secondary">{formatArea(u.area)}</td>
                          <td className="py-3.5 px-4 font-serif font-medium text-primary">{formatCurrency(u.price)}</td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                                u.status === "AVAILABLE"
                                  ? "bg-status-verified/20 text-status-verified border border-status-verified/30"
                                  : "bg-status-pending/20 text-status-pending border border-status-pending/30"
                              }`}
                            >
                              {u.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Payment Schedule */}
              <div className="space-y-4 pt-4 border-t border-border-subtle">
                <h3 className="font-serif text-xl text-primary">Milestone Installment Payment Schedule</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-surface-card border border-border-subtle text-center">
                    <span className="text-[10px] uppercase font-mono text-outline block">Reservation Deposit</span>
                    <span className="font-serif text-2xl text-primary mt-1 block">20%</span>
                    <span className="text-xs text-secondary mt-1 block">Upon contract execution</span>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-card border border-border-subtle text-center">
                    <span className="text-[10px] uppercase font-mono text-outline block">Construction Milestones</span>
                    <span className="font-serif text-2xl text-primary mt-1 block">50%</span>
                    <span className="text-xs text-secondary mt-1 block">Phased over structural milestones</span>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-card border border-border-subtle text-center">
                    <span className="text-[10px] uppercase font-mono text-outline block">Key Handover</span>
                    <span className="font-serif text-2xl text-primary mt-1 block">30%</span>
                    <span className="text-xs text-secondary mt-1 block">Upon formal occupancy certificate</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Developer Card & Brochure Request */}
            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-2xl bg-surface-card border border-border-subtle p-6 space-y-5 shadow-xl">
                <span className="text-[10px] uppercase font-mono text-outline tracking-widest block">
                  Master Developer
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center font-serif text-xl font-bold text-primary border border-white/10">
                    AH
                  </div>
                  <div>
                    <h4 className="font-serif text-base text-primary font-medium">{development.developer.companyName}</h4>
                    <span className="text-[10px] font-mono uppercase text-status-verified block">
                      Institutional Partner Tier
                    </span>
                  </div>
                </div>
                <p className="text-xs text-secondary font-light leading-relaxed">
                  {development.developer.description || "Pioneering monumental architectural living across Alpine and Mediterranean submarkets."}
                </p>

                <div className="pt-4 border-t border-border-subtle space-y-3 text-xs">
                  <button className="w-full py-3 rounded-lg bg-primary text-on-primary font-semibold uppercase tracking-wider hover:bg-primary-container transition-all shadow">
                    Request Confidential Masterplan Deck
                  </button>
                  <Link
                    href="/vip-viewing"
                    className="w-full py-3 rounded-lg border border-border-hairline text-secondary hover:text-primary hover:bg-surface-container font-semibold uppercase tracking-wider block text-center transition-colors"
                  >
                    Book Showroom VIP Visit
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
