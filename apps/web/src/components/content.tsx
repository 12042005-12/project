import type { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function SectionHeader({ title, description, action }: SectionHeaderProps) {
  return (
    <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <p className="mt-1 text-sm text-slate-400">{description}</p>
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}

interface PanelProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function Panel({ title, description, children, className = '' }: PanelProps) {
  return (
    <section className={`rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/20 ${className}`.trim()}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {description ? <p className="mt-1 text-sm text-slate-400">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  hint: string;
}

export function StatCard({ label, value, hint }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-sm text-slate-500">{hint}</p>
    </div>
  );
}
