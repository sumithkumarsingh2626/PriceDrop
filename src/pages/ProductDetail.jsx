import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Bell, RefreshCw, ToggleLeft, ToggleRight } from 'lucide-react';
import { useProductDetails, useProducts } from '@/hooks/useProducts';
import { Card } from '@/components/ui/card';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import PriceHistoryChart from '@/components/analytics/price-history-chart';
import { formatCurrency, formatDate, percentLabel } from '@/lib/utils';

export default function ProductDetail() {
  const { id } = useParams();
  const [range, setRange] = useState('1m');
  const { product, history, analytics, isLoading } = useProductDetails(id, range);
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
    return <Card>Loading product details…</Card>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="flex gap-5">
          <div className="h-28 w-28 overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60">
            {product.productImage ? (
              <img src={product.productImage} alt={product.title} className="h-full w-full object-cover" />
            ) : null}
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-500">{product.storeName}</p>
            <h1 className="mt-2 max-w-3xl font-display text-3xl font-bold">{product.title}</h1>
            <p className="mt-2 text-sm text-slate-400">
              Tracking since {formatDate(product.createdAt)} · {product.availability.replace('_', ' ')}
            </p>
            <div className="mt-3 flex items-end gap-4">
              <span className="text-3xl font-bold text-brand-cyan">
                {formatCurrency(product.currentPrice, product.currency)}
              </span>
              {product.lastPriceChange !== undefined ? (
                <span className="text-sm text-slate-400">{percentLabel(product.lastPriceChange)}</span>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" leftIcon={<RefreshCw className="h-4 w-4" />} onClick={() => void refreshProduct(product._id)}>
            Refresh
          </Button>
          <Button
            variant="outline"
            leftIcon={<Bell className="h-4 w-4" />}
            onClick={() =>
              void updateNotifications({ id: product._id, notificationEnabled: !product.notificationEnabled })
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
            {product.trackingStatus === 'active' ? 'Pause' : 'Resume'}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card hoverGlow isometric className="p-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">Current Price</span>
          <h3 className="mt-2 font-display text-2xl font-extrabold text-white">{formatCurrency(analytics.currentPrice, product.currency)}</h3>
        </Card>
        <Card hoverGlow isometric className="p-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-cyan">Lowest Recorded</span>
          <h3 className="mt-2 font-display text-2xl font-extrabold text-brand-cyan">{formatCurrency(analytics.lowestPrice, product.currency)}</h3>
        </Card>
        <Card hoverGlow isometric className="p-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">Highest Recorded</span>
          <h3 className="mt-2 font-display text-2xl font-extrabold text-slate-300">{formatCurrency(analytics.highestPrice, product.currency)}</h3>
        </Card>
        <Card hoverGlow isometric className="p-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-emerald-400">Net Delta</span>
          <h3 className="mt-2 font-display text-2xl font-extrabold text-emerald-400">{percentLabel(analytics.percentageDifference)}</h3>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Card hoverGlow isometric className="space-y-5 p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-cyan">Price Trajectory</span>
              <h2 className="mt-0.5 text-xl font-bold text-white">Interactive History</h2>
            </div>
            <div className="flex gap-1 rounded-2xl border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur-2xl shadow-glass">
              {['7d', '1m', '3m', 'max'].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRange(value)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    range === value
                      ? 'bg-gradient-to-r from-brand-violet to-brand-purple text-white shadow-glow'
                      : 'text-slate-400 hover:bg-white/[0.08] hover:text-white'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
          <PriceHistoryChart history={history} currency={product.currency} />
        </Card>

        <Card hoverGlow isometric className="space-y-5 p-7">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-purple">Alert Thresholds</span>
            <h2 className="mt-0.5 text-xl font-bold text-white">Target & Channels</h2>
          </div>

          <div className="space-y-3">
            <Input
              id="detail-target-price"
              label="Target Price Alert ($)"
              type="number"
              min="0"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              placeholder={product.targetPrice ? String(product.targetPrice) : 'Set target price'}
            />
            <Button
              className="w-full"
              onClick={() =>
                void updateTracking({
                  id: product._id,
                  targetPrice: targetPrice ? Number(targetPrice) : null,
                })
              }
            >
              Update Target
            </Button>
          </div>

          <div className="space-y-2 pt-2 border-t border-white/[0.06]">
            {[
              ['whatsapp', 'WhatsApp Notification'],
              ['sms', 'SMS Text Alert'],
              ['push', 'Browser Push Notification'],
              ['anyPriceDrop', 'Alert on Any Price Drop'],
              ['targetPriceAlert', 'Alert when Target Hit'],
            ].map(([key, label]) => (
              <label
                key={key}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-xs text-slate-300 backdrop-blur-md cursor-pointer hover:border-white/20 transition-colors"
              >
                <span className="font-medium">{label}</span>
                <input
                  type="checkbox"
                  checked={product.notificationSettings[key]}
                  onChange={(e) =>
                    void updateNotifications({
                      id: product._id,
                      notificationSettings: { [key]: e.target.checked },
                    })
                  }
                  className="h-4 w-4 rounded accent-brand-cyan"
                />
              </label>
            ))}
          </div>
        </Card>
      </div>

      {latestDrop ? (
        <p className="text-sm text-slate-500">Latest drop: {formatDate(latestDrop.scrapedAt)}</p>
      ) : null}
    </div>
  );
}
