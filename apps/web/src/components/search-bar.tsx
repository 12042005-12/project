import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
}

export function SearchBar({ placeholder = 'Search...' }: SearchBarProps) {
  return (
    <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/80 px-3 py-3 text-sm text-slate-400">
      <Search className="h-4 w-4" />
      <input className="w-full bg-transparent outline-none placeholder:text-slate-500" placeholder={placeholder} />
    </label>
  );
}
