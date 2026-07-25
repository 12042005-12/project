import { BadgeCheck, Camera, Heart, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/auth-context';
import { Navbar } from '../components/navbar';
import { Sidebar } from '../components/sidebar';
import { Footer } from '../components/footer';
import { ErrorState } from '../components/ui/error-state';
import { LoadingSkeleton } from '../components/ui/loading-skeleton';
import { useAuthProfile } from '../services/api-service';

export function ProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const { data, isLoading, isError, error } = useAuthProfile();
  const profile = data || user;
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(244,114,182,0.2),_transparent_35%),linear-gradient(135deg,_#020617,_#111827_55%,_#1f2937)] text-slate-100">
      <Navbar onToggleSidebar={() => setSidebarOpen((open) => !open)} />
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:px-8">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 space-y-6">
          <section className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/30">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-300">User profile</p>
                <h1 className="mt-2 text-3xl font-semibold text-white">{profile?.email || user?.email || 'Your profile'}</h1>
                <p className="mt-2 text-sm text-slate-400">Manage your style profile so the AI can tailor recommendations more precisely.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
                Role: {profile?.role || user?.role || 'member'}
              </div>
            </div>
          </section>
          {isError ? <ErrorState message={(error as Error)?.message || 'Unable to load your profile.'} /> : null}
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <section className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6">
              {isLoading ? (
                <LoadingSkeleton rows={3} />
              ) : (
                <div className="rounded-[1.5rem] border border-pink-400/20 bg-pink-500/10 p-5">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-white/10 p-3">
                      <BadgeCheck className="h-5 w-5 text-pink-200" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Minimal luxury</p>
                      <p className="text-sm text-slate-400">Comfortable, polished, and easy to mix.</p>
                    </div>
                  </div>
                  <div className="mt-5 space-y-3 text-sm text-slate-300">
                    <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-3">Color palette: cream, navy, black</div>
                    <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-3">Preferred silhouettes: relaxed tailoring</div>
                    <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-3">Occasions: work, dinner, travel</div>
                  </div>
                </div>
              )}
            </section>
            <section className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div>
                    <p className="font-medium text-white">Favorite looks</p>
                    <p className="text-sm text-slate-400">Tailored layers and elevated basics</p>
                  </div>
                  <Heart className="h-5 w-5 text-pink-300" />
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div>
                    <p className="font-medium text-white">Try-on preferences</p>
                    <p className="text-sm text-slate-400">Prioritize realistic lighting and fit overlays</p>
                  </div>
                  <Camera className="h-5 w-5 text-pink-300" />
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div>
                    <p className="font-medium text-white">AI confidence</p>
                    <p className="text-sm text-slate-400">Balance recommendations with your personal taste</p>
                  </div>
                  <Sparkles className="h-5 w-5 text-pink-300" />
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
