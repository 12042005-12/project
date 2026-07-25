import { Sparkles } from 'lucide-react';

interface ClothingCardProps {
  title: string;
  category: string;
  color: string;
  favorite?: boolean;
}

export function ClothingCard({ title, category, color, favorite = false }: ClothingCardProps) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/80 p-4 shadow-lg shadow-slate-950/20">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-white">{title}</h3>
          <p className="text-sm text-slate-400">{category}</p>
        </div>
        {favorite ? (
          <div className="rounded-full bg-pink-500/10 p-2 text-pink-300">
            <Sparkles className="h-4 w-4" />
          </div>
        ) : null}
      </div>
      <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-400">
        Color: {color}
      </div>
    </div>
  );
}
