import { Metadata } from 'next';
import { Calendar, Clock, MapPin, User, Phone, Video, CheckCircle2, XCircle, AlertCircle, Filter, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Appointments | Agent Dashboard | EstatePro',
  description: 'Manage property viewings, client appointments, and your calendar schedule.',
};

const appointments = [
  { id: 1, client: 'Alexander Hamilton', property: 'The Sovereign Penthouse', date: '2025-03-16', time: '10:00 AM', duration: '1 hour', type: 'VIP Viewing', status: 'confirmed', location: 'One Hyde Park, London' },
  { id: 2, client: 'Omar Al-Rashid', property: 'Palm Jumeirah Royal Villa', date: '2025-03-16', time: '2:00 PM', duration: '2 hours', type: 'Property Tour', status: 'confirmed', location: 'Palm Jumeirah, Dubai' },
  { id: 3, client: 'Catherine Medici', property: 'Champs-Élysées Duplex', date: '2025-03-17', time: '11:00 AM', duration: '45 min', type: 'Virtual Tour', status: 'pending', location: 'Video Call' },
  { id: 4, client: 'Isabella Fontaine', property: 'Lake Geneva Estate', date: '2025-03-17', time: '3:30 PM', duration: '1.5 hours', type: 'Property Tour', status: 'confirmed', location: 'Montreux, Switzerland' },
  { id: 5, client: 'Sophia Nakamura', property: 'Roppongi Hills Penthouse', date: '2025-03-18', time: '9:00 AM', duration: '1 hour', type: 'Consultation', status: 'cancelled', location: 'Tokyo Office' },
  { id: 6, client: 'Marcus Aurelius', property: 'Roman Villa Estate', date: '2025-03-18', time: '4:00 PM', duration: '2 hours', type: 'Property Tour', status: 'pending', location: 'Trastevere, Rome' },
];

const statusConfig: Record<string, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  confirmed: { label: 'Confirmed', color: 'text-emerald-400 bg-emerald-500/10', icon: CheckCircle2 },
  pending: { label: 'Pending', color: 'text-amber-400 bg-amber-500/10', icon: AlertCircle },
  cancelled: { label: 'Cancelled', color: 'text-red-400 bg-red-500/10', icon: XCircle },
};

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function AgentAppointmentsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Appointments</h1>
              <p className="text-zinc-500">Manage your viewing schedule and client meetings</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-400 text-sm hover:border-amber-500/30 transition-all">
                <Filter className="w-4 h-4" /> Filter
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black text-sm font-medium">
                <Plus className="w-4 h-4" /> New Appointment
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Calendar Widget */}
            <div className="lg:col-span-1">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sticky top-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-semibold">March 2025</h3>
                  <div className="flex items-center gap-1">
                    <button className="p-1 rounded-lg hover:bg-white/5 text-zinc-500"><ChevronLeft className="w-4 h-4" /></button>
                    <button className="p-1 rounded-lg hover:bg-white/5 text-zinc-500"><ChevronRight className="w-4 h-4" /></button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {weekDays.map((d) => (
                    <div key={d} className="text-center text-xs text-zinc-600 py-1">{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                    const hasAppointment = [16, 17, 18].includes(day);
                    const isToday = day === 15;
                    return (
                      <button
                        key={day}
                        className={`aspect-square rounded-lg text-sm flex items-center justify-center relative transition-all
                          ${isToday ? 'bg-amber-500 text-black font-bold' : hasAppointment ? 'bg-white/5 text-white hover:bg-white/10' : 'text-zinc-500 hover:bg-white/5'}`}
                      >
                        {day}
                        {hasAppointment && !isToday && <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-amber-400" />}
                      </button>
                    );
                  })}
                </div>

                {/* Today's Stats */}
                <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                  {[
                    { label: 'Today', value: '2 appointments' },
                    { label: 'This Week', value: '6 appointments' },
                    { label: 'Pending Confirmation', value: '2' },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between text-sm">
                      <span className="text-zinc-500">{stat.label}</span>
                      <span className="text-white font-medium">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Appointments List */}
            <div className="lg:col-span-2 space-y-4">
              {['2025-03-16', '2025-03-17', '2025-03-18'].map((date) => {
                const dayAppts = appointments.filter((a) => a.date === date);
                const dateLabel = new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
                return (
                  <div key={date}>
                    <h3 className="text-sm font-medium text-zinc-400 mb-3">{dateLabel}</h3>
                    <div className="space-y-3">
                      {dayAppts.map((appt) => {
                        const status = statusConfig[appt.status];
                        const StatusIcon = status.icon;
                        return (
                          <div key={appt.id} className={`rounded-2xl border bg-white/[0.02] p-5 transition-all hover:border-amber-500/20 ${appt.status === 'cancelled' ? 'border-white/5 opacity-60' : 'border-white/10'}`}>
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/20 flex items-center justify-center">
                                  {appt.type === 'Virtual Tour' ? <Video className="w-5 h-5 text-amber-400" /> : <Calendar className="w-5 h-5 text-amber-400" />}
                                </div>
                                <div>
                                  <h4 className="text-white font-semibold text-sm">{appt.property}</h4>
                                  <p className="text-zinc-500 text-xs">{appt.type}</p>
                                </div>
                              </div>
                              <span className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                                <StatusIcon className="w-3 h-3" /> {status.label}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-zinc-500">
                              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {appt.time} ({appt.duration})</span>
                              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {appt.location}</span>
                              <span className="flex items-center gap-1"><User className="w-3 h-3" /> {appt.client}</span>
                            </div>
                            {appt.status !== 'cancelled' && (
                              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/5">
                                <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 text-zinc-400 text-xs hover:text-amber-400 transition-all"><Phone className="w-3 h-3" /> Call</button>
                                <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 text-zinc-400 text-xs hover:text-amber-400 transition-all"><Video className="w-3 h-3" /> Video</button>
                                {appt.status === 'pending' && (
                                  <>
                                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs ml-auto">Confirm</button>
                                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-xs">Decline</button>
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
