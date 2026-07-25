import { Menu, Sun, UserCircle2 } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/auth-context';

interface NavbarProps {
  onToggleSidebar?: () => void;
}

export function Navbar({ onToggleSidebar }: NavbarProps) {
  const { isAuthenticated, logout } = useAuth();
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button onClick={onToggleSidebar} className="rounded-full p-2 text-slate-300 hover:bg-white/10 lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
          <Link to="/" className="text-lg font-semibold text-white">
            Make-It-Wear-It
          </Link>
        </div>
        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <NavLink to="/dashboard" className="transition hover:text-white">
            Dashboard
          </NavLink>
          <NavLink to="/wardrobe" className="transition hover:text-white">
            Wardrobe
          </NavLink>
          <NavLink to="/recommendations" className="transition hover:text-white">
            Recommendations
          </NavLink>
          <NavLink to="/community" className="transition hover:text-white">
            Community
          </NavLink>
          <NavLink to="/search" className="transition hover:text-white">
            Search
          </NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <button className="rounded-full p-2 text-slate-300 hover:bg-white/10">
            <Sun className="h-4 w-4" />
          </button>
          {isAuthenticated ? (
            <button onClick={logout} className="rounded-full p-2 text-slate-300 hover:bg-white/10">
              <UserCircle2 className="h-5 w-5" />
            </button>
          ) : (
            <Link to="/login" className="rounded-full border border-white/10 px-3 py-2 text-sm text-white">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
