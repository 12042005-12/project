import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Camera,
  LayoutGrid,
  LogOut,
  Settings,
  Shirt,
  Sparkles,
  UserCircle2,
} from 'lucide-react';

interface AppShellProps {
  title: string;
  description: string;
  children: ReactNode;
  action?: ReactNode;
  showSidebar?: boolean;
}

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { to: '/profile', label: 'Profile', icon: UserCircle2 },
  { to: '/wardrobe', label: 'Wardrobe', icon: Shirt },
  { to: '/recommendations', label: 'Recommendations', icon: Sparkles },
  { to: '/try-on', label: 'Try-On', icon: Camera },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export function AppShell({
  title,
  description,
  children,
  action,
  showSidebar = true,
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(244,114,182,0.18),_transparent_35%),linear-gradient(135deg,_#020617,_#111827_55%,_#1f2937)] text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col lg:flex-row">
        {showSidebar ? (
          <aside className="w-full border-b border-white/10 bg-slate-950/60 p-6 backdrop-blur lg:w-72 lg:border-b-0 lg:border-r">
            <div className="mb-8 flex items-center gap-3">
              <div className="rounded-2xl bg-gradient-to-br from-pink-500 to-violet-500 p-3">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">Make-It-Wear-It</p>
                <p className="text-sm text-slate-400">AI Style Studio</p>
              </div>
            </div>

            <nav className="space-y-2">
              {navItems.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition ${
                      isActive
                        ? 'bg-white/10 text-white shadow-lg shadow-pink-500/10'
                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </NavLink>
              ))}
            </nav>

            <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold">Try-on mode</p>
              <p className="mt-2 text-sm text-slate-400">
                Sync your wardrobe and let the AI draft polished looks in seconds.
              </p>
              <button className="mt-4 flex items-center gap-2 text-sm font-medium text-pink-300">
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          </aside>
        ) : null}

        <main className="flex-1 p-6 sm:p-8 lg:p-10">
          <header className="mb-8 flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-300">
                Personal styling assistant
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-white">{title}</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-400">{description}</p>
            </div>
            {action ? <div>{action}</div> : null}
          </header>
          {children}
        </main>
      </div>
    </div>
  );
}
