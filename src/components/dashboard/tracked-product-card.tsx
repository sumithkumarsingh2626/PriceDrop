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
      <div className="flex gap-4">
        {/* Product Image Frame */}
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#07090f] shadow-inner">
          {product.productImage ? (
            <img
              src={product.productImage}
              alt={product.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-mono text-[10px] text-slate-500">
              NO IMAGE
            </div>
          )}
        </div>

        {/* Product Details Header */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-white/[0.04] px-2 py-0.5 rounded border border-white/5">
                {product.storeName}
              </span>
              <h3 className="mt-1.5 line-clamp-2 text-sm font-bold text-white transition-colors group-hover:text-slate-100">
                {product.title}
              </h3>
            </div>
            <span
              className={`shrink-0 rounded-md border px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider ${
                product.trackingStatus === 'active'
                  ? 'border-[#00f5a0]/30 bg-[#00f5a0]/10 text-[#00f5a0]'
                  : 'border-[#f59e0b]/30 bg-[#f59e0b]/10 text-[#f59e0b]'
              }`}
            >
              {product.trackingStatus}
            </span>
          </div>

          <div className="mt-2.5 flex items-baseline gap-2.5">
            <span className="font-mono text-xl font-extrabold text-white">
              {formatCurrency(product.currentPrice, product.currency)}
            </span>
            {product.lastPriceChange !== undefined && product.lastPriceChange !== 0 ? (
              <span
                className={`font-mono text-xs font-bold ${
                  product.lastPriceChange < 0 ? 'text-[#00f5a0]' : 'text-rose-400'
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
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
          <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400">Target Valuation</p>
          <p className="mt-1 font-mono text-sm font-bold text-white">
            {product.targetPrice ? formatCurrency(product.targetPrice, product.currency) : 'Not configured'}
          </p>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
          <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400">Lowest Recorded</p>
          <p className="mt-1 font-mono text-sm font-bold text-[#00f5a0]">
            {formatCurrency(product.lowestPrice, product.currency)}
          </p>
        </div>
      </div>

      {/* Telemetry Footer */}
      <div className="rounded-lg border border-white/[0.04] bg-[#07090f]/80 px-3 py-2 text-[11px] font-mono text-slate-400 flex items-center justify-between">
        <span className="text-slate-500">Last Scraped:</span>
        <span className="text-slate-300">
          {product.lastScrapedAt ? formatRelativeDate(product.lastScrapedAt) : 'Pending first sweep'}
        </span>
      </div>

      {/* Confirm-delete banner */}
      {confirmDelete && (
        <div
          className="rounded-xl border border-rose-500/30 bg-rose-950/70 p-4 text-xs text-rose-200 backdrop-blur-xl"
          role="alert"
        >
          <p className="mb-3 font-semibold">Delete product and associated price history?</p>
          <div className="flex gap-2">
            <Button
              variant="danger"
              size="sm"
              className="flex-1"
              onClick={() => void handleDelete()}
            >
              Confirm Delete
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
      <div className="mt-auto flex flex-wrap items-center gap-2 pt-1 border-t border-white/[0.06]">
        <Link to={`/products/${product._id}`} className="flex-1 min-w-[110px]">
          <Button variant="outline" size="sm" className="w-full text-xs" leftIcon={<ExternalLink className="h-3 w-3" />}>
            Telemetry
          </Button>
        </Link>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => void onRefresh(product._id)}
          leftIcon={<RefreshCw className="h-3 w-3" />}
        >
          Scrape
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => void onToggleNotifications(product)}
          leftIcon={<Bell className="h-3 w-3" />}
        >
          {product.notificationEnabled ? 'Mute' : 'Alert'}
        </Button>
        <Button
          variant={product.trackingStatus === 'active' ? 'secondary' : 'primary'}
          size="sm"
          onClick={() => void onToggleTracking(product)}
          leftIcon={
            product.trackingStatus === 'active' ? (
              <PauseCircle className="h-3 w-3" />
            ) : (
              <PlayCircle className="h-3 w-3" />
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
            leftIcon={<Trash2 className="h-3 w-3 text-rose-400" />}
            className="text-rose-400 hover:bg-rose-950/40"
          >
            Delete
          </Button>
        )}
      </div>
    </Card>
  );
}