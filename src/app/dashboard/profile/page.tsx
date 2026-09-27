import { Metadata } from 'next';
import { User, Mail, Phone, MapPin, Shield, Camera, Bell, Key, Globe, CreditCard, Save, LogOut } from 'lucide-react';

export const metadata: Metadata = {
  title: 'My Profile | Buyer Dashboard | EstatePro',
  description: 'Manage your EstatePro profile, preferences, and account settings.',
};

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <section className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
          <p className="text-zinc-500 mb-8">Manage your personal information and preferences</p>

          {/* Profile Header */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 mb-6">
            <div className="flex items-start gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-500/30 to-amber-600/10 border border-amber-500/20 flex items-center justify-center">
                  <User className="w-10 h-10 text-amber-400" />
                </div>
                <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-amber-500 text-black flex items-center justify-center hover:bg-amber-400 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white mb-1">Alexander Hamilton</h2>
                <p className="text-zinc-500 text-sm mb-3">Member since January 2025</p>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs border border-emerald-500/20">Verified</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-xs border border-amber-500/20">Premium Buyer</span>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 mb-6">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-amber-400/60" /> Personal Information
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { label: 'First Name', value: 'Alexander', icon: User },
                { label: 'Last Name', value: 'Hamilton', icon: User },
                { label: 'Email Address', value: 'alexander@example.com', icon: Mail },
                { label: 'Phone Number', value: '+1 (212) 555-0198', icon: Phone },
                { label: 'Location', value: 'New York, NY', icon: MapPin },
                { label: 'Preferred Language', value: 'English', icon: Globe },
              ].map((field) => (
                <div key={field.label}>
                  <label className="text-zinc-500 text-xs uppercase tracking-wider mb-2 block">{field.label}</label>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                    <field.icon className="w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      defaultValue={field.value}
                      className="flex-1 bg-transparent text-white text-sm outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Property Preferences */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 mb-6">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-400/60" /> Property Preferences
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-zinc-500 text-xs uppercase tracking-wider mb-2 block">Preferred Locations</label>
                <div className="flex flex-wrap gap-2">
                  {['Manhattan', 'Brooklyn', 'Hamptons', 'Miami'].map((loc) => (
                    <span key={loc} className="px-3 py-1.5 rounded-lg bg-white/5 text-zinc-400 text-sm border border-white/10">{loc}</span>
                  ))}
                  <button className="px-3 py-1.5 rounded-lg border border-dashed border-white/20 text-zinc-500 text-sm hover:border-amber-500/30 transition-all">+ Add</button>
                </div>
              </div>
              <div>
                <label className="text-zinc-500 text-xs uppercase tracking-wider mb-2 block">Property Types</label>
                <div className="flex flex-wrap gap-2">
                  {['Penthouse', 'Villa', 'Townhouse'].map((type) => (
                    <span key={type} className="px-3 py-1.5 rounded-lg bg-white/5 text-zinc-400 text-sm border border-white/10">{type}</span>
                  ))}
                  <button className="px-3 py-1.5 rounded-lg border border-dashed border-white/20 text-zinc-500 text-sm hover:border-amber-500/30 transition-all">+ Add</button>
                </div>
              </div>
              <div>
                <label className="text-zinc-500 text-xs uppercase tracking-wider mb-2 block">Budget Range</label>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm">$5,000,000 — $50,000,000</div>
              </div>
              <div>
                <label className="text-zinc-500 text-xs uppercase tracking-wider mb-2 block">Min Bedrooms</label>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm">3+</div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 mb-6">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Bell className="w-5 h-5 text-amber-400/60" /> Notification Preferences
            </h3>
            <div className="space-y-4">
              {[
                { label: 'New property matches', description: 'Get notified when properties match your saved searches', enabled: true },
                { label: 'Price changes', description: 'Alerts when saved properties have price updates', enabled: true },
                { label: 'Appointment reminders', description: 'Reminders before scheduled viewings', enabled: true },
                { label: 'Market reports', description: 'Weekly market analysis and insights', enabled: false },
                { label: 'Promotional offers', description: 'Special deals and platform promotions', enabled: false },
              ].map((pref) => (
                <div key={pref.label} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <div>
                    <p className="text-white text-sm font-medium">{pref.label}</p>
                    <p className="text-zinc-500 text-xs">{pref.description}</p>
                  </div>
                  <button className={`w-12 h-6 rounded-full transition-colors relative ${pref.enabled ? 'bg-amber-500' : 'bg-white/10'}`}>
                    <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${pref.enabled ? 'left-6' : 'left-0.5'}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 mb-6">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-400/60" /> Security
            </h3>
            <div className="space-y-4">
              <button className="flex items-center justify-between w-full p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-amber-500/20 transition-all">
                <div className="flex items-center gap-3">
                  <Key className="w-5 h-5 text-zinc-500" />
                  <div className="text-left">
                    <p className="text-white text-sm">Change Password</p>
                    <p className="text-zinc-500 text-xs">Last changed 45 days ago</p>
                  </div>
                </div>
                <span className="text-amber-400 text-sm">Update</span>
              </button>
              <button className="flex items-center justify-between w-full p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-amber-500/20 transition-all">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-zinc-500" />
                  <div className="text-left">
                    <p className="text-white text-sm">Two-Factor Authentication</p>
                    <p className="text-zinc-500 text-xs">Add extra security to your account</p>
                  </div>
                </div>
                <span className="text-emerald-400 text-sm">Enabled</span>
              </button>
              <button className="flex items-center justify-between w-full p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-amber-500/20 transition-all">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-zinc-500" />
                  <div className="text-left">
                    <p className="text-white text-sm">Payment Methods</p>
                    <p className="text-zinc-500 text-xs">Manage saved payment methods</p>
                  </div>
                </div>
                <span className="text-amber-400 text-sm">Manage</span>
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold hover:from-amber-400 hover:to-amber-500 transition-all">
              <Save className="w-4 h-4" /> Save Changes
            </button>
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
