import { useMemo, useState } from 'react';
import { BarChart3, TrendingDown, Layers, LineChart } from 'lucide-react';
import { useProductDetails, useProducts } from '@/hooks/useProducts';
import { Card } from '@/components/ui/card';
import PriceHistoryChart from '@/components/analytics/price-history-chart';
import { formatCurrency, percentLabel } from '@/lib/utils';

export default function Analytics() {
  const { products } = useProducts();
  const [selectedProductId, setSelectedProductId] = useState(undefined);
  const [range, setRange] = useState('3m');

  const effectiveProductId = selectedProductId ?? products[0]?._id;
  const { product, history, analytics, isLoading } = useProductDetails(effectiveProductId, range);

  const topDrops = useMemo(
    () =>
      [...products]
        .sort((a, b) => a.lowestPrice - b.lowestPrice)
        .slice(0, 5),
    [products],
  );

  if (products.length === 0) {
    return (
      <Card hoverGlow isometric className="p-12 text-center">
        <p className="font-display text-lg font-bold text-white">No products tracked yet</p>
        <p className="mt-2 text-sm text-slate-400">Add a tracked product to unlock price curves and telemetry.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <span className="glass-pill border-brand-violet/30 text-brand-purple">
          Deep Telemetry
        </span>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
          Price <span className="text-gradient">Analytics</span> & Trends
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Historical pricing distributions, average valuations, and store comparisons.
        </p>
      </div>

      {/* Control Bar: Product Selector + Time Range Chips */}
      <Card hoverGlow isometric className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between p-6">
        <div className="flex flex-col gap-1.5 flex-1 max-w-md">
          <label className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-cyan">
            Active Target Product
          </label>
          <select
            value={effectiveProductId}
            onChange={(event) => setSelectedProductId(event.target.value)}
            className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white outline-none backdrop-blur-xl transition focus:border-brand-cyan/50 focus:ring-2 focus:ring-brand-cyan/20"
          >
            {products.map((productItem) => (
              <option key={productItem._id} value={productItem._id} className="bg-slate-900 text-white">
                {productItem.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-1.5 rounded-2xl border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur-2xl shadow-glass">
          {['7d', '1m', '3m', 'max'].map((value) => (
            <button
              key={value}
              onClick={() => setRange(value)}
              className={`rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                range === value
                  ? 'bg-gradient-to-r from-brand-violet to-brand-purple text-white shadow-glow'
                  : 'text-slate-400 hover:bg-white/[0.08] hover:text-white'
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </Card>

      {/* Main Chart + KPI Snapshot */}
      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Card hoverGlow isometric className="space-y-6 p-7">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-cyan">
                Historical Curve
              </span>
              <h2 className="mt-1 text-2xl font-bold text-white">{product?.title}</h2>
              <p className="text-xs text-slate-400 mt-0.5">Range: {range.toUpperCase()} · Currency: {product?.currency || 'USD'}</p>
            </div>
            <div className="rounded-2xl border border-brand-cyan/30 bg-brand-cyan/15 p-3.5 text-brand-cyan shadow-glow-cyan backdrop-blur-xl">
              <BarChart3 className="h-5 w-5" />
            </div>
          </div>
          {isLoading || !product ? (
            <div className="flex h-64 items-center justify-center text-sm text-slate-400">Loading price history...</div>
          ) : (
            <PriceHistoryChart history={history} currency={product.currency} />
          )}
        </Card>

        <Card hoverGlow isometric className="space-y-4 p-7">
          <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-purple">
            Key Telemetry
          </span>
          {analytics && product ? (
            <div className="space-y-3.5 pt-1">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Average Historical Price</p>
                <h3 className="mt-1 font-display text-2xl font-extrabold text-white">
                  {formatCurrency(analytics.averagePrice, product.currency)}
                </h3>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Price Drops Recorded</p>
                <h3 className="mt-1 font-display text-2xl font-extrabold text-brand-cyan">
                  {analytics.totalPriceDrops} drops
                </h3>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Delta Since First Sweep</p>
                <h3 className="mt-1 font-display text-2xl font-extrabold text-emerald-400">
                  {percentLabel(analytics.percentageDifference)}
                </h3>
              </div>
            </div>
          ) : (
            <div className="flex h-48 items-center justify-center text-sm text-slate-400">Computing telemetry...</div>
          )}
        </Card>
      </div>

      {/* Lowest Prices Leaderboard */}
      <Card hoverGlow isometric className="space-y-4 p-7">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-cyan">
              Optimal Buys
            </span>
            <h2 className="mt-1 text-xl font-bold text-white">Lowest Historical Records</h2>
          </div>
          <TrendingDown className="h-5 w-5 text-emerald-400" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 pt-2">
          {topDrops.map((item) => (
            <div
              key={item._id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md transition-all hover:border-brand-cyan/40 hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-cyan">{item.storeName}</span>
              <p className="line-clamp-2 text-xs font-semibold text-slate-200 mt-1">{item.title}</p>
              <p className="mt-3 text-[10px] uppercase tracking-wider text-slate-500">Record Low</p>
              <p className="mt-0.5 font-display text-lg font-bold text-white">
                {formatCurrency(item.lowestPrice, item.currency)}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}