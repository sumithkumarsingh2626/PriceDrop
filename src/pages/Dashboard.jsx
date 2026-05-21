import { useMemo } from 'react';
import {
  ArrowDown,
  Bell,
  DollarSign,
  LineChart,
  ScanSearch,
} from 'lucide-react';
import { useNotificationsFeed, useProductDetails, useProducts } from '@/hooks/useProducts';
import { useTrackingStore } from '@/store/trackingStore';
import { formatCurrency } from '@/lib/utils';
import StatCard from '@/components/dashboard/stat-card';
import NotificationFeed from '@/components/dashboard/notification-feed';
import TrackedProductCard from '@/components/dashboard/tracked-product-card';
import PriceHistoryChart from '@/components/analytics/price-history-chart';
import { Card } from '@/components/ui/card';

export default function Dashboard() {
  const { products, refreshProduct, updateTracking, updateNotifications, isLoading } = useProducts();
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
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.24em] text-emerald-200/60">Dashboard</p>
        <h1 className="text-4xl font-semibold">Daily price tracking overview</h1>
        <p className="max-w-3xl text-sm leading-7 text-emerald-100/65">
          Every tracked product stores a live history record on creation and updates automatically during the daily scrape cycle.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Tracked products" value={String(totalTracked)} hint="All saved tracking entries" icon={ScanSearch} />
        <StatCard label="Active watches" value={String(activeTracked)} hint="Included in the daily sweep" icon={Bell} />
        <StatCard label="Tracked savings" value={formatCurrency(totalSavings, featuredProduct?.currency ?? 'USD')} hint="Highest price compared to current price" icon={DollarSign} />
        <StatCard label="Targets hit" value={String(targetReady)} hint="Products currently at or below target" icon={ArrowDown} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Card className="space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-emerald-200/60">Live graph</p>
              <h2 className="mt-2 text-2xl font-semibold">
                {featuredProduct?.title ?? 'Select a tracked product'}
              </h2>
            </div>
            <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/10 p-3 text-emerald-300">
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

      <div className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-emerald-200/60">Tracked products</p>
          <h2 className="mt-2 text-2xl font-semibold">Immediate product snapshots</h2>
        </div>

        {isLoading ? (
          <Card>Loading tracked products...</Card>
        ) : filteredProducts.length === 0 ? (
          <Card>No products match your current search.</Card>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            {filteredProducts.slice(0, 4).map((product) => (
              <TrackedProductCard
                key={product._id}
                product={product}
                onRefresh={refreshProduct}
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
