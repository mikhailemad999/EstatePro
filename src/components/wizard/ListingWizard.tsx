"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { formatCurrency, formatArea } from "@/lib/utils";

export default function ListingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "The Belvedere Alpine Estate",
    description: "An incomparable private alpine redoubt positioned above St. Moritz, commanding unobstructed vistas across the Engadin valley lakes. Finished with aged Valser quartzite stone and master-crafted Swiss pine.",
    propertyType: "Alpine Chalets",
    listingType: "FOR_SALE",
    price: 36000000,
    currency: "USD",
    serviceCharge: 85000,
    country: "Switzerland",
    city: "St. Moritz",
    district: "Suvretta Hill",
    address: "Via Suvretta 19, 7500 St. Moritz",
    bedrooms: 7,
    bathrooms: 8.5,
    livingRooms: 3,
    areaSqm: 1250,
    landAreaSqm: 4200,
    parkingSpaces: 5,
    buildingYear: 2024,
    heroImage: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1200&q=85",
    amenities: ["Private Helipad", "Indoor Heated Thermal Pool", "Valser Stone Wine Cellar", "Direct Ski-in/Ski-out"],
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, 6));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          refNumber: `EST-${Math.floor(10000 + Math.random() * 90000)}`,
          status: "PUBLISHED", // Published directly or pending review
        }),
      });

      if (res.ok) {
        setIsSuccess(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    "Identity & Typology",
    "Location & Geo",
    "Pricing & Terms",
    "Architectural Specs",
    "Media & Photography",
    "Compliance Review",
  ];

  if (isSuccess) {
    return (
      <div className="p-8 sm:p-12 rounded-2xl bg-surface-card border border-border-subtle text-center space-y-5 shadow-2xl">
        <span className="material-symbols-outlined text-6xl text-status-verified">verified</span>
        <h2 className="font-serif text-3xl text-primary">Sovereign Listing Published</h2>
        <p className="text-xs sm:text-sm text-secondary max-w-md mx-auto leading-relaxed">
          <strong>{formData.title}</strong> has been registered in the database, synchronized with the split map search engine, and vaulted under sovereign escrow protocols.
        </p>
        <div className="pt-4 flex justify-center gap-4">
          <button
            onClick={() => router.push("/properties")}
            className="px-6 py-3 rounded-full bg-primary text-on-primary text-xs uppercase font-semibold tracking-wider hover:bg-primary-container transition-all shadow"
          >
            View in Global Portfolio
          </button>
          <button
            onClick={() => router.push("/agent/dashboard")}
            className="px-6 py-3 rounded-full border border-border-hairline text-secondary hover:text-primary text-xs uppercase tracking-wider"
          >
            Return to CRM Command
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Wizard Progress Stepper */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-outline uppercase">
            Step {step} of 6: <strong className="text-primary">{steps[step - 1]}</strong>
          </span>
          <span className="text-secondary font-mono">{Math.round((step / 6) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-primary h-full rounded-full transition-all duration-300"
            style={{ width: `${(step / 6) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step Content Panels */}
      <div className="rounded-2xl bg-surface-card border border-border-subtle p-6 sm:p-10 shadow-2xl space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-serif text-2xl text-primary">Asset Identity &amp; Classification</h3>
            <p className="text-xs text-secondary font-light">Define the public headline, typology, and legal listing nature.</p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-secondary mb-1">Estate Monograph Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg bg-surface-container text-primary border border-white/10 focus:outline-none text-sm font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-secondary mb-1">Architectural Typology</label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-surface-container text-primary border border-white/10 focus:outline-none cursor-pointer"
                  >
                    <option value="Brutalist Villa">Brutalist Villa</option>
                    <option value="Penthouse & Duplex">Penthouse &amp; Duplex</option>
                    <option value="Waterfront Compound">Waterfront Compound</option>
                    <option value="Historic Palazzo">Historic Palazzo</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Alpine Chalets">Alpine Chalets</option>
                  </select>
                </div>

                <div>
                  <label className="block text-secondary mb-1">Listing Mandate Type</label>
                  <select
                    value={formData.listingType}
                    onChange={(e) => setFormData({ ...formData, listingType: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-surface-container text-primary border border-white/10 focus:outline-none cursor-pointer"
                  >
                    <option value="FOR_SALE">For Sale (Trophy Mandate)</option>
                    <option value="FOR_RENT">Long-term Sovereign Lease</option>
                    <option value="COMMERCIAL_SALE">Commercial Enterprise</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-secondary mb-1">Architectural Monograph Narrative</label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg bg-surface-container text-primary border border-white/10 focus:outline-none leading-relaxed"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-serif text-2xl text-primary">Location &amp; Geodetic Coordinates</h3>
            <p className="text-xs text-secondary font-light">Submarket classification and physical address registration.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-secondary mb-1">Country</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg bg-surface-container text-primary border border-white/10 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-secondary mb-1">City / Region</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg bg-surface-container text-primary border border-white/10 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-secondary mb-1">Submarket / District</label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg bg-surface-container text-primary border border-white/10 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-secondary mb-1">Formal Street Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg bg-surface-container text-primary border border-white/10 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-serif text-2xl text-primary">Pricing &amp; Sovereign Escrow Terms</h3>
            <p className="text-xs text-secondary font-light">Establish acquisition pricing, baseline currency, and carrying charges.</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-secondary mb-1">Asking Acquisition Price</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full px-3 py-2.5 rounded-lg bg-surface-container text-primary border border-white/10 focus:outline-none text-sm font-semibold"
                />
              </div>
              <div>
                <label className="block text-secondary mb-1">Currency</label>
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg bg-surface-container text-primary border border-white/10 focus:outline-none cursor-pointer"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="CHF">CHF</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="JPY">JPY (¥)</option>
                </select>
              </div>
              <div>
                <label className="block text-secondary mb-1">Annual Service Charge</label>
                <input
                  type="number"
                  value={formData.serviceCharge}
                  onChange={(e) => setFormData({ ...formData, serviceCharge: Number(e.target.value) })}
                  className="w-full px-3 py-2.5 rounded-lg bg-surface-container text-primary border border-white/10 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h3 className="font-serif text-2xl text-primary">Architectural Specifications</h3>
            <p className="text-xs text-secondary font-light">Internal layout, dimensions, construction year, and infrastructure.</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="block text-secondary mb-1">Bedrooms</label>
                <input
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                  className="w-full px-3 py-2.5 rounded-lg bg-surface-container text-primary border border-white/10 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-secondary mb-1">Bathrooms</label>
                <input
                  type="number"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                  className="w-full px-3 py-2.5 rounded-lg bg-surface-container text-primary border border-white/10 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-secondary mb-1">Interior Area (m²)</label>
                <input
                  type="number"
                  value={formData.areaSqm}
                  onChange={(e) => setFormData({ ...formData, areaSqm: Number(e.target.value) })}
                  className="w-full px-3 py-2.5 rounded-lg bg-surface-container text-primary border border-white/10 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-secondary mb-1">Parking Stalls</label>
                <input
                  type="number"
                  value={formData.parkingSpaces}
                  onChange={(e) => setFormData({ ...formData, parkingSpaces: Number(e.target.value) })}
                  className="w-full px-3 py-2.5 rounded-lg bg-surface-container text-primary border border-white/10 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <h3 className="font-serif text-2xl text-primary">High-Resolution Photography &amp; Visuals</h3>
            <p className="text-xs text-secondary font-light">Provide high-resolution architectural photograph URLs.</p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-secondary mb-1">Primary Hero Image URL</label>
                <input
                  type="url"
                  value={formData.heroImage}
                  onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg bg-surface-container text-primary border border-white/10 focus:outline-none"
                />
              </div>

              {formData.heroImage && (
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-surface-container border border-white/10">
                  <img src={formData.heroImage} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-6">
            <h3 className="font-serif text-2xl text-primary">Compliance Validation &amp; Final Review</h3>
            <p className="text-xs text-secondary font-light">Verify all disclosures before submitting into the platform registry.</p>

            <div className="p-5 rounded-xl bg-surface-container space-y-3 text-xs">
              <div className="flex justify-between text-secondary">
                <span>Asset Title:</span>
                <span className="text-primary font-serif font-medium text-sm">{formData.title}</span>
              </div>
              <div className="flex justify-between text-secondary">
                <span>Asking Value:</span>
                <span className="text-primary font-serif font-medium text-sm">{formatCurrency(formData.price)}</span>
              </div>
              <div className="flex justify-between text-secondary">
                <span>Submarket:</span>
                <span className="text-primary">{formData.city}, {formData.country}</span>
              </div>
              <div className="flex justify-between text-secondary">
                <span>Interior Area:</span>
                <span className="text-primary">{formatArea(formData.areaSqm)}</span>
              </div>
              <div className="flex justify-between text-secondary">
                <span>Bedrooms / Baths:</span>
                <span className="text-primary">{formData.bedrooms} Beds / {formData.bathrooms} Baths</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-status-verified font-mono">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>Ready for FINMA / SEC Sovereign Escrow Registration</span>
            </div>
          </div>
        )}

        {/* Action Button Navigation */}
        <div className="pt-6 border-t border-border-subtle flex items-center justify-between">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 1}
            className="px-5 py-2.5 rounded-full border border-border-hairline text-secondary hover:text-primary disabled:opacity-20 text-xs font-semibold uppercase tracking-wider"
          >
            ← Previous Step
          </button>

          {step < 6 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-2.5 rounded-full bg-primary text-on-primary text-xs font-semibold uppercase tracking-wider hover:bg-primary-container transition-all shadow"
            >
              Continue to Step {step + 1} →
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-3 rounded-full bg-primary text-on-primary text-xs font-semibold uppercase tracking-wider hover:bg-primary-container transition-all shadow-xl"
            >
              {isSubmitting ? "Publishing Sovereign Listing..." : "Publish Sovereign Listing"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
