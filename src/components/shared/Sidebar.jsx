import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Cloud, LayoutDashboard, PackageSearch, Settings, Shield } from 'lucide-react';
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
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-white/[0.08] bg-[#050B18]/90 px-4 py-6 backdrop-blur-2xl lg:flex">
      {/* Brand Header */}
      <div className="glass-card-iso p-3.5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#00D4FF] p-0.5 shadow-glow-cyan text-white">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#0B1428]">
              <Cloud className="h-5 w-5 text-[#00D4FF]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display text-sm font-extrabold text-white">Price Drop</span>
              <span className="rounded bg-[#00D4FF]/15 border border-[#00D4FF]/30 px-1 py-0.2 font-mono text-[9px] font-bold text-[#00D4FF]">AI</span>
            </div>
            <p className="font-mono text-[10px] text-slate-400">Cloud Telemetry</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-7 flex flex-1 flex-col gap-1.5">
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
              <Icon className={cn('h-4 w-4 transition-transform group-hover:scale-105', active ? 'text-[#00D4FF]' : 'text-slate-400')} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* System Status Footer */}
      <div className="mt-auto rounded-xl border border-white/[0.08] bg-[#0B1428]/60 p-3 text-center">
        <div className="flex items-center justify-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
          <span className="font-mono text-[10px] font-semibold text-slate-300">Cloud Scraper Online</span>
        </div>
        <p className="mt-1 font-mono text-[9px] text-[#94A3B8]">Continuous daily sweeps</p>
      </div>
    </aside>
  );
}