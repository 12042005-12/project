import { useState } from 'react';
import { LayoutGrid, Sparkles, Shirt, Camera } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import { LoadingSkeleton } from '../components/ui/loading-skeleton';
import { ErrorState } from '../components/ui/error-state';
import { Navbar } from '../components/navbar';
import { Sidebar } from '../components/sidebar';
import { Footer } from '../components/footer';
import { OutfitCard } from '../components/outfit-card';
import { ClothingCard } from '../components/clothing-card';
import { useDashboardData } from '../services/api-service';

export function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data, isLoading, isError, error } = useDashboardData();
  const recommendations = data?.recommendations || [];
  const wardrobe = data?.wardrobe || [];
  const savedOutfits = data?.savedOutfits || [];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(244,114,182,0.2),_transparent_35%),linear-gradient(135deg,_#020617,_#111827_55%,_#1f2937)] text-slate-100">
      <Navbar onToggleSidebar={() => setSidebarOpen((open) => !open)} />
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:px-8">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 space-y-6">
          <section className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/30">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-300">Your style dashboard</p>
                <h1 className="mt-2 text-3xl font-semibold text-white">Welcome back to your wardrobe studio.</h1>
                <p className="mt-2 max-w-2xl text-sm text-slate-400">Track the latest outfit ideas, featured wardrobe pieces, and AI-guided recommendations from one place.</p>
              </div>
              <div className="rounded-2xl border border-pink-400/20 bg-pink-500/10 px-4 py-3 text-sm text-pink-200">
                Ready for your next look
              </div>
            </div>
          </section>

          {isError ? <ErrorState message={(error as Error)?.message || 'Unable to load the dashboard.'} /> : null}

          <div className="grid gap-4 md:grid-cols-3">
            {isLoading ? (
              <LoadingSkeleton rows={3} />
            ) : (
              [
                { label: 'Wardrobe pieces', value: wardrobe.length, icon: Shirt },
                { label: 'Outfit ideas', value: recommendations.length, icon: LayoutGrid },
                { label: 'Saved looks', value: savedOutfits.length, icon: Sparkles },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="rounded-[1.5rem] border border-white/10 bg-slate-900/80 p-5">
                  <div className="flex items-center gap-2 text-pink-300">
                    <Icon className="h-4 w-4" />
                    <p className="text-sm text-slate-400">{label}</p>
                  </div>
                  <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
                </div>
              ))
            )}
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <section className="space-y-4 rounded-[2rem] border border-white/10 bg-slate-900/70 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Your recommended looks</h2>
                <div className="flex items-center gap-2 text-sm text-pink-200">
                  <Sparkles className="h-4 w-4" />
                  Curated today
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {isLoading ? (
                  <LoadingSkeleton rows={2} />
                ) : (
                  (recommendations as Array<{ title: string; description: string; tag?: string }>).slice(0, 2).map((outfit) => <OutfitCard key={outfit.title} {...outfit} />)
                )}
              </div>
            </section>

            <section className="space-y-4 rounded-[2rem] border border-white/10 bg-slate-900/70 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Wardrobe highlights</h2>
                <div className="flex items-center gap-2 text-sm text-pink-200">
                  <Camera className="h-4 w-4" />
                  Ready to wear
                </div>
              </div>
              <div className="space-y-3">
                {isLoading ? (
                  <LoadingSkeleton rows={3} />
                ) : (
                  (wardrobe as Array<{ name: string; category: string; color: string; favorite?: boolean }>).slice(0, 3).map((item) => <ClothingCard key={item.name} title={item.name} category={item.category} color={item.color} favorite={item.favorite} />)
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
      <Footer />
      <Outlet />
    </div>
  );
}
