import React from "react";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function AboutPage() {
  const leadership = [
    {
      name: "Count Maximilian von Berg",
      role: "Managing Principal & Global Chairman",
      location: "Geneva • Zurich",
      bio: "Former Managing Director of Private Wealth at Pictet & Cie. Overseeing multi-billion Swiss franc private allocation mandates across prime European and Alpine jurisdictions.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Lady Eleanor Kensington",
      role: "Head of Prime London & Mayfair Acquisitions",
      location: "London Mayfair",
      bio: "Advising ultra-high-net-worth sovereign families and royal dynastic offices for over two decades on Grade-I listed heritage palazzos and super-prime developments.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Tariq Al-Mansoor",
      role: "Managing Partner, Middle East & GCC Sovereign Portfolios",
      location: "Dubai DIFC • Abu Dhabi",
      bio: "Pioneering monumental architectural acquisitions across the Arabian Gulf, overseeing beachfront enclaves on Palm Jumeirah and luxury residential towers in Downtown Dubai.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Kenjiro Takahashi",
      role: "Senior Partner, Asia-Pacific Private Estates",
      location: "Tokyo • Kyoto",
      bio: "Specializing in historic Sukiya-zukuri compounds, modern architectural landmarks in Minami-Aoyama, and private conservation reserves across Hokkaido.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    },
  ];

  const pillars = [
    {
      icon: "shield_lock",
      title: "Cryptographic Title & Escrow Vaulting",
      description: "Every transaction is routed through multi-signature escrow architecture, FINMA-grade legal notarization, and strict beneficial ownership validation.",
    },
    {
      icon: "flight_takeoff",
      title: "Global Aviation & Private Logistics",
      description: "Dedicated Gulfstream G650 charter fleet and Eurocopter EC130 rotorcraft on standby for direct runway-to-estate client inspections.",
    },
    {
      icon: "account_balance",
      title: "Private Wealth Structured Facilities",
      description: "Direct syndication pipelines with UBS, Credit Suisse Private Banking, and J.P. Morgan Private Bank for bespoke sovereign lending facilities.",
    },
  ];

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-b border-border-subtle bg-surface-lowest overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_30%,rgba(212,175,55,0.4),transparent_60%)]"></div>
          <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
            <span className="px-3.5 py-1.5 rounded-full bg-surface-container-high/90 text-[10px] uppercase font-mono tracking-widest text-primary border border-white/10">
              The Sovereign Institutional Standard
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl text-primary font-normal leading-tight">
              The Architecture of Sovereignty &amp; Discretion
            </h1>
            <p className="text-sm sm:text-base text-secondary font-light max-w-2xl mx-auto leading-relaxed">
              EstatePro was founded to serve sovereign wealth institutions, royal family offices, and discerning principals seeking unencumbered ownership of the world's most monumental architectural trophy estates.
            </p>
          </div>
        </section>

        {/* Global Hubs Grid */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <span className="text-[10px] uppercase font-mono tracking-widest text-outline">
              Global Presence
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-primary">
              Private Advisory Desks Across 6 Financial Capitals
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {[
              { city: "Geneva", hub: "Rue du Rhône" },
              { city: "London", hub: "Mayfair W1" },
              { city: "Monaco", hub: "Carré d'Or" },
              { city: "Dubai", hub: "DIFC Gate 4" },
              { city: "New York", hub: "Madison Ave" },
              { city: "Tokyo", hub: "Ginza 6" },
            ].map((desk) => (
              <div key={desk.city} className="p-5 rounded-xl bg-surface-card border border-border-subtle space-y-1">
                <span className="material-symbols-outlined text-primary text-xl">location_city</span>
                <h4 className="font-serif text-base text-primary font-medium">{desk.city}</h4>
                <p className="text-[11px] font-mono text-outline">{desk.hub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Strategic Pillars */}
        <section className="py-20 bg-surface-container-lowest border-y border-border-subtle">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-xl space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-widest text-outline">
                Our Foundation
              </span>
              <h2 className="font-serif text-3xl text-primary">
                Uncompromising Institutional Security
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="p-8 rounded-2xl bg-surface-card border border-border-subtle space-y-4 shadow-xl">
                  <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-2xl">{pillar.icon}</span>
                  </div>
                  <h3 className="font-serif text-xl text-primary font-medium">{pillar.title}</h3>
                  <p className="text-xs text-secondary font-light leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Managing Partners */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-border-subtle">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-outline">
                Advisory Leadership
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-primary mt-1">
                Managing Partners &amp; Mandate Overseers
              </h2>
            </div>
            <Link
              href="/agents"
              className="text-xs text-chart-accent hover:underline font-semibold font-mono uppercase"
            >
              View Full Sovereign Roster →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((leader) => (
              <div key={leader.name} className="rounded-2xl bg-surface-card border border-border-subtle overflow-hidden flex flex-col shadow-xl">
                <div className="relative aspect-[4/5] bg-surface-container overflow-hidden">
                  <img
                    src={leader.avatar}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-lowest/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[10px] font-mono text-outline block">{leader.location}</span>
                    <h3 className="font-serif text-lg text-primary font-medium">{leader.name}</h3>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <span className="text-[11px] font-mono text-status-verified font-medium block">
                    {leader.role}
                  </span>
                  <p className="text-xs text-secondary font-light leading-relaxed">
                    {leader.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-surface-card border-t border-border-subtle text-center px-4">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="font-serif text-3xl text-primary font-normal">
              Engage the Private Reserve Mandate Desk
            </h2>
            <p className="text-xs sm:text-sm text-secondary font-light leading-relaxed">
              Inquiries are handled under non-disclosure protocols with direct access to senior partners.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/contact"
                className="px-8 py-3 rounded-full bg-primary text-on-primary text-xs uppercase font-semibold tracking-wider hover:bg-primary-container transition-all shadow-xl"
              >
                Initiate Confidential Inquiry
              </Link>
              <Link
                href="/vip-viewing"
                className="px-8 py-3 rounded-full border border-border-hairline text-secondary hover:text-primary hover:bg-surface-container text-xs uppercase font-semibold tracking-wider transition-colors"
              >
                Charter Private Aviation Viewing
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
