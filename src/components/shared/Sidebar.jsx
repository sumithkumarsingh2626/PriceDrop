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
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-white/10 bg-slate-950/70 px-4 py-6 backdrop-blur-2xl lg:flex">
      {/* Specular rim */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-px bg-gradient-to-b from-white/20 via-transparent to-white/10" />

      <div className="glass-card-iso p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-violet via-purple-600 to-brand-cyan shadow-glow text-lg font-bold text-white">
            <i className="bi bi-lightning-charge-fill" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-cyan">Price Drop</p>
            <p className="font-display text-lg font-extrabold text-white">Alert Pro</p>
          </div>
        </div>
      </div>

      <nav className="mt-8 flex flex-1 flex-col gap-1.5">
        {nav.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.to || pathname.startsWith(`${link.to}/`);
          return (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                'group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200',
                active
                  ? 'sidebar-link-active'
                  : 'text-slate-400 hover:bg-white/[0.06] hover:text-white hover:translate-x-1',
              )}
            >
              <Icon className={cn('h-4 w-4 transition-transform group-hover:scale-110', active ? 'text-brand-cyan' : 'text-slate-400')} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-center backdrop-blur-md">
        <p className="text-[11px] font-semibold text-slate-400">Automated Sweeps Active</p>
        <p className="mt-1 text-[10px] text-slate-500">© {new Date().getFullYear()} Price Drop Alert</p>
      </div>
    </aside>
  );
}
