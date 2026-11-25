import { useMemo, useState } from 'react';
import { BarChart3, TrendingDown } from 'lucide-react';
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
        <p className="font-display text-base font-bold text-white">No products in watcher queue</p>
        <p className="mt-1 text-xs text-slate-400">Track an item to unlock statistical valuation telemetry.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <span className="glass-pill border-[#00f5a0]/30 text-[#00f5a0] font-mono text-[10px]">
          STATISTICAL TELEMETRY
        </span>
        <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
          Valuation <span className="text-gradient">Analytics</span>
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Historical pricing curves, distribution metrics, and store benchmark figures.
        </p>
      </div>

      {/* Control Bar: Product Selector + Time Range Chips */}
      <Card hoverGlow isometric className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between p-5">
        <div className="flex flex-col gap-1.5 flex-1 max-w-md">
          <label className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Active Target Product
          </label>
          <select
            value={effectiveProductId}
            onChange={(event) => setSelectedProductId(event.target.value)}
            className="rounded-xl border border-white/[0.08] bg-[#07090f] px-3.5 py-2 text-xs font-semibold text-white outline-none transition focus:border-[#00f5a0]/50"
          >
            {products.map((productItem) => (
              <option key={productItem._id} value={productItem._id} className="bg-[#0b0e17] text-white">
                {productItem.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-1 rounded-xl border border-white/[0.08] bg-white/[0.03] p-1 backdrop-blur-xl">
          {['7d', '1m', '3m', 'max'].map((value) => (
            <button
              key={value}
              onClick={() => setRange(value)}
              className={`rounded-lg px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                range === value
                  ? 'bg-[#00f5a0] text-[#05140d] font-bold'
                  : 'text-slate-400 hover:bg-white/[0.06] hover:text-white'
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </Card>

      {/* Main Chart + KPI Snapshot */}
      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Card hoverGlow isometric className="space-y-5 p-6">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Historical Valuation Curve
              </span>
              <h2 className="mt-1 text-lg font-bold text-white truncate max-w-lg">{product?.title}</h2>
              <p className="font-mono text-[11px] text-slate-500 mt-0.5">Timeframe: {range.toUpperCase()} · Currency: {product?.currency || 'USD'}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-[#00f5a0]">
              <BarChart3 className="h-4 w-4" />
            </div>
          </div>
          {isLoading || !product ? (
            <div className="flex h-64 items-center justify-center font-mono text-xs text-slate-400">Ingesting price history...</div>
          ) : (
            <PriceHistoryChart history={history} currency={product.currency} />
          )}
        </Card>

        <Card hoverGlow isometric className="space-y-3.5 p-6">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#00f5a0]">
            Statistical Metrics
          </span>
          {analytics && product ? (
            <div className="space-y-3 pt-1">
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
                <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-500">Historical Mean Price</p>
                <h3 className="mt-1 font-mono text-xl font-extrabold text-white">
                  {formatCurrency(analytics.averagePrice, product.currency)}
                </h3>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
                <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-500">Total Price Dips Recorded</p>
                <h3 className="mt-1 font-mono text-xl font-extrabold text-[#00f5a0]">
                  {analytics.totalPriceDrops} events
                </h3>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
                <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-500">Net Delta Since First Ingest</p>
                <h3 className="mt-1 font-mono text-xl font-extrabold text-[#38bdf8]">
                  {percentLabel(analytics.percentageDifference)}
                </h3>
              </div>
            </div>
          ) : (
            <div className="flex h-48 items-center justify-center font-mono text-xs text-slate-400">Calculating telemetry metrics...</div>
          )}
        </Card>
      </div>

      {/* Lowest Prices Leaderboard */}
      <Card hoverGlow isometric className="space-y-4 p-6">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#00f5a0]">
              Optimal Buy Points
            </span>
            <h2 className="mt-0.5 text-lg font-bold text-white">All-Time Lowest Recorded Prices</h2>
          </div>
          <TrendingDown className="h-4 w-4 text-[#00f5a0]" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 pt-1">
          {topDrops.map((item) => (
            <div
              key={item._id}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 transition-colors hover:border-[#00f5a0]/30"
            >
              <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#00f5a0] bg-[#00f5a0]/10 px-1.5 py-0.5 rounded border border-[#00f5a0]/20">
                {item.storeName}
              </span>
              <p className="line-clamp-2 text-xs font-semibold text-slate-200 mt-2">{item.title}</p>
              <p className="mt-3 font-mono text-[9px] uppercase tracking-wider text-slate-500">Record Low</p>
              <p className="mt-0.5 font-mono text-base font-extrabold text-white">
                {formatCurrency(item.lowestPrice, item.currency)}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}