import { useState } from 'react';
import { BarChart3, Sparkles } from 'lucide-react';
import { Navbar } from '../components/navbar';
import { Sidebar } from '../components/sidebar';
import { Footer } from '../components/footer';

export function AnalyticsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(244,114,182,0.2),_transparent_35%),linear-gradient(135deg,_#020617,_#111827_55%,_#1f2937)] text-slate-100">
      <Navbar onToggleSidebar={() => setSidebarOpen((open) => !open)} />
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:px-8">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 space-y-6">
          <section className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/30">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-pink-500/10 p-3 text-pink-300">
                <BarChart3 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-300">Analytics</p>
                <h1 className="mt-1 text-3xl font-semibold text-white">Understand your style activity and trends.</h1>
              </div>
            </div>
          </section>
          <section className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6">
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { label: 'Engagement', value: '92%' },
                { label: 'Recommendation acceptance', value: '84%' },
              ].map((item) => (
                <div key={item.label} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-slate-400">{item.label}</p>
                  <p className="mt-2 text-3xl font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-2 rounded-2xl border border-pink-400/20 bg-pink-500/10 p-3 text-sm text-pink-200">
              <Sparkles className="h-4 w-4" />
              Analytics cards are ready to populate with live backend metrics.
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}
