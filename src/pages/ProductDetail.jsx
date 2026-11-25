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
    return (
      <Card className="p-8 text-center font-mono text-xs text-slate-400">
        Loading product telemetry…
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="flex gap-4">
          <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[#07090f] p-1 shadow-inner">
            {product.productImage ? (
              <img src={product.productImage} alt={product.title} className="h-full w-full object-cover rounded-xl" />
            ) : (
              <div className="flex h-full w-full items-center justify-center font-mono text-[10px] text-slate-500">
                NO IMG
              </div>
            )}
          </div>
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-white/[0.04] px-2 py-0.5 rounded border border-white/5">
              {product.storeName}
            </span>
            <h1 className="mt-1.5 max-w-2xl font-display text-2xl font-bold text-white">{product.title}</h1>
            <p className="mt-1 font-mono text-xs text-slate-400">
              Ingested {formatDate(product.createdAt)} · Status: {product.availability.replace('_', ' ')}
            </p>
            <div className="mt-2.5 flex items-baseline gap-3">
              <span className="font-mono text-2xl font-extrabold text-[#00f5a0]">
                {formatCurrency(product.currentPrice, product.currency)}
              </span>
              {product.lastPriceChange !== undefined && product.lastPriceChange !== 0 ? (
                <span className={`font-mono text-xs font-bold ${product.lastPriceChange < 0 ? 'text-[#00f5a0]' : 'text-rose-400'}`}>
                  {percentLabel(product.lastPriceChange)}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" size="sm" leftIcon={<RefreshCw className="h-3.5 w-3.5" />} onClick={() => void refreshProduct(product._id)}>
            Scrape Now
          </Button>
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<Bell className="h-3.5 w-3.5" />}
            onClick={() =>
              void updateNotifications({ id: product._id, notificationEnabled: !product.notificationEnabled })
            }
          >
            {product.notificationEnabled ? 'Mute Alerts' : 'Enable Alerts'}
          </Button>
          <Button
            variant={product.trackingStatus === 'active' ? 'danger' : 'primary'}
            size="sm"
            leftIcon={
              product.trackingStatus === 'active' ? (
                <ToggleRight className="h-3.5 w-3.5" />
              ) : (
                <ToggleLeft className="h-3.5 w-3.5" />
              )
            }
            onClick={() =>
              void updateTracking({
                id: product._id,
                trackingStatus: product.trackingStatus === 'active' ? 'paused' : 'active',
              })
            }
          >
            {product.trackingStatus === 'active' ? 'Pause Watch' : 'Resume Watch'}
          </Button>
        </div>
      </div>

      {/* KPI Blocks */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Card hoverGlow isometric className="p-4">
          <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-500">Current Valuation</p>
          <h3 className="mt-1 font-mono text-xl font-extrabold text-white">{formatCurrency(analytics.currentPrice, product.currency)}</h3>
        </Card>
        <Card hoverGlow isometric className="p-4">
          <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#00f5a0]">All-Time Low</p>
          <h3 className="mt-1 font-mono text-xl font-extrabold text-[#00f5a0]">{formatCurrency(analytics.lowestPrice, product.currency)}</h3>
        </Card>
        <Card hoverGlow isometric className="p-4">
          <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-500">All-Time Peak</p>
          <h3 className="mt-1 font-mono text-xl font-extrabold text-slate-300">{formatCurrency(analytics.highestPrice, product.currency)}</h3>
        </Card>
        <Card hoverGlow isometric className="p-4">
          <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#38bdf8]">Net Ingest Delta</p>
          <h3 className="mt-1 font-mono text-xl font-extrabold text-[#38bdf8]">{percentLabel(analytics.percentageDifference)}</h3>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Card hoverGlow isometric className="space-y-4 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#00f5a0]">Historical Curve</span>
              <h2 className="text-base font-bold text-white">Price History</h2>
            </div>
            <div className="flex gap-1 rounded-xl border border-white/[0.08] bg-white/[0.03] p-1">
              {['7d', '1m', '3m', 'max'].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRange(value)}
                  className={`rounded-lg px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 ${
                    range === value
                      ? 'bg-[#00f5a0] text-[#05140d] font-bold'
                      : 'text-slate-400 hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
          <PriceHistoryChart history={history} currency={product.currency} />
        </Card>

        <Card hoverGlow isometric className="space-y-4 p-6">
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#00f5a0]">Threshold Configuration</span>
            <h2 className="text-base font-bold text-white">Target Valuation</h2>
          </div>

          <div className="space-y-3">
            <Input
              id="detail-target-price"
              label="Target Alert Valuation ($)"
              type="number"
              min="0"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              placeholder={product.targetPrice ? String(product.targetPrice) : 'Enter target price'}
            />
            <Button
              size="sm"
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
              ['sms', 'SMS Text Notification'],
              ['push', 'Browser Push Notification'],
              ['anyPriceDrop', 'Alert on Any Price Drop'],
              ['targetPriceAlert', 'Alert when Target Reached'],
            ].map(([key, label]) => (
              <label
                key={key}
                className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5 text-xs text-slate-300 cursor-pointer hover:border-white/[0.12] transition-colors"
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
                  className="h-4 w-4 rounded accent-[#00f5a0]"
                />
              </label>
            ))}
          </div>
        </Card>
      </div>

      {latestDrop ? (
        <p className="font-mono text-xs text-slate-500">Most recent recorded price dip: {formatDate(latestDrop.scrapedAt)}</p>
      ) : null}
    </div>
  );
}