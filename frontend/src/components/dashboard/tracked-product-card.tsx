'use client';

import Link from 'next/link';
import {
  Bell,
  ExternalLink,
  PauseCircle,
  PlayCircle,
  RefreshCw,
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
}

export default function TrackedProductCard({
  product,
  onRefresh,
  onToggleTracking,
  onToggleNotifications,
}: TrackedProductCardProps) {
  return (
    <Card hoverGlow className="flex h-full flex-col gap-5">
      <div className="flex gap-4">
        <div className="h-20 w-20 overflow-hidden rounded-3xl border border-emerald-500/15 bg-emerald-950/40">
          {product.productImage ? (
            <img
              src={product.productImage}
              alt={product.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-emerald-100/35">
              No image
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-emerald-200/60">
                {product.storeName}
              </p>
              <h3 className="mt-2 line-clamp-2 text-lg font-semibold text-emerald-50">
                {product.title}
              </h3>
            </div>
            <span className="rounded-full border border-emerald-400/15 bg-emerald-400/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-emerald-200">
              {product.trackingStatus}
            </span>
          </div>
          <div className="mt-4 flex items-end gap-3">
            <span className="text-2xl font-bold text-emerald-50">
              {formatCurrency(product.currentPrice, product.currency)}
            </span>
            {product.lastPriceChange !== undefined ? (
              <span className="text-sm text-emerald-200/70">
                {percentLabel(product.lastPriceChange)}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-emerald-500/10 bg-emerald-950/30 p-4">
          <p className="text-xs uppercase tracking-[0.22em] text-emerald-100/50">Target</p>
          <p className="mt-2 text-lg font-semibold text-emerald-50">
            {product.targetPrice ? formatCurrency(product.targetPrice, product.currency) : 'Not set'}
          </p>
        </div>
        <div className="rounded-2xl border border-emerald-500/10 bg-emerald-950/30 p-4">
          <p className="text-xs uppercase tracking-[0.22em] text-emerald-100/50">Lowest</p>
          <p className="mt-2 text-lg font-semibold text-emerald-300">
            {formatCurrency(product.lowestPrice, product.currency)}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-emerald-500/10 bg-emerald-950/20 p-4 text-sm text-emerald-100/65">
        Last scrape: {product.lastScrapedAt ? formatRelativeDate(product.lastScrapedAt) : 'Waiting for first refresh'}
      </div>

      <div className="mt-auto flex flex-wrap gap-2">
        <Link href={`/products/${product._id}`} className="flex-1 min-w-[140px]">
          <Button variant="outline" className="w-full" leftIcon={<ExternalLink className="h-4 w-4" />}>
            View details
          </Button>
        </Link>
        <Button
          variant="secondary"
          onClick={() => void onRefresh(product._id)}
          leftIcon={<RefreshCw className="h-4 w-4" />}
        >
          Refresh
        </Button>
        <Button
          variant="ghost"
          onClick={() => void onToggleNotifications(product)}
          leftIcon={<Bell className="h-4 w-4" />}
        >
          {product.notificationEnabled ? 'Mute' : 'Enable'}
        </Button>
        <Button
          variant={product.trackingStatus === 'active' ? 'danger' : 'primary'}
          onClick={() => void onToggleTracking(product)}
          leftIcon={
            product.trackingStatus === 'active' ? (
              <PauseCircle className="h-4 w-4" />
            ) : (
              <PlayCircle className="h-4 w-4" />
            )
          }
        >
          {product.trackingStatus === 'active' ? 'Pause' : 'Resume'}
        </Button>
      </div>
    </Card>
  );
}
