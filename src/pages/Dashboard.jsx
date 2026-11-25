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
      {/* Header section with 3D ambient pill */}
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2">
          <span className="glass-pill border-brand-violet/40 bg-brand-violet/10 text-brand-purple">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan animate-ping" />
            Intelligence Engine Active
          </span>
        </div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
          Daily Price Tracking <span className="text-gradient">Overview</span>
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-slate-400">
          Monitor price trends across Amazon, Flipkart, BestBuy, and Zara with automated daily sweeps and smart target alerts.
        </p>
      </div>

      {/* 3D Isometric Stat Cards Grid */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Tracked products"
          value={String(totalTracked)}
          hint="All saved tracking entries"
          icon={ScanSearch}
          variant="violet"
        />
        <StatCard
          label="Active watches"
          value={String(activeTracked)}
          hint="Included in the daily sweep"
          icon={Bell}
          variant="cyan"
        />
        <StatCard
          label="Tracked savings"
          value={formatCurrency(totalSavings, featuredProduct?.currency ?? 'USD')}
          hint="Highest price vs. current price"
          icon={DollarSign}
          variant="emerald"
        />
        <StatCard
          label="Targets hit"
          value={String(targetReady)}
          hint="Products currently at/below target"
          icon={ArrowDown}
          variant="amber"
        />
      </div>

      {/* Main Analytics + Live Feed */}
      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Card hoverGlow isometric className="space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-cyan">
                Live Analysis
              </span>
              <h2 className="mt-1 text-xl font-bold text-white">
                {featuredProduct?.title ?? 'Select a tracked product'}
              </h2>
            </div>
            <div className="rounded-2xl border border-brand-cyan/25 bg-brand-cyan/10 p-3 text-brand-cyan shadow-inner">
              <LineChart className="h-5 w-5" />
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
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-purple">
              Live Watchlist
            </span>
            <h2 className="mt-1 text-xl font-bold text-white">Immediate product snapshots</h2>
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
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] shadow-inner">
              <PackageSearch className="h-8 w-8 text-brand-cyan" />
            </div>
            <p className="font-display text-lg font-bold text-white">
              {products.length === 0 ? 'No products tracked yet' : 'Nothing matches your search'}
            </p>
            <p className="max-w-xs text-sm text-slate-400">
              {products.length === 0
                ? 'Click "Track" in the top bar to paste a product URL and start monitoring.'
                : 'Try adjusting your search query.'}
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
