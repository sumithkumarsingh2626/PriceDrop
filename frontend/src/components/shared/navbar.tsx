'use client';

import { Bell, Plus, Search } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNotificationsFeed } from '@/hooks/useProducts';
import { useTrackingStore } from '@/store/trackingStore';
import Button from '@/components/ui/button';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { notifications } = useNotificationsFeed();
  const { searchQuery, setSearchQuery, setAddProductOpen } = useTrackingStore();

  return (
    <header className="sticky top-0 z-40 border-b border-emerald-500/10 bg-[#03100d]/80 px-6 py-4 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4">
        <div className="relative hidden flex-1 md:block">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-100/35" />
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search tracked products"
            className="w-full rounded-2xl border border-emerald-500/10 bg-emerald-950/30 py-3 pl-11 pr-4 text-sm text-emerald-50 outline-none transition focus:border-emerald-300/30"
          />
        </div>

        <Button
          variant="primary"
          leftIcon={<Plus className="h-4 w-4" />}
          onClick={() => setAddProductOpen(true)}
        >
          Add product
        </Button>

        <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/10 bg-emerald-950/30 px-4 py-3 text-sm text-emerald-50">
          <Bell className="h-4 w-4 text-emerald-300" />
          <span>{notifications.length}</span>
        </div>

        <div className="hidden rounded-2xl border border-emerald-500/10 bg-emerald-950/30 px-4 py-3 md:block">
          <p className="text-xs uppercase tracking-[0.22em] text-emerald-100/45">Signed in as</p>
          <p className="mt-1 text-sm font-semibold text-emerald-50">{user?.fullName || user?.email}</p>
        </div>

        <Button variant="ghost" onClick={() => void logout()}>
          Logout
        </Button>
      </div>
    </header>
  );
}
