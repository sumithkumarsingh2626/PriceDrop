import { useMemo } from 'react';
import {
  ArrowDown,
  Bell,
  DollarSign,
  LineChart,
  PackageSearch,
  ScanSearch,
} from 'lucide-react';
import { useNotificationsFeed, useProductDetails, useProducts } from '@/hooks/useProducts';
import { useTrackingStore } from '@/store/trackingStore';
import { formatCurrency } from '@/lib/utils';
import StatCard from '@/components/dashboard/stat-card';
import NotificationFeed from '@/components/dashboard/notification-feed';
import TrackedProductCard from '@/components/dashboard/tracked-product-card';
import PriceHistoryChart from '@/components/analytics/price-history-chart';
import { ProductCardSkeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

export default function Dashboard() {
  const { products, refreshProduct, updateTracking, updateNotifications, deleteProduct, isLoading } = useProducts();
  const { notifications } = useNotificationsFeed();
  const { searchQuery } = useTrackingStore();
  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [products, searchQuery],
  );
  const featuredProductId = useMemo(
    () => filteredProducts[0]?._id,
    [filteredProducts],
  );
  const { product: featuredProduct, history } = useProductDetails(featuredProductId, '1m', {
    loadProduct: false,
    loadAnalytics: false,
  });

  const totalTracked = products.length;
  const activeTracked = products.filter((product) => product.trackingStatus === 'active').length;
  const totalSavings = products.reduce(
    (sum, product) => sum + Math.max(product.highestPrice - product.currentPrice, 0),
    0,
  );
  const targetReady = products.filter(
    (product) =>
      product.targetPrice !== null &&
      product.targetPrice !== undefined &&
      product.currentPrice <= product.targetPrice,
  ).length;

  return (
    <div className="space-y-8">
      {/* Header section with telemetry badge */}
      <div className="flex flex-col gap-1.5">
        <div className="inline-flex items-center gap-2">
          <span className="glass-pill border-[#00f5a0]/30 bg-[#00f5a0]/5 text-[#00f5a0] font-mono text-[10px]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00f5a0] animate-pulse" />
            TELEMETRY NODE ACTIVE
          </span>
        </div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
          Retail Intelligence <span className="text-gradient">Console</span>
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-slate-400">
          Continuous price monitoring across Amazon, Flipkart, BestBuy, and Zara with automated daily sweeps.
        </p>
      </div>

      {/* 3D Realistic Stat Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Tracked Products"
          value={String(totalTracked)}
          hint="Active inventory in watcher queue"
          icon={ScanSearch}
          variant="mint"
        />
        <StatCard
          label="Active Watches"
          value={String(activeTracked)}
          hint="Queued for next 00:00 UTC sweep"
          icon={Bell}
          variant="cyan"
        />
        <StatCard
          label="Net Value Saved"
          value={formatCurrency(totalSavings, featuredProduct?.currency ?? 'USD')}
          hint="Peak price vs. current scraped rate"
          icon={DollarSign}
          variant="amber"
        />
        <StatCard
          label="Targets Hit"
          value={String(targetReady)}
          hint="Items at or below target trigger"
          icon={ArrowDown}
          variant="blue"
        />
      </div>

      {/* Main Analytics + Live Feed */}
      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Card hoverGlow isometric className="space-y-5 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Active Trajectory
              </span>
              <h2 className="mt-1 text-lg font-bold text-white truncate max-w-lg">
                {featuredProduct?.title ?? 'Select a product to view pricing curve'}
              </h2>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-[#00f5a0] shadow-inner">
              <LineChart className="h-4 w-4" />
            </div>
          </div>
          <PriceHistoryChart
            history={history}
            currency={featuredProduct?.currency ?? 'USD'}
          />
        </Card>
        <NotificationFeed notifications={notifications} />
      </div>

      {/* Tracked Products Snapshot */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#00f5a0]">
              Inventory Feed
            </span>
            <h2 className="mt-0.5 text-xl font-bold text-white">Monitored Watchlist</h2>
          </div>
        </div>

        {isLoading ? (
          <div className="grid gap-5 lg:grid-cols-2" aria-busy="true" aria-label="Loading products">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="glass-card flex flex-col items-center justify-center gap-4 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-slate-400">
              <PackageSearch className="h-7 w-7 text-[#00f5a0]" />
            </div>
            <p className="font-display text-base font-bold text-white">
              {products.length === 0 ? 'No products in tracker queue' : 'No items match your search'}
            </p>
            <p className="max-w-xs text-xs text-slate-400">
              {products.length === 0
                ? 'Click "Track Product" above to paste a URL from Amazon, Flipkart, BestBuy, or Zara.'
                : 'Try adjusting your search keywords.'}
            </p>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            {filteredProducts.slice(0, 4).map((product) => (
              <TrackedProductCard
                key={product._id}
                product={product}
                onRefresh={refreshProduct}
                onDelete={deleteProduct}
                onToggleTracking={(currentProduct) =>
                  updateTracking({
                    id: currentProduct._id,
                    trackingStatus:
                      currentProduct.trackingStatus === 'active' ? 'paused' : 'active',
                  })
                }
                onToggleNotifications={(currentProduct) =>
                  updateNotifications({
                    id: currentProduct._id,
                    notificationEnabled: !currentProduct.notificationEnabled,
                  })
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}