import { Metadata } from 'next';
import { FileText, Clock, CheckCircle2, XCircle, AlertCircle, Home, DollarSign, Calendar, ArrowRight, Filter } from 'lucide-react';

export const metadata: Metadata = {
  title: 'My Applications | Buyer Dashboard | EstatePro',
  description: 'Track your rental applications, mortgage pre-qualifications, and property purchase applications.',
};

const applications = [
  {
    id: 'APP-2025-001',
    property: 'The Sovereign Penthouse at One Hyde Park',
    type: 'Purchase',
    status: 'under_review',
    submittedDate: '2025-03-10',
    lastUpdate: '2025-03-12',
    price: '$48,500,000',
    agent: 'Victoria Sterling',
    progress: 60,
    steps: ['Application Submitted', 'Documents Verified', 'Under Review', 'Decision Pending', 'Completed'],
    currentStep: 2,
  },
  {
    id: 'APP-2025-002',
    property: 'Palm Jumeirah Royal Villa',
    type: 'Mortgage Pre-Qualification',
    status: 'approved',
    submittedDate: '2025-03-05',
    lastUpdate: '2025-03-08',
    price: '$35,000,000',
    agent: 'James Harrington',
    progress: 100,
    steps: ['Application Submitted', 'Credit Check', 'Income Verification', 'Pre-Approved'],
    currentStep: 3,
  },
  {
    id: 'APP-2025-003',
    property: 'Mayfair Georgian Townhouse',
    type: 'Rental',
    status: 'rejected',
    submittedDate: '2025-02-28',
    lastUpdate: '2025-03-02',
    price: '$85,000/mo',
    agent: 'Sophia Chen',
    progress: 100,
    steps: ['Application Submitted', 'Documents Reviewed', 'Decision'],
    currentStep: 2,
    reason: 'Property no longer available for lease.',
  },
  {
    id: 'APP-2025-004',
    property: 'Monaco Harbour Residence',
    type: 'Purchase',
    status: 'pending',
    submittedDate: '2025-03-14',
    lastUpdate: '2025-03-14',
    price: '$62,000,000',
    agent: 'Elena Petrova',
    progress: 20,
    steps: ['Application Submitted', 'Document Collection', 'Review', 'Decision'],
    currentStep: 0,
  },
];

const statusConfig: Record<string, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  approved: { label: 'Approved', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', icon: CheckCircle2 },
  under_review: { label: 'Under Review', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', icon: Clock },
  pending: { label: 'Pending', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20', icon: AlertCircle },
  rejected: { label: 'Rejected', color: 'text-red-400 bg-red-500/10 border-red-500/20', icon: XCircle },
};

export default function ApplicationsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">My Applications</h1>
              <p className="text-zinc-500">Track your purchase, rental, and mortgage applications</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-400 text-sm hover:border-amber-500/30 transition-all">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total', value: '4', color: 'text-white' },
              { label: 'Approved', value: '1', color: 'text-emerald-400' },
              { label: 'Under Review', value: '1', color: 'text-amber-400' },
              { label: 'Pending', value: '1', color: 'text-blue-400' },
            ].map((stat) => (
              <div key={stat.label} className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <p className="text-zinc-500 text-xs mb-1">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Applications */}
          <div className="space-y-4">
            {applications.map((app) => {
              const status = statusConfig[app.status];
              const StatusIcon = status.icon;
              return (
                <div key={app.id} className="rounded-2xl border border-white/10 bg-white/[0.02] hover:border-amber-500/20 transition-all overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                          {app.type === 'Rental' ? <Home className="w-5 h-5 text-amber-400" /> : app.type === 'Mortgage Pre-Qualification' ? <DollarSign className="w-5 h-5 text-amber-400" /> : <FileText className="w-5 h-5 text-amber-400" />}
                        </div>
                        <div>
                          <h3 className="text-white font-semibold mb-1">{app.property}</h3>
                          <div className="flex items-center gap-3 text-xs text-zinc-500">
                            <span>{app.id}</span>
                            <span>•</span>
                            <span>{app.type}</span>
                            <span>•</span>
                            <span>{app.price}</span>
                          </div>
                        </div>
                      </div>
                      <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${status.color}`}>
                        <StatusIcon className="w-3 h-3" /> {status.label}
                      </span>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex items-center gap-1 mb-4">
                      {app.steps.map((step, i) => (
                        <div key={step} className="flex-1 flex items-center gap-1">
                          <div className={`h-1.5 flex-1 rounded-full ${i <= app.currentStep ? (app.status === 'rejected' && i === app.currentStep ? 'bg-red-500/60' : 'bg-amber-500/60') : 'bg-white/10'}`} />
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-zinc-500">
                      {app.steps.map((step, i) => (
                        <span key={step} className={`${i === app.currentStep ? (app.status === 'rejected' ? 'text-red-400' : 'text-amber-400') : i < app.currentStep ? 'text-zinc-400' : ''}`}>
                          {step}
                        </span>
                      ))}
                    </div>

                    {app.reason && (
                      <div className="mt-4 p-3 rounded-lg bg-red-500/5 border border-red-500/10 text-red-400 text-sm">
                        {app.reason}
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                      <div className="flex items-center gap-4 text-xs text-zinc-500">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Submitted: {app.submittedDate}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Updated: {app.lastUpdate}</span>
                        <span>Agent: {app.agent}</span>
                      </div>
                      <button className="text-amber-400 text-sm flex items-center gap-1 hover:gap-2 transition-all">
                        Details <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
