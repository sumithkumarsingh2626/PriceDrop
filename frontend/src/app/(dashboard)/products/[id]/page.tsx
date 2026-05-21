'use client';

import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { Bell, RefreshCw, ToggleLeft, ToggleRight } from 'lucide-react';
import { useProductDetails, useProducts } from '@/hooks/useProducts';
import { Card } from '@/components/ui/card';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import PriceHistoryChart from '@/components/analytics/price-history-chart';
import { formatCurrency, formatDate, percentLabel } from '@/lib/utils';

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const [range, setRange] = useState<'7d' | '1m' | '3m' | 'max'>('1m');
  const { product, history, analytics, isLoading } = useProductDetails(params.id, range);
  const { refreshProduct, updateNotifications, updateTracking } = useProducts();
  const [targetPrice, setTargetPrice] = useState('');

  const latestDrop = useMemo(
    () =>
      history
        .slice()
        .reverse()
        .find((item) => item.percentageChange < 0),
    [history],
  );

  if (isLoading || !product || !analytics) {
    return <Card>Loading product details...</Card>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="flex gap-5">
          <div className="h-28 w-28 overflow-hidden rounded-[28px] border border-emerald-500/15 bg-emerald-950/40">
            {product.productImage ? (
              <img
                src={product.productImage}
                alt={product.title}
                className="h-full w-full object-cover"
              />
            ) : null}
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-emerald-200/60">
              {product.storeName}
            </p>
            <h1 className="mt-2 max-w-3xl text-4xl font-semibold">{product.title}</h1>
            <p className="mt-3 text-sm text-emerald-100/65">
              Tracking started {formatDate(product.createdAt)}. Availability: {product.availability.replace('_', ' ')}.
            </p>
            <div className="mt-4 flex items-end gap-4">
              <span className="text-3xl font-bold text-emerald-50">
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

        <div className="flex flex-wrap gap-3">
          <Button
            variant="secondary"
            leftIcon={<RefreshCw className="h-4 w-4" />}
            onClick={() => void refreshProduct(product._id)}
          >
            Refresh now
          </Button>
          <Button
            variant="outline"
            leftIcon={<Bell className="h-4 w-4" />}
            onClick={() =>
              void updateNotifications({
                id: product._id,
                notificationEnabled: !product.notificationEnabled,
              })
            }
          >
            {product.notificationEnabled ? 'Disable alerts' : 'Enable alerts'}
          </Button>
          <Button
            variant={product.trackingStatus === 'active' ? 'danger' : 'primary'}
            leftIcon={
              product.trackingStatus === 'active' ? (
                <ToggleRight className="h-4 w-4" />
              ) : (
                <ToggleLeft className="h-4 w-4" />
              )
            }
            onClick={() =>
              void updateTracking({
                id: product._id,
                trackingStatus: product.trackingStatus === 'active' ? 'paused' : 'active',
              })
            }
          >
            {product.trackingStatus === 'active' ? 'Pause tracking' : 'Resume tracking'}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <p className="text-xs uppercase tracking-[0.22em] text-emerald-200/60">Current price</p>
          <h3 className="mt-3 text-3xl font-semibold">{formatCurrency(analytics.currentPrice, product.currency)}</h3>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-[0.22em] text-emerald-200/60">Lowest price</p>
          <h3 className="mt-3 text-3xl font-semibold text-emerald-300">{formatCurrency(analytics.lowestPrice, product.currency)}</h3>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-[0.22em] text-emerald-200/60">Highest price</p>
          <h3 className="mt-3 text-3xl font-semibold">{formatCurrency(analytics.highestPrice, product.currency)}</h3>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-[0.22em] text-emerald-200/60">Change since first scrape</p>
          <h3 className="mt-3 text-3xl font-semibold">{percentLabel(analytics.percentageDifference)}</h3>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Card className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-emerald-200/60">Live price history</p>
              <h2 className="mt-2 text-2xl font-semibold">Graph auto-updates after every scrape</h2>
            </div>
            <div className="flex gap-2 rounded-2xl border border-emerald-500/10 bg-emerald-950/30 p-1">
              {(['7d', '1m', '3m', 'max'] as const).map((value) => (
                <button
                  key={value}
                  onClick={() => setRange(value)}
                  className={`rounded-2xl px-3 py-2 text-sm transition ${
                    range === value ? 'bg-emerald-400 text-emerald-950' : 'text-emerald-100/70'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
          <PriceHistoryChart history={history} currency={product.currency} />
        </Card>

        <Card className="space-y-5">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-emerald-200/60">Product settings</p>
            <h2 className="mt-2 text-2xl font-semibold">Targets and alert toggles</h2>
          </div>

          <Input
            id="detail-target-price"
            label="Target price"
            type="number"
            min="0"
            value={targetPrice}
            onChange={(event) => setTargetPrice(event.target.value)}
            placeholder={
              product.targetPrice ? String(product.targetPrice) : 'Set a target price'
            }
          />
          <Button
            onClick={() =>
              void updateTracking({
                id: product._id,
                targetPrice: targetPrice ? Number(targetPrice) : null,
              })
            }
          >
            Save target price
          </Button>

          <div className="space-y-3">
            {(
              [
                ['email', 'Email'],
                ['whatsapp', 'WhatsApp'],
                ['sms', 'SMS'],
                ['push', 'Push'],
                ['anyPriceDrop', 'Any price drop'],
                ['targetPriceAlert', 'Target price reached'],
              ] as const
            ).map(([key, label]) => (
              <label
                key={key}
                className="flex items-center justify-between rounded-2xl border border-emerald-500/10 bg-emerald-950/20 px-4 py-3 text-sm"
              >
                <span>{label}</span>
                <input
                  type="checkbox"
                  checked={product.notificationSettings[key]}
                  onChange={(event) =>
                    void updateNotifications({
                      id: product._id,
                      notificationSettings: {
                        [key]: event.target.checked,
                      },
                    })
                  }
                  className="h-4 w-4 rounded accent-emerald-400"
                />
              </label>
            ))}
          </div>
        </Card>
      </div>

      <Card className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-emerald-200/60">Price history</p>
          <h2 className="mt-2 text-2xl font-semibold">Stored scrape records</h2>
        </div>
        <div className="overflow-hidden rounded-3xl border border-emerald-500/10">
          <table className="min-w-full divide-y divide-emerald-500/10 text-left text-sm">
            <thead className="bg-emerald-950/40 text-emerald-100/60">
              <tr>
                <th className="px-4 py-3 font-medium">Scraped at</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-500/10 bg-emerald-950/20">
              {history.map((point) => (
                <tr key={point._id ?? point.scrapedAt}>
                  <td className="px-4 py-3 text-emerald-100/70">{formatDate(point.scrapedAt)}</td>
                  <td className="px-4 py-3 text-emerald-50">
                    {formatCurrency(point.price, point.currency)}
                  </td>
                  <td className="px-4 py-3 text-emerald-300">
                    {percentLabel(point.percentageChange)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {latestDrop ? (
          <p className="text-sm text-emerald-100/60">
            Latest drop recorded at {formatDate(latestDrop.scrapedAt)}.
          </p>
        ) : null}
      </Card>
    </div>
  );
}
