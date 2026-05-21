import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {
  BarChart3,
  LayoutDashboard,
  PackageSearch,
  Settings,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const links = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/products', label: 'Tracked products', icon: PackageSearch },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = useLocation().pathname;

  return (
    <aside className="hidden w-72 shrink-0 border-r border-emerald-500/10 bg-[#03100d]/85 px-5 py-6 lg:flex lg:flex-col">
      <div className="rounded-3xl border border-emerald-500/15 bg-emerald-500/10 p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-emerald-300 p-2 text-emerald-950">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-emerald-200/60">Price Drop</p>
            <h1 className="mt-1 text-lg font-semibold text-emerald-50">Daily tracker</h1>
          </div>
        </div>
        <p className="mt-4 text-sm leading-6 text-emerald-100/65">
          Live product history, auto refresh jobs, and alert delivery from one dashboard.
        </p>
      </div>

      <nav className="mt-8 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition',
                isActive
                  ? 'bg-emerald-400/12 text-emerald-50'
                  : 'text-emerald-100/65 hover:bg-emerald-900/25 hover:text-emerald-50',
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-3xl border border-emerald-500/10 bg-emerald-950/30 p-4 text-sm text-emerald-100/60">
        Daily tracking runs every 24 hours through BullMQ + cron, and you can always trigger a manual refresh from any product card.
      </div>
    </aside>
  );
}
