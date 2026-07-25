import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Navbar } from '../components/navbar';
import { Sidebar } from '../components/sidebar';
import { Footer } from '../components/footer';
import { SearchBar } from '../components/search-bar';
import { FilterPanel } from '../components/filter-panel';
import { ClothingCard } from '../components/clothing-card';
import { ErrorState } from '../components/ui/error-state';
import { LoadingSkeleton } from '../components/ui/loading-skeleton';
import { useWardrobe } from '../services/api-service';

export function WardrobePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data, isLoading, isError, error } = useWardrobe();
  const wardrobe = data || [];
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(244,114,182,0.2),_transparent_35%),linear-gradient(135deg,_#020617,_#111827_55%,_#1f2937)] text-slate-100">
      <Navbar onToggleSidebar={() => setSidebarOpen((open) => !open)} />
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:px-8">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 space-y-6">
          <section className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/30">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-300">Wardrobe</p>
                <h1 className="mt-2 text-3xl font-semibold text-white">Manage your closet like a pro.</h1>
                <p className="mt-2 text-sm text-slate-400">Add, tag, and reorganize pieces so recommendations always reflect the clothes you own.</p>
              </div>
              <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-4 py-3 text-sm font-medium text-white">
                <Plus className="h-4 w-4" /> Add item
              </button>
            </div>
          </section>
          {isError ? <ErrorState message={(error as Error)?.message || 'Unable to load wardrobe.'} /> : null}
          <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-4">
              <SearchBar placeholder="Search wardrobe" />
              <FilterPanel title="Filters" options={['All', 'Favorites', 'Work', 'Weekend', 'Formal']} />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {isLoading ? (
                <LoadingSkeleton rows={4} />
              ) : (
                (wardrobe as Array<{ name: string; category: string; color: string; favorite?: boolean }>).map((item) => <ClothingCard key={item.name} title={item.name} category={item.category} color={item.color} favorite={item.favorite} />)
              )}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
