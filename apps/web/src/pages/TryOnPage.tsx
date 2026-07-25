import { useState } from 'react';
import { Camera, Sparkles } from 'lucide-react';
import { Navbar } from '../components/navbar';
import { Sidebar } from '../components/sidebar';
import { Footer } from '../components/footer';
import { OutfitCard } from '../components/outfit-card';
import { useTryOnHistory, useGenerateTryOn } from '../services/api-service';
import { ErrorState } from '../components/ui/error-state';
import { LoadingSkeleton } from '../components/ui/loading-skeleton';

export function TryOnPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data, isLoading, isError, error } = useTryOnHistory();
  const generateTryOn = useGenerateTryOn();
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(244,114,182,0.2),_transparent_35%),linear-gradient(135deg,_#020617,_#111827_55%,_#1f2937)] text-slate-100">
      <Navbar onToggleSidebar={() => setSidebarOpen((open) => !open)} />
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:px-8">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 space-y-6">
          <section className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/30">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-300">Virtual try-on</p>
                <h1 className="mt-2 text-3xl font-semibold text-white">Preview looks before you commit.</h1>
                <p className="mt-2 text-sm text-slate-400">Try a realistic preview of your outfit choices and compare your looks before you wear them.</p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-pink-400/20 bg-pink-500/10 px-4 py-2 text-sm text-pink-200">
                <Camera className="h-4 w-4" />
                Live preview ready
              </div>
            </div>
          </section>
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6">
              <div className="rounded-[2rem] border border-dashed border-white/10 bg-white/5 p-10 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pink-500/10 text-pink-300">
                  <Camera className="h-8 w-8" />
                </div>
                <h2 className="mt-5 text-xl font-semibold text-white">Upload a photo to preview an outfit</h2>
                <p className="mt-2 text-sm text-slate-400">Use your selected look and let the experience render a realistic preview.</p>
                <button onClick={() => {
                  const formData = new FormData();
                  formData.append('image', new File([''], 'demo.png', { type: 'image/png' }));
                  void generateTryOn.mutateAsync(formData);
                }} className="mt-5 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-4 py-3 text-sm font-medium text-white">
                  {generateTryOn.isPending ? 'Generating…' : 'Generate try-on'}
                </button>
              </div>
            </section>
            <section className="space-y-4 rounded-[2rem] border border-white/10 bg-slate-900/70 p-6">
              <div className="flex items-center gap-2 text-sm text-pink-200">
                <Sparkles className="h-4 w-4" />
                Suggested looks
              </div>
              {isLoading ? <LoadingSkeleton rows={2} /> : isError ? <ErrorState message={(error as Error)?.message || 'Unable to load try-on history.'} /> : ((data || []) as Array<{ title: string; description: string; tag?: string }>).map((item) => <OutfitCard key={item.title} {...item} />)}
            </section>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
