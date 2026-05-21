import { useMemo, useState } from 'react';
import { BarChart3 } from 'lucide-react';
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
    return <Card>Add a tracked product to unlock analytics.</Card>;
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-emerald-200/60">Analytics</p>
        <h1 className="mt-2 text-4xl font-semibold">Live graph and price intelligence</h1>
      </div>

      <Card className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-[0.22em] text-emerald-200/60">
            Select product
          </label>
          <select
            value={effectiveProductId}
            onChange={(event) => setSelectedProductId(event.target.value)}
            className="rounded-2xl border border-emerald-500/10 bg-emerald-950/30 px-4 py-3 text-sm text-emerald-50 outline-none"
          >
            {products.map((productItem) => (
              <option key={productItem._id} value={productItem._id}>
                {productItem.title}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 rounded-2xl border border-emerald-500/10 bg-emerald-950/30 p-1">
          {(['7d', '1m', '3m', 'max']).map((value) => (
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
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Card className="space-y-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-emerald-200/60">Price chart</p>
              <h2 className="mt-2 text-2xl font-semibold">{product?.title}</h2>
            </div>
            <div className="rounded-2xl border border-emerald-500/10 bg-emerald-950/30 p-3 text-emerald-300">
              <BarChart3 className="h-5 w-5" />
            </div>
          </div>
          {isLoading || !product ? (
            <div>Loading chart...</div>
          ) : (
            <PriceHistoryChart history={history} currency={product.currency} />
          )}
        </Card>

        <Card className="space-y-4">
          <p className="text-xs uppercase tracking-[0.22em] text-emerald-200/60">Analytics snapshot</p>
          {analytics && product ? (
            <>
              <div className="rounded-2xl border border-emerald-500/10 bg-emerald-950/20 p-4">
                <p className="text-sm text-emerald-100/60">Average price</p>
                <h3 className="mt-2 text-3xl font-semibold">
                  {formatCurrency(analytics.averagePrice, product.currency)}
                </h3>
              </div>
              <div className="rounded-2xl border border-emerald-500/10 bg-emerald-950/20 p-4">
                <p className="text-sm text-emerald-100/60">Total recorded drops</p>
                <h3 className="mt-2 text-3xl font-semibold">{analytics.totalPriceDrops}</h3>
              </div>
              <div className="rounded-2xl border border-emerald-500/10 bg-emerald-950/20 p-4">
                <p className="text-sm text-emerald-100/60">Difference since first scrape</p>
                <h3 className="mt-2 text-3xl font-semibold">
                  {percentLabel(analytics.percentageDifference)}
                </h3>
              </div>
            </>
          ) : (
            <div>Loading analytics...</div>
          )}
        </Card>
      </div>

      <Card className="space-y-4">
        <p className="text-xs uppercase tracking-[0.22em] text-emerald-200/60">Lowest prices across your list</p>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {topDrops.map((item) => (
            <div
              key={item._id}
              className="rounded-2xl border border-emerald-500/10 bg-emerald-950/20 p-4"
            >
              <p className="line-clamp-2 text-sm font-medium text-emerald-50">{item.title}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.2em] text-emerald-100/45">Lowest recorded</p>
              <p className="mt-2 text-xl font-semibold text-emerald-300">
                {formatCurrency(item.lowestPrice, item.currency)}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
