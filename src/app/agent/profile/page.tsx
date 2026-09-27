import { Metadata } from 'next';
import { User, Mail, Phone, MapPin, Camera, Save, Star, Home, Award, Shield, Globe, Briefcase, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'My Profile | Agent Dashboard | EstatePro',
  description: 'Manage your agent profile, specializations, certifications, and public listing information.',
};

export default function AgentProfilePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <section className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">Agent Profile</h1>
          <p className="text-zinc-500 mb-8">Manage your public-facing profile and credentials</p>

          {/* Cover & Avatar */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden mb-6">
            <div className="h-48 bg-gradient-to-br from-amber-900/30 via-amber-800/10 to-zinc-900 relative">
              <button className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-black/50 text-white text-xs backdrop-blur-sm border border-white/10 hover:bg-black/70 transition-all">
                <Camera className="w-3 h-3" /> Change Cover
              </button>
            </div>
            <div className="px-8 pb-8 -mt-12 relative">
              <div className="flex items-end gap-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-500/30 to-amber-600/10 border-4 border-[#0a0a0f] flex items-center justify-center">
                    <User className="w-10 h-10 text-amber-400" />
                  </div>
                  <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-amber-500 text-black flex items-center justify-center hover:bg-amber-400">
                    <Camera className="w-3 h-3" />
                  </button>
                </div>
                <div className="flex-1 pt-14">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold text-white">Victoria Sterling</h2>
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-xs border border-blue-500/20 flex items-center gap-1"><Shield className="w-3 h-3" /> Verified</span>
                  </div>
                  <p className="text-zinc-500 text-sm">Chief Market Analyst · Sterling & Associates</p>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 mb-6">
            <h3 className="text-lg font-semibold text-white mb-6">Personal Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { label: 'Full Name', value: 'Victoria Sterling', icon: User },
                { label: 'Email', value: 'victoria@sterling.com', icon: Mail },
                { label: 'Phone', value: '+44 20 7123 4567', icon: Phone },
                { label: 'Office Location', value: 'Mayfair, London W1K', icon: MapPin },
                { label: 'Languages', value: 'English, French, Arabic', icon: Globe },
                { label: 'Experience', value: '15+ years', icon: Calendar },
              ].map((field) => (
                <div key={field.label}>
                  <label className="text-zinc-500 text-xs uppercase tracking-wider mb-2 block">{field.label}</label>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                    <field.icon className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                    <input type="text" defaultValue={field.value} className="flex-1 bg-transparent text-white text-sm outline-none" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Biography */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Biography</h3>
            <textarea
              rows={5}
              defaultValue="With over 15 years of experience in the ultra-luxury real estate market, I specialize in sovereign-grade properties across London, Dubai, and the French Riviera. My clientele includes UHNW individuals, royal families, and institutional investors seeking discretion, expertise, and unparalleled market access."
              className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-zinc-300 text-sm resize-none focus:outline-none focus:border-amber-500/50"
            />
          </div>

          {/* Specializations */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-amber-400/60" /> Specializations
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {['Luxury Residential', 'Penthouse', 'Waterfront', 'Investment Properties', 'New Developments', 'International Buyers'].map((spec) => (
                <span key={spec} className="px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 text-sm border border-amber-500/20">{spec}</span>
              ))}
              <button className="px-3 py-1.5 rounded-lg border border-dashed border-white/20 text-zinc-500 text-sm hover:border-amber-500/30 transition-all">+ Add</button>
            </div>
          </div>

          {/* Credentials */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400/60" /> Credentials & Certifications
            </h3>
            <div className="space-y-3">
              {[
                { cert: 'RICS Chartered Surveyor', org: 'Royal Institution of Chartered Surveyors', year: '2012' },
                { cert: 'Certified International Property Specialist', org: 'National Association of Realtors', year: '2015' },
                { cert: 'Licensed Real Estate Agent', org: 'Dubai Land Department — License #DLD-4521', year: '2018' },
              ].map((cred) => (
                <div key={cred.cert} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/5">
                  <div>
                    <p className="text-white text-sm font-medium">{cred.cert}</p>
                    <p className="text-zinc-500 text-xs">{cred.org}</p>
                  </div>
                  <span className="text-zinc-600 text-xs">{cred.year}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Summary */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-400/60" /> Public Performance Stats
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Transactions', value: '127' },
                { label: 'Avg Rating', value: '4.9 ★' },
                { label: 'Response Time', value: '< 2 hrs' },
                { label: 'Active Listings', value: '24' },
              ].map((stat) => (
                <div key={stat.label} className="p-4 rounded-xl bg-white/[0.03] text-center">
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                  <p className="text-zinc-500 text-xs">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold hover:from-amber-400 hover:to-amber-500 transition-all">
            <Save className="w-4 h-4" /> Save Profile
          </button>
        </div>
      </section>
    </main>
  );
}
