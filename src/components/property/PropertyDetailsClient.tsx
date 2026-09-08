"use client";

import React, { useState } from "react";
import { PropertyCardData } from "@/types";
import { formatCurrency, formatArea, calculateMortgage } from "@/lib/utils";
import { useEstateStore } from "@/store/useEstateStore";
import Link from "next/link";

interface PropertyDetailsClientProps {
  property: PropertyCardData & {
    description: string;
    images: { url: string; altText?: string | null }[];
    amenities: { name: string; category: string }[];
    agent?: {
      id: string;
      title: string;
      licenseNumber?: string | null;
      rating: number;
      reviewCount: number;
      user: {
        name: string;
        phone?: string | null;
        email: string;
        avatar?: string | null;
      };
      agency?: {
        name: string;
      } | null;
    } | null;
  };
  similarProperties: PropertyCardData[];
}

export default function PropertyDetailsClient({
  property,
  similarProperties,
}: PropertyDetailsClientProps) {
  const { isFavorite, toggleFavorite, addToCompare, removeFromCompare, compareList, currency } = useEstateStore();
  const favorited = isFavorite(property.id);
  const inCompare = compareList.includes(property.id);

  const [activeImage, setActiveImage] = useState(
    property.images?.[0]?.url || property.heroImage || ""
  );

  // VIP Viewing Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [clientName, setClientName] = useState("Lord Alistair Sterling");
  const [clientEmail, setClientEmail] = useState("a.sterling@sterling-holdings.co.uk");
  const [transferType, setTransferType] = useState("LUXURY_CHAUFFEUR");
  const [viewingDate, setViewingDate] = useState("2026-03-15");
  const [viewingTime, setViewingTime] = useState("14:00 CET");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Mortgage Calculator inside Details page
  const [downPaymentPercent, setDownPaymentPercent] = useState(25);
  const [interestRate, setInterestRate] = useState(4.25);
  const [durationYears, setDurationYears] = useState(25);
  const calc = calculateMortgage(property.price, downPaymentPercent, interestRate, durationYears);

  const handleBookViewing = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingLoading(true);

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyId: property.id,
          agentId: property.agent?.id,
          clientName,
          clientEmail,
          transferType,
          date: viewingDate,
          timeSlot: viewingTime,
          type: "VIP_AVIATION",
        }),
      });

      if (res.ok) {
        setBookingSuccess(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Top Breadcrumb & Action Bar */}
      <div className="w-full bg-surface-container-lowest border-b border-border-subtle py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-outline">
            <Link href="/" className="hover:text-primary transition-colors">EstatePro</Link>
            <span>/</span>
            <Link href="/properties" className="hover:text-primary transition-colors">Portfolios</Link>
            <span>/</span>
            <span className="text-secondary truncate max-w-xs">{property.title}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (inCompare) removeFromCompare(property.id);
                else addToCompare(property.id);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-colors ${
                inCompare
                  ? "bg-chart-accent text-on-primary border-chart-accent"
                  : "bg-surface-container text-secondary hover:text-primary border-white/10"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">balance</span>
              <span>{inCompare ? "In Compare" : "Compare"}</span>
            </button>

            <button
              onClick={() => toggleFavorite(property.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-colors ${
                favorited
                  ? "bg-error-container text-error border-error/40"
                  : "bg-surface-container text-secondary hover:text-error border-white/10"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{favorited ? "favorite" : "favorite_border"}</span>
              <span>{favorited ? "Saved" : "Save"}</span>
            </button>

            <Link
              href={`/escrow/solis-sanctuary`}
              className="px-3.5 py-1.5 rounded-full bg-primary text-on-primary text-xs font-semibold uppercase tracking-wider hover:bg-primary-container transition-all flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">lock</span>
              <span>Escrow Data Room</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Monograph Gallery Showcase */}
        <div className="space-y-3">
          <div className="relative aspect-[16/9] lg:aspect-[21/9] rounded-2xl overflow-hidden bg-surface-card border border-border-subtle shadow-2xl">
            <img
              src={activeImage}
              alt={property.title}
              className="w-full h-full object-cover transition-all duration-700"
            />
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-surface-lowest/90 backdrop-blur-md text-[10px] uppercase font-mono tracking-widest text-primary border border-white/10">
                {property.refNumber}
              </span>
              <span className="px-3 py-1 rounded-full bg-status-verified/20 backdrop-blur-md text-[10px] uppercase font-mono tracking-widest text-status-verified border border-status-verified/30 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                FINMA / SEC Title Verified
              </span>
            </div>
          </div>

          {/* Gallery Thumbnails */}
          {property.images && property.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img.url)}
                  className={`w-28 h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    activeImage === img.url ? "border-primary scale-105" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img.url} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Title, Pricing & Spec Banner */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-border-subtle">
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-mono text-outline tracking-widest block">
              {property.country} • {property.city} • {property.propertyType}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary font-normal leading-tight">
              {property.title}
            </h1>
            <p className="text-xs sm:text-sm text-secondary flex items-center gap-1.5 font-light">
              <span className="material-symbols-outlined text-[16px] text-outline">location_on</span>
              <span>{property.address}</span>
            </p>
          </div>

          <div className="flex flex-col lg:items-end gap-3 shrink-0">
            <div>
              <span className="text-[10px] uppercase font-mono text-outline lg:text-right block">
                Acquisition Asking Value
              </span>
              <div className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary font-medium tracking-tight">
                {formatCurrency(property.price, currency)}
              </div>
              <span className="text-xs text-secondary lg:text-right block font-light">
                Approx. ${property.pricePerSqm?.toLocaleString() || "28,500"} / m²
              </span>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="px-6 py-3 rounded-full bg-primary text-on-primary font-semibold text-xs uppercase tracking-wider hover:bg-primary-container transition-all shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">flight_takeoff</span>
              <span>Schedule VIP Private Viewing</span>
            </button>
          </div>
        </div>

        {/* 8 Architectural Specification Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {[
            { label: "Bedrooms", val: `${property.bedrooms} Beds`, icon: "bed" },
            { label: "Bathrooms", val: `${property.bathrooms} Baths`, icon: "bathtub" },
            { label: "Living Salons", val: `${property.livingRooms || 2} Salons`, icon: "weekend" },
            { label: "Interior Area", val: formatArea(property.areaSqm), icon: "square_foot" },
            { label: "Land Estate", val: formatArea(property.landAreaSqm || property.areaSqm * 3), icon: "terrain" },
            { label: "Year Built", val: property.buildingYear || 2024, icon: "calendar_today" },
            { label: "Private Parking", val: `${property.parkingSpaces} Vehicles`, icon: "directions_car" },
            { label: "Custody Status", val: "Unencumbered", icon: "verified_user" },
          ].map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-surface-card border border-border-subtle flex flex-col justify-between text-center">
              <span className="material-symbols-outlined text-outline text-[20px] mx-auto mb-1">{item.icon}</span>
              <span className="text-[9px] uppercase font-mono text-outline block">{item.label}</span>
              <span className="text-xs font-semibold text-primary mt-0.5">{item.val}</span>
            </div>
          ))}
        </div>

        {/* Main Content & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Narrative Column */}
          <div className="lg:col-span-8 space-y-10">
            {/* Monograph Narrative */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl text-primary">Architectural Monograph &amp; Provenance</h2>
              <p className="text-sm text-secondary font-light leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="space-y-4 pt-6 border-t border-border-subtle">
              <h3 className="font-serif text-xl text-primary">Curated Asset Amenities &amp; Infrastructures</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.amenities.map((a, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-surface-container/60 border border-border-subtle flex items-center gap-3 text-xs"
                  >
                    <span className="material-symbols-outlined text-chart-accent text-[18px]">check_circle</span>
                    <span className="text-primary font-medium">{a.name}</span>
                    <span className="ml-auto text-[10px] uppercase font-mono text-outline">{a.category}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* In-page Mortgage Estimator */}
            <div className="space-y-4 pt-6 border-t border-border-subtle">
              <h3 className="font-serif text-xl text-primary">Private Debt Financing Matrix</h3>
              <div className="rounded-xl bg-surface-card border border-border-subtle p-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-mono text-outline">Down Payment ({downPaymentPercent}%)</span>
                    <input
                      type="range"
                      min={15}
                      max={50}
                      step={5}
                      value={downPaymentPercent}
                      onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                      className="w-full accent-primary h-1 bg-surface-container appearance-none cursor-pointer"
                    />
                    <span className="text-xs text-primary font-medium">{formatCurrency(calc.downPayment, currency)}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-mono text-outline">Tenure ({durationYears} Yrs)</span>
                    <input
                      type="range"
                      min={10}
                      max={30}
                      step={5}
                      value={durationYears}
                      onChange={(e) => setDurationYears(Number(e.target.value))}
                      className="w-full accent-primary h-1 bg-surface-container appearance-none cursor-pointer"
                    />
                    <span className="text-xs text-primary font-medium">{durationYears} Years</span>
                  </div>

                  <div className="bg-surface-container p-3 rounded-lg flex flex-col justify-between">
                    <span className="text-[10px] uppercase font-mono text-outline">Monthly Debt Service</span>
                    <span className="font-serif text-xl text-primary font-medium">{formatCurrency(calc.monthlyPayment, currency)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sovereign Advisor & Escrow Clearance */}
          <div className="lg:col-span-4 space-y-6">
            {/* Agent Partner Card */}
            {property.agent && (
              <div className="rounded-xl bg-surface-card border border-border-subtle p-6 space-y-5 shadow-xl">
                <span className="text-[10px] uppercase font-mono text-outline tracking-widest block">
                  Mandate Lead Advisor
                </span>

                <div className="flex items-center gap-4">
                  <img
                    src={property.agent.user.avatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"}
                    alt={property.agent.user.name}
                    className="w-16 h-16 rounded-full object-cover border border-white/10"
                  />
                  <div>
                    <h4 className="font-serif text-base text-primary font-medium">{property.agent.user.name}</h4>
                    <p className="text-xs text-secondary">{property.agent.title}</p>
                    <span className="text-[10px] font-mono uppercase text-status-verified block mt-0.5">
                      FINMA Licensed Advisor
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-3 border-t border-border-subtle text-xs">
                  <div className="flex justify-between text-secondary">
                    <span>Brokerage Node:</span>
                    <span className="text-primary font-semibold">{property.agent.agency?.name || "Sotheby's Reserve"}</span>
                  </div>
                  <div className="flex justify-between text-secondary">
                    <span>Clearance Rating:</span>
                    <span className="text-primary font-semibold">{property.agent.rating} / 5.0 ({property.agent.reviewCount} Reviews)</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => setModalOpen(true)}
                    className="w-full py-3 rounded-lg bg-primary text-on-primary text-xs font-semibold uppercase tracking-wider hover:bg-primary-container transition-all shadow"
                  >
                    Direct Consultation
                  </button>
                  <Link
                    href={`/escrow/solis-sanctuary`}
                    className="w-full py-3 rounded-lg border border-border-hairline text-secondary hover:text-primary hover:bg-surface-container text-xs font-semibold uppercase tracking-wider block text-center transition-colors"
                  >
                    Enter Escrow Data Room
                  </Link>
                </div>
              </div>
            )}

            {/* Cryptographic Escrow Badge */}
            <div className="p-5 rounded-xl bg-surface-container-lowest border border-border-subtle space-y-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-status-verified text-[20px]">verified</span>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">Cryptographic Title Escrow</span>
              </div>
              <p className="text-xs text-secondary font-light leading-relaxed">
                All earnest deposits and deeds are held under multi-sig escrow with irrevocable notary validation.
              </p>
              <div className="text-[10px] font-mono uppercase text-outline">
                Node Registry ID: FINMA-SOV-84920
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VIP Viewing Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-surface-elevated border border-border-hairline rounded-2xl p-6 sm:p-8 shadow-2xl relative space-y-6">
            <button
              onClick={() => {
                setModalOpen(false);
                setBookingSuccess(false);
              }}
              className="absolute top-4 right-4 text-outline hover:text-primary"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            {bookingSuccess ? (
              <div className="text-center py-8 space-y-4">
                <span className="material-symbols-outlined text-5xl text-status-verified">verified</span>
                <h3 className="font-serif text-2xl text-primary">VIP Itinerary Confirmed</h3>
                <p className="text-xs text-secondary max-w-sm mx-auto leading-relaxed">
                  Your private viewing itinerary for <strong>{property.title}</strong> has been logged. {property.agent?.user.name} will coordinate arrival logistics and security protocols.
                </p>
                <div className="pt-2">
                  <Link
                    href="/dashboard/appointments"
                    className="inline-block px-6 py-2.5 rounded-full bg-primary text-on-primary text-xs uppercase font-semibold tracking-wider"
                  >
                    View in Private Portal
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookViewing} className="space-y-4">
                <div>
                  <span className="text-[10px] uppercase font-mono text-outline tracking-widest">
                    Private Reserve Concierge
                  </span>
                  <h3 className="font-serif text-2xl text-primary mt-1">
                    Bespoke VIP Viewing Itinerary
                  </h3>
                  <p className="text-xs text-secondary mt-1">
                    Reserve private air or ground transfer and confidential on-site inspection.
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-secondary mb-1">Principal Client Name</label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-lg bg-surface-container text-primary border border-white/10 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-secondary mb-1">Confidential Email</label>
                    <input
                      type="email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-lg bg-surface-container text-primary border border-white/10 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-secondary mb-1">Preferred Date</label>
                      <input
                        type="date"
                        value={viewingDate}
                        onChange={(e) => setViewingDate(e.target.value)}
                        required
                        className="w-full px-3 py-2 rounded-lg bg-surface-container text-primary border border-white/10 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-secondary mb-1">Preferred Time Slot</label>
                      <input
                        type="text"
                        value={viewingTime}
                        onChange={(e) => setViewingTime(e.target.value)}
                        required
                        className="w-full px-3 py-2 rounded-lg bg-surface-container text-primary border border-white/10 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-secondary mb-1">Transfer &amp; Transit Mode</label>
                    <select
                      value={transferType}
                      onChange={(e) => setTransferType(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-surface-container text-primary border border-white/10 focus:outline-none cursor-pointer"
                    >
                      <option value="LUXURY_CHAUFFEUR">Armored Rolls-Royce / Mercedes Maybach Chauffeur</option>
                      <option value="HELICOPTER_TRANSFER">Helicopter Direct Heliport Transfer</option>
                      <option value="PRIVATE_AVIATION">Private Aviation / FBO Jet Mooring Coordination</option>
                      <option value="NONE">Self-Arranged Private Transport</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={bookingLoading}
                    className="w-full py-3 rounded-lg bg-primary text-on-primary text-xs font-semibold uppercase tracking-wider hover:bg-primary-container transition-all shadow"
                  >
                    {bookingLoading ? "Transmitting Clearance..." : "Confirm Viewing Clearance"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
