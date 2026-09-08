"use client";

import React, { useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Link from "next/link";

export default function VipViewingPage() {
  const [clientName, setClientName] = useState("Lord Alistair Sterling");
  const [clientEmail, setClientEmail] = useState("a.sterling@sterling-holdings.co.uk");
  const [clientPhone, setClientPhone] = useState("+44 20 7946 0888");
  const [arrivalNode, setArrivalNode] = useState("Geneva Cointrin (GVA) VIP Terminal");
  const [transferMode, setTransferMode] = useState("PRIVATE_AVIATION");
  const [targetEstate, setTargetEstate] = useState("The Solis Cliffside Brutalist Sanctuary");
  const [date, setDate] = useState("2026-03-20");
  const [passengers, setPassengers] = useState(2);
  const [booked, setBooked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName,
          clientEmail,
          clientPhone,
          type: "VIP_AVIATION",
          transferType: transferMode,
          date,
          timeSlot: `Arrival at ${arrivalNode} (${passengers} PAX)`,
          notes: `VIP Flight Itinerary for ${targetEstate}`,
        }),
      });
      setBooked(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
          {/* Header */}
          <div className="text-center space-y-3">
            <span className="text-[10px] uppercase font-mono tracking-widest text-outline">
              Sovereign Concierge Logistics
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-primary">
              Bespoke VIP Aviation &amp; Chauffeur Itinerary
            </h1>
            <p className="text-xs sm:text-sm text-secondary max-w-xl mx-auto font-light">
              Direct point-to-point private air transit, biometric VIP terminal clearance, and confidential armored transfers for international trophy viewings.
            </p>
          </div>

          {booked ? (
            <div className="p-8 sm:p-12 rounded-2xl bg-surface-card border border-border-subtle text-center space-y-5 shadow-2xl">
              <span className="material-symbols-outlined text-6xl text-status-verified">verified</span>
              <h2 className="font-serif text-3xl text-primary">VIP Viewing Itinerary Confirmed</h2>
              <p className="text-xs sm:text-sm text-secondary max-w-md mx-auto leading-relaxed">
                Your sovereign flight manifest has been registered. The private aviation desk at <strong>{arrivalNode}</strong> and your assigned senior advisor will receive your party upon wheel touchdown.
              </p>
              <div className="pt-4 flex justify-center gap-4">
                <Link
                  href="/dashboard/appointments"
                  className="px-6 py-3 rounded-full bg-primary text-on-primary text-xs uppercase font-semibold tracking-wider hover:bg-primary-container transition-all shadow"
                >
                  View Itinerary in Investor Portal
                </Link>
                <Link
                  href="/properties"
                  className="px-6 py-3 rounded-full border border-border-hairline text-secondary hover:text-primary text-xs uppercase tracking-wider"
                >
                  Return to Portfolios
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-2xl bg-surface-card border border-border-subtle p-6 sm:p-10 space-y-8 shadow-2xl">
              {/* Client Credentials */}
              <div className="space-y-4">
                <h3 className="font-serif text-lg text-primary">Principal Client Credentials</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="space-y-1">
                    <label className="text-secondary">Principal Name</label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      required
                      className="w-full px-3 py-2.5 rounded-lg bg-surface-container text-primary border border-white/10 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-secondary">Confidential Email</label>
                    <input
                      type="email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      required
                      className="w-full px-3 py-2.5 rounded-lg bg-surface-container text-primary border border-white/10 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-secondary">Encrypted Telephone / Signal</label>
                    <input
                      type="tel"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      required
                      className="w-full px-3 py-2.5 rounded-lg bg-surface-container text-primary border border-white/10 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Transit Logistics */}
              <div className="space-y-4 pt-4 border-t border-border-subtle">
                <h3 className="font-serif text-lg text-primary">Aviation &amp; Transit Logistics</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <label className="text-secondary">Target Trophy Estate</label>
                    <select
                      value={targetEstate}
                      onChange={(e) => setTargetEstate(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg bg-surface-container text-primary border border-white/10 focus:outline-none cursor-pointer"
                    >
                      <option value="The Solis Cliffside Brutalist Sanctuary">The Solis Cliffside Brutalist Sanctuary ($38.5M)</option>
                      <option value="Palais de la Rive Waterfront Estate">Palais de la Rive Waterfront Estate ($52.0M)</option>
                      <option value="The Sky Pavilion Crown Duplex">The Sky Pavilion Crown Duplex ($24.5M)</option>
                      <option value="Arashiyama Sukiya Bamboo Sanctuary">Arashiyama Sukiya Bamboo Sanctuary ($18.8M)</option>
                      <option value="The Mayfair Sovereign Townhouse">The Mayfair Sovereign Townhouse ($44.0M)</option>
                      <option value="Alpine Ridge Private Chalet">Alpine Ridge Private Chalet ($29.0M)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-secondary">VIP Arrival Hub / FBO Port</label>
                    <select
                      value={arrivalNode}
                      onChange={(e) => setArrivalNode(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg bg-surface-container text-primary border border-white/10 focus:outline-none cursor-pointer"
                    >
                      <option value="Geneva Cointrin (GVA) VIP Terminal">Geneva Cointrin (GVA) • Swiss VIP Executive</option>
                      <option value="Zurich Kloten (ZRH) General Aviation">Zurich Kloten (ZRH) • General Aviation Center</option>
                      <option value="Tokyo Haneda (HND) Premier Gate">Tokyo Haneda (HND) • Premier Gate Terminal</option>
                      <option value="Teterboro Airport (TEB) New York">Teterboro (TEB) • Jet Aviation FBO</option>
                      <option value="London Farnborough (FAB) Airfield">London Farnborough (FAB) • Sovereign Gate</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-secondary">Dedicated Transit Vehicle Mode</label>
                    <select
                      value={transferMode}
                      onChange={(e) => setTransferMode(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg bg-surface-container text-primary border border-white/10 focus:outline-none cursor-pointer"
                    >
                      <option value="PRIVATE_AVIATION">AgustaWestland AW109 Direct Helipad Transit</option>
                      <option value="LUXURY_CHAUFFEUR">Armored Rolls-Royce Phantom Chauffeur Escort</option>
                      <option value="WATERCRAFT">Riva Aquarama Private Lake Tender Mooring</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-secondary">Target Inspection Date</label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="w-full px-3 py-2.5 rounded-lg bg-surface-container text-primary border border-white/10 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-secondary">PAX Manifest Size</label>
                      <input
                        type="number"
                        min={1}
                        max={8}
                        value={passengers}
                        onChange={(e) => setPassengers(Number(e.target.value))}
                        className="w-full px-3 py-2.5 rounded-lg bg-surface-container text-primary border border-white/10 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-outline font-mono">
                  <span className="material-symbols-outlined text-[16px] text-status-verified">verified_user</span>
                  <span>100% Diplomatic &amp; Biometric Discretion</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 rounded-full bg-primary text-on-primary text-xs font-semibold uppercase tracking-wider hover:bg-primary-container transition-all shadow-xl"
                >
                  {loading ? "Lodging Manifest..." : "Submit Aviation Flight Itinerary"}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
