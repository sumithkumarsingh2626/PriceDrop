import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  ExternalLink,
  PauseCircle,
  PlayCircle,
  RefreshCw,
  Trash2,
} from 'lucide-react';
import Button from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { formatCurrency, formatRelativeDate, percentLabel } from '@/lib/utils';
import type { Product } from '@/types';

interface TrackedProductCardProps {
  product: Product;
  onRefresh: (id: string) => Promise<unknown>;
  onToggleTracking: (product: Product) => Promise<unknown>;
  onToggleNotifications: (product: Product) => Promise<unknown>;
  onDelete?: (id: string) => Promise<unknown>;
}

export default function TrackedProductCard({
  product,
  onRefresh,
  onToggleTracking,
  onToggleNotifications,
  onDelete,
}: TrackedProductCardProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = async () => {
    if (!onDelete) return;
    await onDelete(product._id);
  };

  return (
    <Card hoverGlow isometric className="group relative flex h-full flex-col justify-between gap-5 p-6 transition-all duration-300">
      {/* Subtle glassmorphic orb */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-brand-cyan/5 blur-2xl transition-all duration-300 group-hover:bg-brand-violet/10" />

      <div className="flex gap-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 shadow-inner">
          {product.productImage ? (
            <img
              src={product.productImage}
              alt={product.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">
              No image
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-cyan">
                {product.storeName}
              </span>
              <h3 className="mt-1 line-clamp-2 text-base font-bold text-white transition-colors group-hover:text-slate-100">
                {product.title}
              </h3>
            </div>
            <span
              className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] backdrop-blur-md ${
                product.trackingStatus === 'active'
                  ? 'border-emerald-500/30 bg-emerald-500/15 text-emerald-400'
                  : 'border-amber-500/30 bg-amber-500/15 text-amber-400'
              }`}
            >
              {product.trackingStatus}
            </span>
          </div>

          <div className="mt-3 flex items-baseline gap-2.5">
            <span className="font-display text-2xl font-extrabold text-white">
              {formatCurrency(product.currentPrice, product.currency)}
            </span>
            {product.lastPriceChange !== undefined && product.lastPriceChange !== 0 ? (
              <span
                className={`text-xs font-semibold ${
                  product.lastPriceChange < 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {percentLabel(product.lastPriceChange)}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      {/* Target & Lowest Price Tiles */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-md">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Target</p>
          <p className="mt-1 text-base font-bold text-white">
            {product.targetPrice ? formatCurrency(product.targetPrice, product.currency) : 'Not set'}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-md">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Lowest</p>
          <p className="mt-1 text-base font-bold text-brand-cyan">
            {formatCurrency(product.lowestPrice, product.currency)}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-slate-950/40 px-3.5 py-2.5 text-xs text-slate-400">
        <span className="text-slate-500">Last scrape:</span>{' '}
        <span className="text-slate-300">
          {product.lastScrapedAt ? formatRelativeDate(product.lastScrapedAt) : 'Waiting for first sweep'}
        </span>
      </div>

      {/* Confirm-delete banner */}
      {confirmDelete && (
        <div
          className="rounded-2xl border border-rose-500/30 bg-rose-950/60 p-4 text-sm text-rose-200 backdrop-blur-xl"
          role="alert"
        >
          <p className="mb-3 font-semibold">Remove product and price history?</p>
          <div className="flex gap-2">
            <Button
              variant="danger"
              size="sm"
              className="flex-1"
              onClick={() => void handleDelete()}
            >
              Yes, delete
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="flex-1"
              onClick={() => setConfirmDelete(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
        <Link to={`/products/${product._id}`} className="flex-1 min-w-[130px]">
          <Button variant="outline" size="sm" className="w-full" leftIcon={<ExternalLink className="h-3.5 w-3.5" />}>
            Details
          </Button>
        </Link>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => void onRefresh(product._id)}
          leftIcon={<RefreshCw className="h-3.5 w-3.5" />}
        >
          Refresh
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => void onToggleNotifications(product)}
          leftIcon={<Bell className="h-3.5 w-3.5" />}
        >
          {product.notificationEnabled ? 'Mute' : 'Alert'}
        </Button>
        <Button
          variant={product.trackingStatus === 'active' ? 'secondary' : 'primary'}
          size="sm"
          onClick={() => void onToggleTracking(product)}
          leftIcon={
            product.trackingStatus === 'active' ? (
              <PauseCircle className="h-3.5 w-3.5" />
            ) : (
              <PlayCircle className="h-3.5 w-3.5" />
            )
          }
        >
          {product.trackingStatus === 'active' ? 'Pause' : 'Resume'}
        </Button>
        {onDelete && !confirmDelete && (
          <Button
            variant="ghost"
            size="sm"
            aria-label="Delete product"
            onClick={() => setConfirmDelete(true)}
            leftIcon={<Trash2 className="h-3.5 w-3.5 text-rose-400" />}
            className="text-rose-400 hover:bg-rose-950/40"
          >
            Delete
          </Button>
        )}
      </div>
    </Card>
  );
}
