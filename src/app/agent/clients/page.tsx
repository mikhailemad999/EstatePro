import { Metadata } from 'next';
import Link from 'next/link';
import { Users, Search, Filter, Phone, Mail, Home, DollarSign, Star, Calendar, ArrowRight, MoreVertical, MapPin } from 'lucide-react';
import AgentSidebar from "@/components/dashboards/AgentSidebar";
import RoleSwitcher from "@/components/common/RoleSwitcher";

export const metadata: Metadata = {
  title: 'My Clients | Agent Dashboard | EstatePro',
  description: 'Manage your client relationships, track interactions, and monitor client portfolios.',
};

const clients = [
  { id: 1, name: 'Alexander Hamilton', email: 'alex@example.com', phone: '+1-212-555-0198', type: 'Buyer', status: 'Active', budget: '$10M-$50M', location: 'Manhattan, NY', properties: 3, interactions: 12, lastContact: '2025-03-14', rating: 'Hot' },
  { id: 2, name: 'Catherine Medici', email: 'catherine@example.com', phone: '+33-1-555-0342', type: 'Buyer', status: 'Active', budget: '$20M-$80M', location: 'Paris, France', properties: 5, interactions: 8, lastContact: '2025-03-12', rating: 'Warm' },
  { id: 3, name: 'Marcus Aurelius', email: 'marcus@example.com', phone: '+39-06-555-0891', type: 'Seller', status: 'Active', budget: '$15M', location: 'Rome, Italy', properties: 2, interactions: 6, lastContact: '2025-03-10', rating: 'Hot' },
  { id: 4, name: 'Sophia Nakamura', email: 'sophia@example.com', phone: '+81-3-555-0456', type: 'Buyer', status: 'Inactive', budget: '$5M-$15M', location: 'Tokyo, Japan', properties: 1, interactions: 3, lastContact: '2025-02-28', rating: 'Cold' },
  { id: 5, name: 'Omar Al-Rashid', email: 'omar@example.com', phone: '+971-4-555-0789', type: 'Buyer', status: 'Active', budget: '$30M-$100M', location: 'Dubai, UAE', properties: 7, interactions: 18, lastContact: '2025-03-15', rating: 'Hot' },
  { id: 6, name: 'Isabella Fontaine', email: 'isabella@example.com', phone: '+41-22-555-0123', type: 'Seller', status: 'Active', budget: '$25M', location: 'Geneva, Switzerland', properties: 4, interactions: 9, lastContact: '2025-03-11', rating: 'Warm' },
];

const ratingColors: Record<string, string> = {
  Hot: 'text-red-400 bg-red-500/10 border-red-500/20',
  Warm: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  Cold: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
};

export default function AgentClientsPage() {
  return (
    <div className="min-h-screen bg-surface flex">
      <AgentSidebar />
      <div className="flex-1 md:pl-72 flex flex-col min-w-0">
        <header className="h-20 bg-surface/80 backdrop-blur-xl border-b border-border-subtle px-6 sm:px-8 flex items-center justify-between gap-4 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <Link href="/" className="md:hidden text-primary font-bold font-serif text-lg">
              EP
            </Link>
            <div className="flex items-center gap-2 text-xs font-mono text-outline">
              <span>CRM PORTFOLIO</span>
              <span>•</span>
              <span className="text-primary font-bold">CLIENT MANDATES ({clients.length})</span>
            </div>
          </div>
          <RoleSwitcher />
        </header>

        <main className="flex-1 p-6 sm:p-8 space-y-8 max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl font-bold text-white mb-1">My Sovereign Clients</h1>
              <p className="text-xs text-secondary font-light">{clients.length} accredited clients in active portfolio</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input type="text" placeholder="Search clients..." className="pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-primary/50 w-52 sm:w-64" />
              </div>
              <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-400 text-xs hover:border-primary/30 transition-all">
                <Filter className="w-4 h-4" /> Filter
              </button>
              <button className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs uppercase font-semibold">
                + Add Client
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Clients', value: '6', icon: Users },
              { label: 'Active', value: '5', icon: Star },
              { label: 'This Month', value: '2 new', icon: Calendar },
              { label: 'Portfolio Value', value: '$420M', icon: DollarSign },
            ].map((stat) => (
              <div key={stat.label} className="p-4 rounded-xl border border-white/10 bg-white/[0.02] flex items-center gap-3">
                <stat.icon className="w-8 h-8 text-amber-400/40" />
                <div>
                  <p className="text-zinc-500 text-xs">{stat.label}</p>
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Client Table */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 text-xs text-zinc-500 uppercase tracking-wider font-medium">Client</th>
                    <th className="text-left p-4 text-xs text-zinc-500 uppercase tracking-wider font-medium">Type</th>
                    <th className="text-left p-4 text-xs text-zinc-500 uppercase tracking-wider font-medium">Budget</th>
                    <th className="text-left p-4 text-xs text-zinc-500 uppercase tracking-wider font-medium">Location</th>
                    <th className="text-left p-4 text-xs text-zinc-500 uppercase tracking-wider font-medium">Rating</th>
                    <th className="text-left p-4 text-xs text-zinc-500 uppercase tracking-wider font-medium">Interactions</th>
                    <th className="text-left p-4 text-xs text-zinc-500 uppercase tracking-wider font-medium">Last Contact</th>
                    <th className="text-left p-4 text-xs text-zinc-500 uppercase tracking-wider font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <tr key={client.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-semibold text-sm">
                            {client.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-white text-sm font-medium">{client.name}</p>
                            <p className="text-zinc-500 text-xs">{client.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-zinc-400">{client.type}</td>
                      <td className="p-4 text-sm text-white font-medium">{client.budget}</td>
                      <td className="p-4">
                        <span className="flex items-center gap-1 text-sm text-zinc-400">
                          <MapPin className="w-3 h-3" /> {client.location}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${ratingColors[client.rating]}`}>{client.rating}</span>
                      </td>
                      <td className="p-4 text-sm text-zinc-400">{client.interactions}</td>
                      <td className="p-4 text-sm text-zinc-500">{client.lastContact}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-amber-400 transition-all"><Phone className="w-4 h-4" /></button>
                          <button className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-amber-400 transition-all"><Mail className="w-4 h-4" /></button>
                          <button className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-amber-400 transition-all"><MoreVertical className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
