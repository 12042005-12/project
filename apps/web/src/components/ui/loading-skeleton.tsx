export function LoadingSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="animate-pulse rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="h-4 w-2/3 rounded bg-slate-700" />
          <div className="mt-3 h-3 w-full rounded bg-slate-800" />
          <div className="mt-2 h-3 w-5/6 rounded bg-slate-800" />
        </div>
      ))}
    </div>
  );
}
