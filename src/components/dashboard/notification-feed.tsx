import { Link } from 'react-router-dom';
import type { NotificationItem } from '@/types';
import { Card } from '@/components/ui/card';
import { formatRelativeDate } from '@/lib/utils';
import { Bell, ArrowUpRight } from 'lucide-react';

export default function NotificationFeed({
  notifications,
}: {
  notifications: NotificationItem[];
}) {
  return (
    <Card hoverGlow isometric className="flex h-full flex-col justify-between p-7">
      <div>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-purple">
              Live Feed
            </span>
            <h3 className="mt-1 text-xl font-bold text-white">Delivery Activity</h3>
          </div>
          <div className="rounded-2xl border border-brand-purple/30 bg-brand-purple/15 p-3 text-brand-purple shadow-glow">
            <Bell className="h-5 w-5" />
          </div>
        </div>

        <div className="space-y-3">
          {notifications.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center text-xs text-slate-400 backdrop-blur-md">
              <p className="font-semibold text-slate-300">No dispatch events yet.</p>
              <p className="mt-1 text-slate-500">Your next SMS/WhatsApp alert will appear here after a price drop or target hit.</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification._id}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md transition-all hover:border-brand-cyan/40 hover:bg-white/[0.05]"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full border border-brand-cyan/30 bg-brand-cyan/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-cyan">
                    {notification.channel}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500">
                    {formatRelativeDate(notification.createdAt)}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">{notification.messageBody}</p>
                {notification.productId?._id ? (
                  <Link
                    to={`/products/${notification.productId._id}`}
                    className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-brand-cyan hover:underline"
                  >
                    Open product <ArrowUpRight className="h-3 w-3" />
                  </Link>
                ) : null}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mt-6 border-t border-white/[0.06] pt-3 text-[11px] text-slate-500 flex items-center justify-between">
        <span>Channel: SMS / WhatsApp</span>
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
      </div>
    </Card>
  );
}