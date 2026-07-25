import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export function HeroSection() {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-pink-500/20 via-slate-900 to-violet-500/20 p-8 shadow-2xl shadow-slate-950/30 lg:p-12">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-400/30 bg-pink-500/10 px-3 py-2 text-sm text-pink-200">
            <Sparkles className="h-4 w-4" />
            AI styling built around your wardrobe
          </div>
          <h1 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Discover outfits that feel personal, polished, and effortless.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Upload your wardrobe, chat with your AI stylist, and save looks you never want to forget.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/register" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-5 py-3 font-medium text-white">
              Start styling <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/dashboard" className="rounded-full border border-white/20 px-5 py-3 font-medium text-slate-200">
              Explore dashboard
            </Link>
          </div>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6">
          <div className="grid gap-3">
            {['Wardrobe-aware recommendations', 'Virtual try-on previews', 'AI stylist chat'].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
