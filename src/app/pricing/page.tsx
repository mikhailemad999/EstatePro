import { Metadata } from 'next';
import Link from 'next/link';
import { Check, Crown, Zap, Building2, ArrowRight, Star, Shield, BarChart3, Users, Headphones } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing & Plans | EstatePro',
  description: 'Transparent pricing for agents, agencies, and developers. Choose the plan that matches your real estate business needs.',
};

const plans = [
  {
    name: 'Starter',
    price: 49,
    period: '/month',
    description: 'Perfect for individual agents starting their digital presence.',
    icon: Zap,
    color: 'zinc',
    gradient: 'from-zinc-500/20 to-zinc-600/10',
    borderHover: 'hover:border-zinc-400/30',
    features: [
      '10 active listings',
      'Basic property analytics',
      'Lead inbox (up to 50/month)',
      'Standard messaging',
      'Basic CRM tools',
      'Email support',
      'Public agent profile',
      'Mobile responsive dashboard',
    ],
    cta: 'Start Free Trial',
  },
  {
    name: 'Professional',
    price: 149,
    period: '/month',
    description: 'For established agents who need advanced tools and higher volume.',
    icon: Crown,
    color: 'amber',
    gradient: 'from-amber-500/20 to-amber-600/10',
    borderHover: 'hover:border-amber-400/30',
    popular: true,
    features: [
      '50 active listings',
      'Advanced analytics & reports',
      'Unlimited leads',
      'E2EE encrypted messaging',
      'Full CRM with pipeline',
      'Priority support (24/7)',
      'Featured agent badge',
      'Lead scoring & automation',
      'Commission tracker',
      'Custom branding',
      'API access',
    ],
    cta: 'Start Free Trial',
  },
  {
    name: 'Enterprise',
    price: 499,
    period: '/month',
    description: 'For agencies and teams requiring full platform capabilities.',
    icon: Building2,
    color: 'violet',
    gradient: 'from-violet-500/20 to-violet-600/10',
    borderHover: 'hover:border-violet-400/30',
    features: [
      'Unlimited listings',
      'Agency-wide analytics',
      'Unlimited leads & agents',
      'E2EE messaging + team channels',
      'Advanced CRM + lead routing',
      'Dedicated account manager',
      'White-label branding',
      'Team management & permissions',
      'Revenue & commission reports',
      'Developer API + webhooks',
      'SSO & advanced security',
      'Custom integrations',
      'SLA guarantees',
    ],
    cta: 'Contact Sales',
  },
];

const features = [
  { icon: BarChart3, title: 'Real-Time Analytics', description: 'Track views, inquiries, and conversion metrics for every listing in real-time.' },
  { icon: Shield, title: 'Enterprise Security', description: 'End-to-end encryption, SOC 2 compliance, and advanced fraud detection protect your data.' },
  { icon: Users, title: 'Team Collaboration', description: 'Manage agents, assign leads, and coordinate across your organization seamlessly.' },
  { icon: Headphones, title: '24/7 Priority Support', description: 'Dedicated support team with guaranteed response times for Professional and Enterprise plans.' },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      {/* Hero */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-transparent" />
        <div className="max-w-5xl mx-auto relative text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-violet-500/20 text-amber-400 text-sm font-medium mb-6 border border-white/10">
            14-day free trial on all plans
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Simple, Transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-violet-400">Pricing</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Choose the plan that scales with your real estate business. No hidden fees. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl border ${plan.popular ? 'border-amber-500/40 bg-gradient-to-b from-amber-500/10 to-transparent' : 'border-white/10 bg-white/[0.02]'} ${plan.borderHover} transition-all duration-300 overflow-hidden`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-black text-xs font-bold">
                  Most Popular
                </div>
              )}
              <div className="p-8 pt-10">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${plan.gradient} border border-white/10 flex items-center justify-center mb-6`}>
                  <plan.icon className={`w-6 h-6 ${plan.color === 'amber' ? 'text-amber-400' : plan.color === 'violet' ? 'text-violet-400' : 'text-zinc-400'}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-zinc-500 text-sm mb-6">{plan.description}</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-bold text-white">${plan.price}</span>
                  <span className="text-zinc-500">{plan.period}</span>
                </div>
                <button className={`w-full py-3.5 rounded-xl font-medium text-sm transition-all ${plan.popular ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-400 hover:to-amber-500' : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'}`}>
                  {plan.cta}
                </button>
              </div>
              <div className="px-8 pb-8">
                <div className="border-t border-white/10 pt-6">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-4">Includes</p>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-zinc-400">
                        <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.color === 'amber' ? 'text-amber-400' : plan.color === 'violet' ? 'text-violet-400' : 'text-zinc-500'}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-12">Included in Every Plan</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                <feature.icon className="w-8 h-8 text-amber-400/60 mb-4" />
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-zinc-500 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto text-center rounded-3xl border border-white/10 bg-gradient-to-br from-amber-500/5 to-violet-500/5 p-12">
          <Star className="w-10 h-10 text-amber-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">Need a Custom Solution?</h2>
          <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
            For large enterprises, property management companies, and developers with specific requirements, we offer tailored solutions.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold hover:from-amber-400 hover:to-amber-500 transition-all">
            Contact Our Sales Team <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
