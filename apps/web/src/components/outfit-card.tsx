import { ArrowRight, Sparkles } from 'lucide-react';

interface OutfitCardProps {
  title: string;
  description: string;
  tag?: string;
}

export function OutfitCard({ title, description, tag }: OutfitCardProps) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/20">
      <div className="flex items-center justify-between">
        <div className="rounded-full bg-pink-500/10 px-3 py-1 text-sm text-pink-200">{tag || 'Style'}</div>
        <Sparkles className="h-5 w-5 text-pink-300" />
      </div>
      <h3 className="mt-4 font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-slate-400">{description}</p>
      <button className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-pink-200">
        View look <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}
