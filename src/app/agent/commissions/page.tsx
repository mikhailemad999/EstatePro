import { Metadata } from 'next';
import Link from 'next/link';
import { DollarSign, TrendingUp, Calendar, Home, ArrowUpRight, ArrowDownRight, Filter, Download, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import AgentSidebar from "@/components/dashboards/AgentSidebar";
import RoleSwitcher from "@/components/common/RoleSwitcher";

export const metadata: Metadata = {
  title: 'Commissions | Agent Dashboard | EstatePro',
  description: 'Track your commission earnings, pending payouts, and transaction history.',
};

const transactions = [
  { id: 'TXN-001', property: 'The Sovereign Penthouse', buyer: 'Alexander Hamilton', salePrice: 48500000, commission: 2.5, earned: 1212500, status: 'paid', date: '2025-03-01', type: 'Sale' },
  { id: 'TXN-002', property: 'Palm Jumeirah Villa', buyer: 'Omar Al-Rashid', salePrice: 35000000, commission: 2.0, earned: 700000, status: 'pending', date: '2025-03-10', type: 'Sale' },
  { id: 'TXN-003', property: 'Mayfair Townhouse', buyer: 'Catherine Medici', salePrice: 22000000, commission: 2.5, earned: 550000, status: 'paid', date: '2025-02-15', type: 'Sale' },
  { id: 'TXN-004', property: 'Monaco Harbour Residence', buyer: 'Isabella Fontaine', salePrice: 62000000, commission: 1.5, earned: 930000, status: 'processing', date: '2025-03-12', type: 'Sale' },
  { id: 'TXN-005', property: 'Lake Como Villa', buyer: 'Marcus Aurelius', salePrice: 18500000, commission: 3.0, earned: 555000, status: 'paid', date: '2025-01-28', type: 'Sale' },
  { id: 'TXN-006', property: 'Central Park Penthouse', buyer: 'Sophia Nakamura', salePrice: 29000000, commission: 2.0, earned: 580000, status: 'pending', date: '2025-03-14', type: 'Sale' },
];

const statusStyles: Record<string, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  paid: { label: 'Paid', color: 'text-emerald-400 bg-emerald-500/10', icon: CheckCircle2 },
  pending: { label: 'Pending', color: 'text-amber-400 bg-amber-500/10', icon: Clock },
  processing: { label: 'Processing', color: 'text-blue-400 bg-blue-500/10', icon: AlertCircle },
};

function formatUSD(n: number) { return '$' + n.toLocaleString(); }

export default function AgentCommissionsPage() {
  const totalEarned = transactions.filter(t => t.status === 'paid').reduce((s, t) => s + t.earned, 0);
  const totalPending = transactions.filter(t => t.status !== 'paid').reduce((s, t) => s + t.earned, 0);
  const totalVolume = transactions.reduce((s, t) => s + t.salePrice, 0);
  const avgCommission = transactions.reduce((s, t) => s + t.commission, 0) / transactions.length;

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
              <span>SETTLEMENT TELEMETRY</span>
              <span>•</span>
              <span className="text-status-verified font-bold">COMMISSION ACCRUALS</span>
            </div>
          </div>
          <RoleSwitcher />
        </header>

        <main className="flex-1 p-6 sm:p-8 space-y-8 max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl font-bold text-white mb-1">Commission Telemetry</h1>
              <p className="text-xs text-secondary font-light">Track your gross earned fees, escrow distributions, and transaction volume</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-400 text-xs hover:border-primary/30 transition-all">
                <Download className="w-4 h-4" /> Export CSV
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Earned', value: formatUSD(totalEarned), icon: DollarSign, trend: '+18%', up: true },
              { label: 'Pending Payouts', value: formatUSD(totalPending), icon: Clock, trend: '3 pending', up: true },
              { label: 'Total Sales Volume', value: formatUSD(totalVolume), icon: TrendingUp, trend: '+24%', up: true },
              { label: 'Avg Commission Rate', value: `${avgCommission.toFixed(1)}%`, icon: Home, trend: '-0.2%', up: false },
            ].map((stat) => (
              <div key={stat.label} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/20 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <span className={`flex items-center gap-0.5 text-xs font-medium ${stat.up ? 'text-emerald-400' : 'text-red-400'}`}>
                    {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {stat.trend}
                  </span>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-zinc-500 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Earnings Chart Placeholder */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 mb-8">
            <h3 className="text-white font-semibold mb-4">Monthly Earnings</h3>
            <div className="flex items-end gap-3 h-48">
              {[45, 62, 38, 75, 55, 82, 68, 90, 73, 85, 95, 88].map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full rounded-t-lg bg-gradient-to-t from-amber-500/40 to-amber-500/10 transition-all hover:from-amber-500/60 hover:to-amber-500/20" style={{ height: `${v}%` }} />
                  <span className="text-[10px] text-zinc-600">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Transactions */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h3 className="text-white font-semibold">Transaction History</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    {['Transaction', 'Property', 'Sale Price', 'Rate', 'Commission', 'Status', 'Date'].map((h) => (
                      <th key={h} className="text-left p-4 text-xs text-zinc-500 uppercase tracking-wider font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((txn) => {
                    const s = statusStyles[txn.status];
                    const StatusIcon = s.icon;
                    return (
                      <tr key={txn.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="p-4 text-sm text-zinc-400 font-mono">{txn.id}</td>
                        <td className="p-4">
                          <p className="text-white text-sm">{txn.property}</p>
                          <p className="text-zinc-500 text-xs">{txn.buyer}</p>
                        </td>
                        <td className="p-4 text-sm text-white font-medium">{formatUSD(txn.salePrice)}</td>
                        <td className="p-4 text-sm text-zinc-400">{txn.commission}%</td>
                        <td className="p-4 text-sm text-amber-400 font-semibold">{formatUSD(txn.earned)}</td>
                        <td className="p-4">
                          <span className={`flex items-center gap-1 w-fit px-2.5 py-0.5 rounded-full text-xs font-medium ${s.color}`}>
                            <StatusIcon className="w-3 h-3" /> {s.label}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-zinc-500">{txn.date}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
