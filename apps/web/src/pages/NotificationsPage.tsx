import { useState } from 'react';
import { Bell, Sparkles } from 'lucide-react';
import { Navbar } from '../components/navbar';
import { Sidebar } from '../components/sidebar';
import { Footer } from '../components/footer';

export function NotificationsPage() {
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
                <Bell className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-300">Notifications</p>
                <h1 className="mt-1 text-3xl font-semibold text-white">Stay on top of your latest styling updates.</h1>
              </div>
            </div>
          </section>
          <section className="space-y-3 rounded-[2rem] border border-white/10 bg-slate-900/70 p-6">
            {[
              { title: 'New outfit suggestion ready', message: 'Your AI stylist generated 3 fresh recommendations.' },
              { title: 'Wardrobe upload complete', message: 'A new tailored blazer is now available in your wardrobe.' },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2 text-pink-200">
                  <Sparkles className="h-4 w-4" />
                  <p className="font-medium text-white">{item.title}</p>
                </div>
                <p className="mt-2 text-sm text-slate-400">{item.message}</p>
              </div>
            ))}
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}
