import { Link, useLocation } from 'react-router-dom';
import { BarChart3, LayoutDashboard, PackageSearch, Settings, Shield, TrendingDown } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { cn } from '@/lib/utils';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/products', label: 'Tracked Products', icon: PackageSearch },
  { to: '/analytics', label: 'Price Analytics', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const { pathname } = useLocation();
  const role = useAuthStore((s) => s.user?.role);
  const nav = role === 'admin' ? [...links, { to: '/admin', label: 'Admin', icon: Shield }] : links;

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-white/[0.08] bg-[#07090e]/90 px-4 py-6 backdrop-blur-2xl lg:flex">
      {/* Specular rim */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-[1px] bg-gradient-to-b from-white/15 via-transparent to-white/10" />

      {/* Brand Header */}
      <div className="glass-card-iso p-3.5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-b from-[#18202f] to-[#0e121b] border border-white/10 text-[#00f5a0] shadow-specular">
            <TrendingDown className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display text-sm font-extrabold text-white">Price Drop</span>
              <span className="rounded bg-[#00f5a0]/15 border border-[#00f5a0]/30 px-1 py-0.2 font-mono text-[9px] font-bold text-[#00f5a0]">PRO</span>
            </div>
            <p className="font-mono text-[10px] text-slate-400">Retail Telemetry</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-7 flex flex-1 flex-col gap-1">
        {nav.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.to || pathname.startsWith(`${link.to}/`);
          return (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                'group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all duration-200',
                active
                  ? 'sidebar-link-active'
                  : 'text-slate-400 hover:bg-white/[0.04] hover:text-white hover:translate-x-0.5',
              )}
            >
              <Icon className={cn('h-4 w-4 transition-transform group-hover:scale-105', active ? 'text-[#00f5a0]' : 'text-slate-400')} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* System Status Footer */}
      <div className="mt-auto rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-center">
        <div className="flex items-center justify-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00f5a0] animate-pulse" />
          <span className="font-mono text-[10px] font-semibold text-slate-300">Scraper Engine Online</span>
        </div>
        <p className="mt-1 font-mono text-[9px] text-slate-500">Daily 00:00 UTC cycle</p>
      </div>
    </aside>
  );
}