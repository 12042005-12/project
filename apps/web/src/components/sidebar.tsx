import { LayoutGrid, MessageCircleMore, Settings, Shirt, Sparkles, UserCircle2, Users, Watch, Bell, Shield } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  open: boolean;
  onClose?: () => void;
}

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { to: '/profile', label: 'Profile', icon: UserCircle2 },
  { to: '/wardrobe', label: 'Wardrobe', icon: Shirt },
  { to: '/upload', label: 'Upload', icon: Watch },
  { to: '/recommendations', label: 'Recommendations', icon: Sparkles },
  { to: '/chat', label: 'Stylist Chat', icon: MessageCircleMore },
  { to: '/try-on', label: 'Virtual Try-On', icon: Sparkles },
  { to: '/saved-outfits', label: 'Saved Outfits', icon: Shirt },
  { to: '/wishlist', label: 'Wishlist', icon: Shirt },
  { to: '/community', label: 'Community', icon: Users },
  { to: '/notifications', label: 'Notifications', icon: Bell },
  { to: '/search', label: 'Search', icon: Sparkles },
  { to: '/analytics', label: 'Analytics', icon: Sparkles },
  { to: '/settings', label: 'Settings', icon: Settings },
  { to: '/admin', label: 'Admin', icon: Shield },
];

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <aside className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-white/10 bg-slate-950/95 p-5 backdrop-blur transition-transform duration-300 lg:static lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold text-white">Explore</p>
          <p className="text-sm text-slate-400">Style workspace</p>
        </div>
        <button className="rounded-full p-2 text-slate-400 hover:bg-white/10 lg:hidden" onClick={onClose}>
          ×
        </button>
      </div>
      <nav className="space-y-2">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `flex items-center gap-3 rounded-2xl px-3 py-3 text-sm transition ${isActive ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
            onClick={onClose}
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
