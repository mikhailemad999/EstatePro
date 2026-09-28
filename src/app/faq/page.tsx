import { Metadata } from 'next';
import { HelpCircle, ChevronDown, Search, MessageSquare, Phone, Mail, BookOpen, Shield, Home, CreditCard, Scale, Globe } from 'lucide-react';
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | EstatePro',
  description: 'Find answers to common questions about buying, selling, renting, mortgage, and using the EstatePro platform.',
};

const faqCategories = [
  { id: 'buying', label: 'Buying', icon: Home, count: 8 },
  { id: 'selling', label: 'Selling', icon: CreditCard, count: 6 },
  { id: 'renting', label: 'Renting', icon: Scale, count: 5 },
  { id: 'mortgage', label: 'Mortgage', icon: CreditCard, count: 7 },
  { id: 'platform', label: 'Platform', icon: Globe, count: 9 },
  { id: 'security', label: 'Security', icon: Shield, count: 4 },
];

const faqs = [
  { category: 'buying', q: 'How do I search for properties on EstatePro?', a: 'Use our advanced search with filters for location, price range, property type, bedrooms, and amenities. You can also use the interactive map search at /map to draw custom search areas or set radius-based filters around specific locations.' },
  { category: 'buying', q: 'What is the property comparison feature?', a: 'Our comparison tool lets you compare up to 4 properties side-by-side across all key metrics including price, area, bedrooms, bathrooms, amenities, location, and estimated mortgage costs. Navigate to /compare to start comparing.' },
  { category: 'buying', q: 'How do I schedule a property viewing?', a: 'Click "Schedule Viewing" on any property detail page. Choose between standard viewings, VIP private viewings, or virtual tours. You\'ll receive confirmation from the listing agent within 24 hours.' },
  { category: 'buying', q: 'What is the escrow process?', a: 'Our built-in escrow system protects both buyers and sellers. Funds are held securely in a regulated escrow account until all conditions of the sale are met, including inspections, title verification, and document signing.' },
  { category: 'buying', q: 'Can I save properties and searches?', a: 'Yes! Create a free account to save unlimited properties to your favorites, set up saved searches with automatic alerts, and track your entire property journey from your buyer dashboard.' },
  { category: 'selling', q: 'How do I list my property on EstatePro?', a: 'You can list through a verified agent or agency on our platform. Agents use a comprehensive multi-step wizard to create listings with full details, media, floor plans, and SEO optimization before submitting for approval.' },
  { category: 'selling', q: 'What is the listing approval process?', a: 'All listings undergo a quality review by our moderation team. We verify listing accuracy, image quality, pricing reasonableness, and legal compliance. Most approvals are completed within 48 hours.' },
  { category: 'selling', q: 'How are property valuations determined?', a: 'Our platform provides market-based valuation estimates using comparable sales data, location analytics, property condition factors, and current market trends. For official valuations, we recommend consulting a certified appraiser through our agent network.' },
  { category: 'renting', q: 'How do I apply for a rental property?', a: 'Submit a rental application through the property listing page. You\'ll need to provide identification, proof of income, rental history, and references. Applications are reviewed by the property manager or landlord.' },
  { category: 'renting', q: 'What documents do I need for renting?', a: 'Typically: valid government ID, proof of employment, last 3 months bank statements, previous landlord references, and in some cases, a credit report. Requirements may vary by property and jurisdiction.' },
  { category: 'mortgage', q: 'How does the mortgage calculator work?', a: 'Our calculator computes monthly payments based on property price, down payment percentage, loan term, and interest rate. It generates a full amortization schedule showing principal vs. interest breakdown over the loan term.' },
  { category: 'mortgage', q: 'Can I get pre-qualified for a mortgage through EstatePro?', a: 'Yes! Our mortgage partner network allows you to submit pre-qualification applications directly. You\'ll receive preliminary approval decisions within 24-48 hours, strengthening your position when making offers.' },
  { category: 'mortgage', q: 'What mortgage options are available?', a: 'Our partners offer fixed-rate, variable-rate, interest-only, and Islamic financing options. Terms range from 5 to 30 years with competitive rates. Use our comparison tool to find the best option for your situation.' },
  { category: 'platform', q: 'Is EstatePro free to use for buyers?', a: 'Absolutely! Searching, saving, comparing, and contacting agents is completely free for buyers and renters. We generate revenue through agent subscription plans and premium listing features.' },
  { category: 'platform', q: 'How do I verify my agent is legitimate?', a: 'All agents on EstatePro undergo license verification. Look for the blue verified badge on agent profiles. You can also view their license number, agency affiliation, transaction history, and client reviews.' },
  { category: 'platform', q: 'What subscription plans are available for agents?', a: 'We offer Starter, Professional, and Enterprise tiers with increasing listing capacities, lead generation tools, analytics features, and priority support. Visit /subscriptions for detailed plan comparisons.' },
  { category: 'security', q: 'How is my personal data protected?', a: 'We use AES-256 encryption for data at rest, TLS 1.3 for data in transit, and implement strict access controls. Our platform complies with GDPR, CCPA, and regional data protection regulations. We never sell personal data to third parties.' },
  { category: 'security', q: 'Is the messaging system secure?', a: 'Our messaging system uses end-to-end encryption (E2EE) for all conversations between buyers and agents. Messages are encrypted on your device before being sent and can only be decrypted by the intended recipient.' },
  { category: 'security', q: 'How do you prevent fraud?', a: 'Our AI-powered fraud detection system analyzes listing patterns, user behavior, and transaction anomalies in real-time. We also maintain a dedicated fraud investigation team and provide a reporting system for suspicious listings.' },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero */}
        <section className="relative py-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto relative text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-7 h-7 text-emerald-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-10">
            Everything you need to know about buying, selling, renting, and using the EstatePro platform.
          </p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search for answers..."
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-all"
            />
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="px-6 pb-8">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-3">
          {faqCategories.map((cat) => (
            <button key={cat.id} className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm hover:border-emerald-500/30 hover:text-emerald-400 transition-all">
              <cat.icon className="w-4 h-4" />
              {cat.label}
              <span className="text-zinc-600">({cat.count})</span>
            </button>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <details key={i} className="group rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
              <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none hover:bg-white/[0.03] transition-colors">
                <div className="flex items-center gap-3 flex-1">
                  <span className="flex-shrink-0 px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider text-zinc-500 bg-white/5 border border-white/5">
                    {faq.category}
                  </span>
                  <span className="text-white font-medium">{faq.q}</span>
                </div>
                <ChevronDown className="w-5 h-5 text-zinc-500 flex-shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-6 pt-0">
                <p className="text-zinc-400 leading-relaxed pl-[70px]">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Still Need Help */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/5 to-transparent p-12 text-center">
            <MessageSquare className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-3">Still Have Questions?</h2>
            <p className="text-zinc-400 mb-8 max-w-md mx-auto">Our support team is available 24/7 to assist you with any questions or concerns.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/contact" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 transition-all">
                <Mail className="w-4 h-4" /> Contact Support
              </a>
              <a href="tel:+1-800-ESTATE" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 text-white/70 border border-white/10 hover:border-emerald-500/30 transition-all">
                <Phone className="w-4 h-4" /> +1-800-ESTATE
              </a>
              <a href="/blog" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 text-white/70 border border-white/10 hover:border-emerald-500/30 transition-all">
                <BookOpen className="w-4 h-4" /> Read Guides
              </a>
            </div>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}
