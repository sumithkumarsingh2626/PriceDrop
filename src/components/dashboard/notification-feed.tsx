import { Link } from 'react-router-dom';
import type { NotificationItem } from '@/types';
import { Card } from '@/components/ui/card';
import { formatRelativeDate } from '@/lib/utils';

export default function NotificationFeed({
  notifications,
}: {
  notifications: NotificationItem[];
}) {
  return (
    <Card className="h-full">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-emerald-200/60">Recent notifications</p>
          <h3 className="mt-2 text-lg font-semibold">Delivery activity</h3>
        </div>
      </div>
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="rounded-2xl border border-emerald-500/10 bg-emerald-950/30 p-4 text-sm text-emerald-100/60">
            Your next alert will appear here after the first price drop or target hit.
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification._id}
              className="rounded-2xl border border-emerald-500/10 bg-emerald-950/30 p-4"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-emerald-200">
                  {notification.channel}
                </span>
                <span className="text-xs text-emerald-100/45">
                  {formatRelativeDate(notification.createdAt)}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-emerald-50/90">{notification.messageBody}</p>
              {notification.productId?._id ? (
                <Link
                  href={`/products/${notification.productId._id}`}
                  className="mt-3 inline-block text-sm text-emerald-300 hover:text-emerald-200"
                >
                  Open product
                </Link>
              ) : null}
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
