import { Bell, Menu, Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useNotificationsFeed } from '@/hooks/useProducts';
import { useTrackingStore } from '@/store/trackingStore';
import Button from '@/components/ui/button';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { notifications } = useNotificationsFeed(false);
  const { searchQuery, setSearchQuery, setAddProductOpen } = useTrackingStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="glass-nav sticky top-0 z-40 px-4 py-3 md:px-6">
      <div className="mx-auto flex max-w-7xl items-center gap-3">
        <button
          type="button"
          className="rounded-lg border border-white/10 p-2 text-slate-300 lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="relative hidden flex-1 md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tracked products…"
            className="w-full max-w-md rounded-xl border border-white/10 bg-slate-900/50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-brand-violet/50 focus:ring-2 focus:ring-brand-violet/20"
          />
        </div>

        <div className="ms-auto flex items-center gap-2">
          <Button variant="primary" size="sm" leftIcon={<Plus className="h-4 w-4" />} onClick={() => setAddProductOpen(true)}>
            Track
          </Button>
          <div className="hidden items-center gap-2 rounded-xl border border-white/10 bg-slate-900/50 px-3 py-2 text-sm sm:flex">
            <Bell className="h-4 w-4 text-brand-cyan" />
            <span>{notifications.length}</span>
          </div>
          <div className="hidden text-end md:block">
            <p className="text-xs text-slate-500">Signed in</p>
            <p className="text-sm font-semibold">{user?.fullName || user?.email}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => logout()}>
            Logout
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="mt-3 flex flex-col gap-2 border-t border-white/5 pt-3 lg:hidden">
          <Link to="/dashboard" className="rounded-lg px-3 py-2 text-sm hover:bg-white/5" onClick={() => setMobileOpen(false)}>
            Dashboard
          </Link>
          <Link to="/products" className="rounded-lg px-3 py-2 text-sm hover:bg-white/5" onClick={() => setMobileOpen(false)}>
            Products
          </Link>
          <Link to="/analytics" className="rounded-lg px-3 py-2 text-sm hover:bg-white/5" onClick={() => setMobileOpen(false)}>
            Analytics
          </Link>
        </nav>
      )}
    </header>
  );
}
