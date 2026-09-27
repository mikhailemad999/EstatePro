import { Metadata } from 'next';
import { CheckSquare, Clock, AlertCircle, Plus, Filter, Calendar, User, Home, Flag, MoreVertical } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tasks | Agent Dashboard | EstatePro',
  description: 'Manage your daily tasks, follow-ups, and action items.',
};

const tasks = [
  { id: 1, title: 'Follow up with Alexander Hamilton on Penthouse offer', priority: 'High', status: 'in_progress', due: '2025-03-16', client: 'Alexander Hamilton', property: 'The Sovereign Penthouse', category: 'Follow-up' },
  { id: 2, title: 'Prepare market analysis report for Dubai portfolio', priority: 'High', status: 'todo', due: '2025-03-17', client: 'Omar Al-Rashid', property: 'Dubai Portfolio', category: 'Report' },
  { id: 3, title: 'Schedule professional photography for Lake Como listing', priority: 'Medium', status: 'todo', due: '2025-03-18', client: null, property: 'Lake Como Villa', category: 'Media' },
  { id: 4, title: 'Review and sign seller agreement for Monaco listing', priority: 'High', status: 'in_progress', due: '2025-03-16', client: 'Isabella Fontaine', property: 'Monaco Harbour Residence', category: 'Legal' },
  { id: 5, title: 'Update CRM notes after Catherine meeting', priority: 'Low', status: 'completed', due: '2025-03-15', client: 'Catherine Medici', property: null, category: 'CRM' },
  { id: 6, title: 'Send comparable sales data to Sophia', priority: 'Medium', status: 'todo', due: '2025-03-19', client: 'Sophia Nakamura', property: 'Roppongi Hills Penthouse', category: 'Research' },
  { id: 7, title: 'Arrange virtual tour equipment for remote viewing', priority: 'Low', status: 'completed', due: '2025-03-14', client: null, property: null, category: 'Operations' },
  { id: 8, title: 'Negotiate commission split with co-listing agent', priority: 'Medium', status: 'in_progress', due: '2025-03-17', client: null, property: 'Mayfair Townhouse', category: 'Finance' },
];

const priorityColors: Record<string, string> = {
  High: 'text-red-400 bg-red-500/10 border-red-500/20',
  Medium: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  Low: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
};

const statusConfig: Record<string, { label: string; icon: typeof CheckSquare; color: string }> = {
  todo: { label: 'To Do', icon: AlertCircle, color: 'text-zinc-400' },
  in_progress: { label: 'In Progress', icon: Clock, color: 'text-amber-400' },
  completed: { label: 'Done', icon: CheckSquare, color: 'text-emerald-400' },
};

export default function AgentTasksPage() {
  const todoCount = tasks.filter(t => t.status === 'todo').length;
  const inProgressCount = tasks.filter(t => t.status === 'in_progress').length;
  const doneCount = tasks.filter(t => t.status === 'completed').length;

  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Tasks</h1>
              <p className="text-zinc-500">{tasks.length} tasks · {todoCount} pending</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-400 text-sm hover:border-amber-500/30 transition-all">
                <Filter className="w-4 h-4" /> Filter
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black text-sm font-medium">
                <Plus className="w-4 h-4" /> Add Task
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: 'To Do', value: todoCount, color: 'text-zinc-400', bg: 'bg-zinc-500/10' },
              { label: 'In Progress', value: inProgressCount, color: 'text-amber-400', bg: 'bg-amber-500/10' },
              { label: 'Completed', value: doneCount, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
            ].map((stat) => (
              <div key={stat.label} className="p-4 rounded-xl border border-white/10 bg-white/[0.02] flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <span className={`text-xl font-bold ${stat.color}`}>{stat.value}</span>
                </div>
                <span className="text-zinc-400 text-sm">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Kanban-style columns */}
          <div className="grid lg:grid-cols-3 gap-6">
            {['todo', 'in_progress', 'completed'].map((status) => {
              const config = statusConfig[status];
              const StatusIcon = config.icon;
              const statusTasks = tasks.filter(t => t.status === status);
              return (
                <div key={status}>
                  <div className="flex items-center gap-2 mb-4">
                    <StatusIcon className={`w-4 h-4 ${config.color}`} />
                    <h3 className={`text-sm font-medium ${config.color}`}>{config.label}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-white/5 text-zinc-500 text-xs">{statusTasks.length}</span>
                  </div>
                  <div className="space-y-3">
                    {statusTasks.map((task) => (
                      <div key={task.id} className={`rounded-xl border bg-white/[0.02] p-4 transition-all hover:border-amber-500/20 ${task.status === 'completed' ? 'border-white/5 opacity-70' : 'border-white/10'}`}>
                        <div className="flex items-start justify-between mb-3">
                          <h4 className={`text-sm font-medium flex-1 pr-2 ${task.status === 'completed' ? 'text-zinc-500 line-through' : 'text-white'}`}>
                            {task.title}
                          </h4>
                          <button className="text-zinc-600 hover:text-zinc-400"><MoreVertical className="w-4 h-4" /></button>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${priorityColors[task.priority]}`}>
                            <Flag className="w-2.5 h-2.5 inline mr-0.5" />{task.priority}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-500 text-[10px]">{task.category}</span>
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-zinc-500">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {task.due}</span>
                          {task.client && <span className="flex items-center gap-1"><User className="w-3 h-3" /> {task.client}</span>}
                          {task.property && <span className="flex items-center gap-1 truncate"><Home className="w-3 h-3" /> {task.property}</span>}
                        </div>
                      </div>
                    ))}
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
