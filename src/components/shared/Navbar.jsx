import { Bell, Menu, Plus, Search } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
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
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

        {/* Search Bar */}
        <div className="relative hidden flex-1 md:block">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tracked products by title or retail store…"
            className="w-full max-w-md rounded-xl border border-white/[0.1] bg-[#0B1428]/80 py-2 pl-9 pr-4 text-xs text-white placeholder:text-slate-500 outline-none transition-all focus:border-[#00D4FF] focus:bg-[#111E38] focus:ring-1 focus:ring-[#00D4FF]/30"
          />
        </div>

        <div className="ms-auto flex items-center gap-3">
          <Button variant="primary" size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />} onClick={() => setAddProductOpen(true)}>
            Track Product
          </Button>

          {/* Notifications Dropdown */}
          <div className="relative hidden sm:block" ref={dropdownRef}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="flex items-center gap-2 rounded-xl border border-white/[0.1] bg-[#0B1428]/80 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:border-[#00D4FF]/40 hover:text-white transition-colors"
            >
              <Bell className="h-3.5 w-3.5 text-[#00D4FF]" />
              <span className="font-mono text-[11px] font-bold">{notifications.length}</span>
            </button>

            {notificationsOpen && (
              <div className="glass-card-iso absolute right-0 top-full mt-2 w-80 md:w-96 p-0 z-50 overflow-hidden shadow-2xl">
                <div className="p-3.5 border-b border-white/[0.08] flex justify-between items-center bg-[#111E38]/50">
                  <h3 className="font-bold text-xs text-white uppercase tracking-wider font-mono">Dispatched Alerts</h3>
                  {notifications.length > 0 && (
                    <span className="text-[10px] bg-[#00D4FF]/20 text-[#00D4FF] px-2 py-0.5 rounded font-mono font-bold">
                      {notifications.length} New
                    </span>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto p-2 space-y-1">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-400 font-mono">
                      No notifications recorded yet.
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div key={n._id} className="p-3 rounded-lg hover:bg-white/[0.04] transition-colors border border-transparent hover:border-white/[0.05]">
                        <div className="flex items-center justify-between mb-1">
                           <span className="text-[9px] uppercase tracking-wider text-[#00D4FF] bg-[#00D4FF]/10 border border-[#00D4FF]/30 px-1.5 py-0.5 rounded font-mono font-bold">
                             {n.channel}
                           </span>
                           <span className="text-[10px] text-slate-500 font-mono">
                             {new Date(n.createdAt).toLocaleDateString()}
                           </span>
                        </div>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">{n.messageBody}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="hidden text-end md:block pl-2 border-l border-white/[0.08]">
            <p className="font-mono text-[9px] uppercase tracking-wider text-slate-500">Authenticated</p>
            <p className="text-xs font-bold text-white truncate max-w-[130px]">{user?.fullName || user?.email || user?.phoneNumber}</p>
          </div>

          <Button variant="ghost" size="sm" onClick={() => logout()}>
            Logout
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="mt-3 flex flex-col gap-1 border-t border-white/[0.08] pt-3 lg:hidden text-xs">
          <Link to="/dashboard" className="rounded-lg px-3 py-2 hover:bg-white/5" onClick={() => setMobileOpen(false)}>
            Dashboard
          </Link>
          <Link to="/products" className="rounded-lg px-3 py-2 hover:bg-white/5" onClick={() => setMobileOpen(false)}>
            Products
          </Link>
          <Link to="/analytics" className="rounded-lg px-3 py-2 hover:bg-white/5" onClick={() => setMobileOpen(false)}>
            Analytics
          </Link>
          <Link to="/settings" className="rounded-lg px-3 py-2 hover:bg-white/5" onClick={() => setMobileOpen(false)}>
            Settings
          </Link>
        </nav>
      )}
    </header>
  );
}