import { Link, useLocation } from 'react-router-dom';
import { BarChart3, LayoutDashboard, PackageSearch, Settings, Shield } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { cn } from '@/lib/utils';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/products', label: 'Tracked products', icon: PackageSearch },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const { pathname } = useLocation();
  const role = useAuthStore((s) => s.user?.role);
  const nav = role === 'admin' ? [...links, { to: '/admin', label: 'Admin', icon: Shield }] : links;

  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-white/5 bg-slate-950/80 px-4 py-6 lg:flex">
      <div className="glass-card p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-violet to-brand-cyan text-lg font-bold text-white">
            <i className="bi bi-lightning-charge-fill" />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Price Drop</p>
            <p className="font-display text-lg font-bold text-white">Alert Pro</p>
          </div>
        </div>
      </div>

      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {nav.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.to || pathname.startsWith(`${link.to}/`);
          return (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition',
                active ? 'sidebar-link-active' : 'text-slate-400 hover:bg-white/5 hover:text-slate-100',
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <p className="mt-auto text-[10px] text-slate-600">© {new Date().getFullYear()} Price Drop Alert</p>
    </aside>
  );
}
