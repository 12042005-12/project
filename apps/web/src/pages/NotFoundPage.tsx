import { Home, SearchX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@ui/index';
import { AppShell } from '../components/app-shell';

export function NotFoundPage() {
  return (
    <AppShell
      title="Page not found"
      description="The route you requested does not exist. Return home and continue exploring your style studio."
      showSidebar={false}
    >
      <div className="mx-auto flex max-w-xl flex-col items-center rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 text-center shadow-2xl shadow-slate-950/30">
        <div className="rounded-full bg-pink-500/10 p-5 text-pink-300">
          <SearchX className="h-10 w-10" />
        </div>
        <h2 className="mt-6 text-3xl font-semibold text-white">We couldn’t find that page.</h2>
        <p className="mt-3 text-slate-400">
          The route may have moved, or you may have followed a stale link. Head back to the dashboard to continue styling.
        </p>
        <Link to="/dashboard" className="mt-6">
          <Button className="bg-gradient-to-r from-pink-500 to-violet-500 text-white">
            <Home className="mr-2 h-4 w-4" /> Back to dashboard
          </Button>
        </Link>
      </div>
    </AppShell>
  );
}
