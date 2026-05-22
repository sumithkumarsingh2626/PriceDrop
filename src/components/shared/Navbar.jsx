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
          <div className="relative hidden sm:block" ref={dropdownRef}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/50 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              <Bell className="h-4 w-4 text-brand-cyan" />
              <span>{notifications.length}</span>
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 md:w-96 rounded-2xl border border-white/10 bg-slate-950/95 backdrop-blur-md shadow-2xl z-50 overflow-hidden">
                <div className="p-4 border-b border-white/5 flex justify-between items-center">
                  <h3 className="font-semibold text-sm">Notifications</h3>
                  {notifications.length > 0 && (
                    <span className="text-xs bg-brand-cyan/20 text-brand-cyan px-2 py-0.5 rounded-full">
                      {notifications.length} New
                    </span>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto p-2 space-y-1">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-sm text-slate-500">
                      No notifications yet.
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div key={n._id} className="p-3 rounded-xl hover:bg-white/5 transition-colors">
                        <div className="flex items-center justify-between mb-1">
                           <span className="text-[10px] uppercase tracking-[0.2em] text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/20 px-2 py-0.5 rounded-full">
                             {n.channel}
                           </span>
                           <span className="text-xs text-slate-500">
                             {new Date(n.createdAt).toLocaleDateString()}
                           </span>
                        </div>
                        <p className="text-sm text-slate-200 mt-2">{n.messageBody}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
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
          <button 
            className="flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-white/5 w-full text-left" 
            onClick={() => setNotificationsOpen(!notificationsOpen)}
          >
            <span>Notifications</span>
            {notifications.length > 0 && (
              <span className="bg-brand-cyan/20 text-brand-cyan px-2 py-0.5 rounded-full text-xs">{notifications.length}</span>
            )}
          </button>
          
          {notificationsOpen && (
             <div className="px-3 py-2 space-y-2 max-h-60 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="text-xs text-slate-500">No notifications</p>
                ) : (
                  notifications.map(n => (
                    <div key={n._id} className="text-xs bg-white/5 border border-white/5 p-3 rounded-xl">
                       <div className="flex justify-between items-center mb-2">
                         <span className="text-[10px] text-brand-cyan uppercase tracking-[0.2em]">{n.channel}</span>
                         <span className="text-slate-500">{new Date(n.createdAt).toLocaleDateString()}</span>
                       </div>
                       <p className="text-slate-300">{n.messageBody}</p>
                    </div>
                  ))
                )}
             </div>
          )}
        </nav>
      )}
    </header>
  );
}
