import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Navbar } from '../components/navbar';
import { Sidebar } from '../components/sidebar';
import { Footer } from '../components/footer';
import { OutfitCard } from '../components/outfit-card';
import { SearchBar } from '../components/search-bar';
import { FilterPanel } from '../components/filter-panel';
import { ErrorState } from '../components/ui/error-state';
import { LoadingSkeleton } from '../components/ui/loading-skeleton';
import { useRecommendations } from '../services/api-service';

export function RecommendationsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data, isLoading, isError, error } = useRecommendations();
  const recommendations = data || [];
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(244,114,182,0.2),_transparent_35%),linear-gradient(135deg,_#020617,_#111827_55%,_#1f2937)] text-slate-100">
      <Navbar onToggleSidebar={() => setSidebarOpen((open) => !open)} />
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:px-8">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 space-y-6">
          <section className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/30">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-300">Outfit recommendations</p>
                <h1 className="mt-2 text-3xl font-semibold text-white">AI-crafted looks for every occasion.</h1>
                <p className="mt-2 text-sm text-slate-400">Use your wardrobe, style profile, and calendar to generate suggestions that feel personal and actionable.</p>
              </div>
              <button className="rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-4 py-3 text-sm font-medium text-white">
                <Sparkles className="mr-2 inline h-4 w-4" /> Generate new
              </button>
            </div>
          </section>
          {isError ? <ErrorState message={(error as Error)?.message || 'Unable to load recommendations.'} /> : null}
          <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-4">
              <SearchBar placeholder="Search recommendations" />
              <FilterPanel title="Occasion" options={['Work', 'Casual', 'Dinner', 'Travel']} />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {isLoading ? (
                <LoadingSkeleton rows={4} />
              ) : (
                (recommendations as Array<{ title: string; description: string; tag?: string }>).map((outfit) => <OutfitCard key={outfit.title} {...outfit} />)
              )}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
