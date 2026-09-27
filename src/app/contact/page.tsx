import React from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import ContactFormClient from "@/components/common/ContactFormClient";

export default function ContactPage() {
  const desks = [
    {
      city: "Geneva Headquarters",
      address: "12 Rue du Rhône, 1204 Genève, Switzerland",
      tel: "+41 22 819 9000",
      hours: "09:00 - 18:00 CET",
      lead: "Count Maximilian von Berg",
    },
    {
      city: "London Mayfair Desk",
      address: "45 Berkeley Square, Mayfair, London W1J 5AS, UK",
      tel: "+44 20 7946 0900",
      hours: "09:00 - 18:00 GMT",
      lead: "Lady Eleanor Kensington",
    },
    {
      city: "Dubai DIFC Sovereign Hub",
      address: "Gate Village 04, DIFC, Dubai, UAE",
      tel: "+971 4 360 8800",
      hours: "09:00 - 18:00 GST",
      lead: "Tariq Al-Mansoor",
    },
    {
      city: "New York Madison Desk",
      address: "650 Madison Avenue, New York, NY 10022, USA",
      tel: "+1 212 555 0199",
      hours: "09:00 - 18:00 EST",
      lead: "Harrison Vance, Esq.",
    },
  ];

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {/* Header */}
        <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 border-b border-border-subtle">
          <span className="text-[10px] uppercase font-mono tracking-widest text-outline">
            Private Client Concierge &amp; Sovereign Liaison
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-primary font-normal">
            Confidential Mandate Initiation
          </h1>
          <p className="text-xs sm:text-sm text-secondary font-light max-w-2xl leading-relaxed">
            Directly connect with Managing Partners and Private Wealth mandate directors. Communications are handled under strict non-disclosure legal safeguards.
          </p>
        </section>

        {/* Main Grid: Form + Desks */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Form Column */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded-2xl bg-surface-card border border-border-subtle shadow-2xl space-y-6">
                <div>
                  <h3 className="font-serif text-2xl text-primary font-medium">
                    Submit Private Portfolio Mandate
                  </h3>
                  <p className="text-xs text-secondary font-light mt-1">
                    Please provide initial parameters. Our senior partner desk will respond within 4 business hours.
                  </p>
                </div>

                <ContactFormClient />
              </div>
            </div>

            {/* Global Desks & Security Fingerprint */}
            <div className="lg:col-span-5 space-y-6">
              {/* Encrypted Security Notice */}
              <div className="p-6 rounded-2xl bg-surface-container-lowest border border-chart-accent/30 space-y-3">
                <div className="flex items-center gap-2 text-chart-accent font-mono text-xs">
                  <span className="material-symbols-outlined text-[18px]">lock</span>
                  <span className="font-semibold uppercase tracking-wider">Encrypted Channel PGP Key</span>
                </div>
                <p className="text-[11px] text-secondary font-mono leading-relaxed">
                  Fingerprint: 8F2A 9401 2B3C 71D0 55EA 9081 CE44 88AA 12F3 90B1
                </p>
                <p className="text-[11px] text-outline font-light">
                  For sensitive family office inquiries, you may request our Signal or WhatsApp Business direct verified handle.
                </p>
              </div>

              {/* Advisory Desks */}
              <div className="space-y-4">
                <h4 className="font-serif text-lg text-primary font-medium">
                  Direct Private Banking Hubs
                </h4>

                <div className="space-y-3">
                  {desks.map((d) => (
                    <div
                      key={d.city}
                      className="p-5 rounded-xl bg-surface-card border border-border-subtle space-y-1.5 hover:border-outline-variant transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <h5 className="font-serif text-sm text-primary font-medium">{d.city}</h5>
                        <span className="text-[10px] font-mono text-status-verified">{d.hours}</span>
                      </div>
                      <p className="text-xs text-secondary font-light">{d.address}</p>
                      <div className="pt-2 flex items-center justify-between text-xs">
                        <a href={`tel:${d.tel}`} className="font-mono text-primary hover:underline">
                          {d.tel}
                        </a>
                        <span className="text-[10px] font-mono text-outline">Lead: {d.lead}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
