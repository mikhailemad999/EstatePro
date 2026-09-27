import { Metadata } from 'next';
import { ScrollText, Shield, Scale, Eye, Lock, AlertTriangle, Globe, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | EstatePro',
  description: 'EstatePro Terms of Service — Read our terms governing use of the platform, user responsibilities, and service agreements.',
};

const sections = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    icon: FileText,
    content: `By accessing or using EstatePro ("the Platform"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you must not access or use the Platform. These Terms constitute a legally binding agreement between you and EstatePro Ltd. ("we", "us", "our").\n\nWe reserve the right to modify these Terms at any time. Material changes will be communicated via email notification and in-platform alerts at least 30 days before they take effect. Your continued use of the Platform after such modifications constitutes acceptance of the updated Terms.`,
  },
  {
    id: 'eligibility',
    title: '2. Eligibility & Account Registration',
    icon: Shield,
    content: `You must be at least 18 years old and have full legal capacity to enter into binding agreements in your jurisdiction. When creating an account, you agree to:\n\n• Provide accurate, current, and complete registration information\n• Maintain and update your information to keep it accurate\n• Maintain the security of your password and account credentials\n• Accept responsibility for all activities under your account\n• Immediately notify us of any unauthorized account access\n\nAccounts registered with fraudulent information may be terminated without notice. We reserve the right to verify identity through government-issued identification and professional licensing documentation.`,
  },
  {
    id: 'services',
    title: '3. Platform Services',
    icon: Globe,
    content: `EstatePro provides a real estate marketplace connecting property buyers, sellers, renters, agents, agencies, developers, and service providers. Our services include:\n\n• Property listing and search functionality\n• Agent and agency discovery and profiles\n• Mortgage calculation and pre-qualification tools\n• Appointment scheduling and viewing management\n• Secure messaging between platform users\n• Property comparison and analysis tools\n• Market reports and analytics\n• Subscription-based premium features\n\nWe do not provide real estate brokerage, legal, financial, or appraisal services. All property transactions are conducted between parties, and EstatePro is not a party to any real estate transaction unless explicitly stated.`,
  },
  {
    id: 'user-conduct',
    title: '4. User Conduct & Prohibited Activities',
    icon: AlertTriangle,
    content: `You agree not to:\n\n• Post false, misleading, or fraudulent listings or content\n• Impersonate any person or misrepresent professional credentials\n• Harvest, scrape, or collect user data without authorization\n• Interfere with platform operations or security measures\n• Use automated systems (bots, crawlers) without written permission\n• Circumvent subscription limitations or access controls\n• Engage in discriminatory practices prohibited by fair housing laws\n• Upload malware, viruses, or harmful code\n• Send unsolicited commercial communications (spam)\n• Manipulate reviews, ratings, or lead scoring systems\n\nViolations may result in immediate account suspension or termination, and we reserve the right to report illegal activities to law enforcement authorities.`,
  },
  {
    id: 'listings',
    title: '5. Property Listings & Content',
    icon: Eye,
    content: `Listing agents and property owners are solely responsible for the accuracy and legality of listing content. By posting a listing, you represent and warrant that:\n\n• You have authorization to list the property\n• All information is accurate and not misleading\n• Images and media are authentic and owned or licensed by you\n• The property is legally available for sale or rent\n• Pricing is transparent and does not contain hidden fees\n\nEstatePro reserves the right to review, edit, or remove any listing that violates these Terms or our Community Guidelines. We employ AI-powered fraud detection and human moderation to maintain listing quality.`,
  },
  {
    id: 'payments',
    title: '6. Payments, Subscriptions & Refunds',
    icon: Scale,
    content: `Subscription fees are billed monthly or annually as selected at the time of purchase. All prices are exclusive of applicable taxes unless stated otherwise.\n\n• Subscriptions auto-renew unless cancelled before the renewal date\n• Cancellations take effect at the end of the current billing period\n• Refunds are available within 14 days of initial purchase for annual plans\n• Monthly plans may be cancelled at any time without refund for the current period\n• Failed payment attempts will trigger a 7-day grace period before account downgrade\n• We reserve the right to adjust pricing with 30 days advance notice`,
  },
  {
    id: 'privacy',
    title: '7. Privacy & Data Protection',
    icon: Lock,
    content: `Your use of the Platform is also governed by our Privacy Policy. By using EstatePro, you consent to the collection, use, and processing of your information as described in our Privacy Policy.\n\nWe implement industry-standard security measures including AES-256 encryption, TLS 1.3, end-to-end encrypted messaging, and regular security audits. We comply with GDPR, CCPA, and applicable regional data protection regulations.`,
  },
  {
    id: 'liability',
    title: '8. Limitation of Liability',
    icon: Shield,
    content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, ESTATEPRO SHALL NOT BE LIABLE FOR:\n\n• Indirect, incidental, special, consequential, or punitive damages\n• Loss of profits, revenue, data, or business opportunities\n• Property transaction outcomes or disputes between users\n• Inaccuracies in property listings or market data\n• Service interruptions or technical failures\n\nOur total liability shall not exceed the amount paid by you for Platform services in the 12 months preceding the claim. This limitation applies regardless of the theory of liability.`,
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/20 flex items-center justify-center">
              <ScrollText className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-blue-400/80 text-sm font-medium tracking-widest uppercase">Legal</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-zinc-500 text-sm">Last updated: March 15, 2025 · Effective: April 15, 2025</p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto space-y-8">
          {sections.map((section) => (
            <div key={section.id} id={section.id} className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
              <div className="flex items-center gap-3 mb-4">
                <section.icon className="w-5 h-5 text-blue-400/60" />
                <h2 className="text-xl font-bold text-white">{section.title}</h2>
              </div>
              <div className="text-zinc-400 leading-relaxed whitespace-pre-line text-sm">{section.content}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
