import { Metadata } from 'next';
import { Shield, Lock, Eye, Database, Globe, UserCheck, Cookie, Bell, FileText, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | EstatePro',
  description: 'Learn how EstatePro collects, uses, and protects your personal data. GDPR and CCPA compliant.',
};

const sections = [
  {
    id: 'overview',
    title: '1. Overview',
    icon: Shield,
    content: `EstatePro Ltd. ("we", "us", "our") is committed to protecting your privacy and personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform, mobile applications, and services (collectively, "the Platform").\n\nThis policy complies with the General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), and other applicable data protection laws. By using our Platform, you acknowledge that you have read and understood this policy.`,
  },
  {
    id: 'data-collection',
    title: '2. Data We Collect',
    icon: Database,
    content: `We collect the following categories of personal data:\n\n**Account Information:** Name, email address, phone number, profile photo, professional license details (for agents), and agency affiliation.\n\n**Property Search Data:** Search queries, saved properties, comparison lists, filter preferences, and viewing history.\n\n**Transaction Data:** Appointment bookings, inquiry submissions, mortgage calculator inputs, escrow interactions, and subscription payment information.\n\n**Communication Data:** Messages sent through our E2EE messaging system (we cannot read encrypted message content), support tickets, and feedback.\n\n**Technical Data:** IP address, device type, browser information, operating system, session duration, page views, and referral sources.\n\n**Location Data:** Approximate location based on IP address, and precise location when you use map-based search features (with your consent).`,
  },
  {
    id: 'usage',
    title: '3. How We Use Your Data',
    icon: Eye,
    content: `We process your data for the following purposes:\n\n• Providing and personalizing platform services\n• Matching buyers with relevant properties and agents\n• Processing subscriptions and financial transactions\n• Facilitating communication between platform users\n• Generating market analytics and property insights\n• Detecting and preventing fraud and security threats\n• Improving platform features through usage analytics\n• Sending service notifications and updates\n• Complying with legal obligations and regulatory requirements\n\n**Legal Basis (GDPR):** We process data based on contractual necessity, legitimate interests, consent, and legal obligations as applicable.`,
  },
  {
    id: 'sharing',
    title: '4. Data Sharing & Third Parties',
    icon: Globe,
    content: `We share data only as necessary:\n\n**With Agents & Agencies:** When you submit inquiries, book viewings, or initiate contact, relevant information is shared with the listing agent or agency.\n\n**Service Providers:** We use vetted third-party processors for payment processing (Stripe/PayPal), email delivery, cloud hosting (AWS/Azure), analytics, and fraud detection.\n\n**Legal Requirements:** We may disclose data to comply with legal obligations, court orders, or government requests.\n\n**Business Transfers:** In the event of a merger, acquisition, or sale, user data may be transferred as part of business assets.\n\nWe **never** sell personal data to advertisers or data brokers. All third-party processors are contractually bound by data protection agreements.`,
  },
  {
    id: 'security',
    title: '5. Data Security',
    icon: Lock,
    content: `We implement comprehensive security measures:\n\n• **Encryption at Rest:** AES-256 encryption for all stored personal data\n• **Encryption in Transit:** TLS 1.3 for all data transmissions\n• **Messaging:** End-to-end encryption (E2EE) for private messages\n• **Access Controls:** Role-based access with multi-factor authentication\n• **Monitoring:** 24/7 intrusion detection and real-time threat monitoring\n• **Compliance:** Regular SOC 2 Type II audits and penetration testing\n• **Incident Response:** Documented breach notification procedures (72-hour GDPR requirement)\n• **Data Minimization:** We only collect data necessary for service provision`,
  },
  {
    id: 'rights',
    title: '6. Your Rights',
    icon: UserCheck,
    content: `Depending on your jurisdiction, you have the following rights:\n\n• **Access:** Request a copy of all personal data we hold about you\n• **Rectification:** Correct inaccurate or incomplete personal data\n• **Erasure:** Request deletion of your personal data ("right to be forgotten")\n• **Portability:** Receive your data in a structured, machine-readable format\n• **Restriction:** Restrict processing of your data in certain circumstances\n• **Objection:** Object to processing based on legitimate interests or direct marketing\n• **Withdraw Consent:** Withdraw previously given consent at any time\n• **Non-Discrimination:** Exercise your rights without discriminatory treatment (CCPA)\n\nTo exercise these rights, contact our Data Protection Officer at privacy@estatepro.com. We respond to all requests within 30 days.`,
  },
  {
    id: 'cookies',
    title: '7. Cookies & Tracking',
    icon: Cookie,
    content: `We use the following types of cookies:\n\n• **Essential Cookies:** Required for platform functionality (authentication, security)\n• **Analytical Cookies:** Help us understand usage patterns (Google Analytics with IP anonymization)\n• **Preference Cookies:** Remember your settings and preferences\n• **Marketing Cookies:** Used only with explicit consent for relevant advertising\n\nYou can manage cookie preferences through our Cookie Consent Manager accessible from the footer. Essential cookies cannot be disabled as they are necessary for platform operation.`,
  },
  {
    id: 'retention',
    title: '8. Data Retention',
    icon: FileText,
    content: `We retain personal data for the following periods:\n\n• **Active Accounts:** Data retained while account is active plus 2 years after deletion\n• **Transaction Records:** 7 years for financial and tax compliance\n• **Communication Logs:** 1 year after last interaction (metadata only; E2EE messages cannot be accessed)\n• **Analytics Data:** 26 months in aggregated, anonymized form\n• **Legal Holds:** Data may be retained longer when subject to legal proceedings\n\nAfter retention periods expire, data is securely deleted or irreversibly anonymized.`,
  },
  {
    id: 'notifications',
    title: '9. Communications',
    icon: Bell,
    content: `We may send you:\n\n• **Transactional Emails:** Account confirmations, appointment updates, security alerts (cannot be opted out)\n• **Service Updates:** Platform changes, feature announcements, policy updates\n• **Marketing Communications:** Property recommendations, market insights, promotional offers (opt-out available)\n\nYou can manage communication preferences in your Dashboard > Settings > Notifications. Marketing communications include an unsubscribe link in every email.`,
  },
  {
    id: 'contact',
    title: '10. Contact Us',
    icon: Mail,
    content: `For privacy-related inquiries or to exercise your data rights:\n\n**Data Protection Officer:**\nEmail: privacy@estatepro.com\nPhone: +1-800-ESTATE (ext. 4)\n\n**Mailing Address:**\nEstatePro Ltd.\nData Protection Office\n100 Property Avenue, Suite 500\nNew York, NY 10001\nUnited States\n\n**EU Representative:**\nEstatePro EU Ltd.\nKurfürstendamm 21, 10719 Berlin, Germany\n\n**Supervisory Authority:** If you believe your data protection rights have been violated, you have the right to lodge a complaint with your local data protection authority.`,
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/20 flex items-center justify-center">
              <Lock className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-emerald-400/80 text-sm font-medium tracking-widest uppercase">Legal</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-zinc-500 text-sm">Last updated: March 15, 2025 · GDPR · CCPA Compliant</p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto space-y-8">
          {sections.map((section) => (
            <div key={section.id} id={section.id} className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
              <div className="flex items-center gap-3 mb-4">
                <section.icon className="w-5 h-5 text-emerald-400/60" />
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
