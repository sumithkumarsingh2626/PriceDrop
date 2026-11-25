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
    <Card hoverGlow isometric className="flex h-full flex-col justify-between p-6">
      <div>
        <div className="mb-4 flex items-center justify-between border-b border-white/[0.06] pb-3">
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#00f5a0]">
              Dispatched Queue
            </span>
            <h3 className="mt-0.5 text-lg font-bold text-white">Alert Activity</h3>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2 text-slate-300">
            <Bell className="h-4 w-4" />
          </div>
        </div>

        <div className="space-y-2.5">
          {notifications.length === 0 ? (
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 text-center text-xs text-slate-400">
              <p className="font-medium text-slate-300">No dispatch events recorded.</p>
              <p className="mt-1 text-slate-500">Alerts will trigger automatically when an item hits target price.</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification._id}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 transition-colors hover:border-white/[0.12] hover:bg-white/[0.04]"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded font-mono text-[9px] font-bold uppercase tracking-wider text-[#00f5a0] bg-[#00f5a0]/10 border border-[#00f5a0]/30 px-1.5 py-0.5">
                    {notification.channel}
                  </span>
                  <span className="font-mono text-[10px] text-slate-500">
                    {formatRelativeDate(notification.createdAt)}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">{notification.messageBody}</p>
                {notification.productId?._id ? (
                  <Link
                    to={`/products/${notification.productId._id}`}
                    className="mt-2 inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-[#00f5a0] hover:underline"
                  >
                    View Telemetry <ArrowUpRight className="h-3 w-3" />
                  </Link>
                ) : null}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mt-6 border-t border-white/[0.06] pt-3 font-mono text-[10px] text-slate-500 flex items-center justify-between">
        <span>SMS · WhatsApp Engine</span>
        <span className="flex items-center gap-1.5 text-[#00f5a0]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00f5a0]" /> Ready
        </span>
      </div>
    </Card>
  );
}