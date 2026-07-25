import { useState } from 'react';
import { MessageCircleMore, Send } from 'lucide-react';
import { Navbar } from '../components/navbar';
import { Sidebar } from '../components/sidebar';
import { Footer } from '../components/footer';

export function ChatPage() {
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
                <MessageCircleMore className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-300">AI fashion stylist</p>
                <h1 className="mt-1 text-3xl font-semibold text-white">Ask for outfit guidance, moodboards, or wardrobe fixes.</h1>
              </div>
            </div>
          </section>
          <section className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6">
            <div className="space-y-4 rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-4">
              <div className="rounded-2xl bg-white/5 p-4 text-sm text-slate-300">You: I need a polished look for a client dinner.</div>
              <div className="rounded-2xl bg-pink-500/10 p-4 text-sm text-pink-200">Stylist: Try a tailored blazer, slim trousers, and a silk top with sculptural earrings.</div>
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-3">
              <input className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500" placeholder="Message your stylist..." />
              <button className="rounded-full bg-gradient-to-r from-pink-500 to-violet-500 p-3 text-white">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}
