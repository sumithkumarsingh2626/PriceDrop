import { useMemo } from 'react';
import { PackageSearch } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { useTrackingStore } from '@/store/trackingStore';
import { ProductCardSkeleton } from '@/components/ui/skeleton';
import TrackedProductCard from '@/components/dashboard/tracked-product-card';

const FILTERS = ['all', 'active', 'paused'];

export default function Products() {
  const {
    products,
    updateTracking,
    updateNotifications,
    refreshProduct,
    deleteProduct,
    isLoading,
  } = useProducts();
  const { searchQuery, statusFilter, setStatusFilter } = useTrackingStore();

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.storeName.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;
      if (statusFilter === 'active') return product.trackingStatus === 'active';
      if (statusFilter === 'paused') return product.trackingStatus === 'paused';
      return true;
    });
  }, [products, searchQuery, statusFilter]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="glass-pill border-[#00f5a0]/30 text-[#00f5a0] font-mono text-[10px]">
            ACTIVE INVENTORY ({filteredProducts.length})
          </span>
          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            Tracked <span className="text-gradient">Products</span>
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Real-time telemetry and target configurations for all monitored retail goods.
          </p>
        </div>

        {/* Precision Filter Segment Control */}
        <div
          role="group"
          aria-label="Filter products by status"
          className="flex gap-1 rounded-xl border border-white/[0.08] bg-white/[0.03] p-1 backdrop-blur-xl"
        >
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              aria-pressed={statusFilter === filter}
              className={`rounded-lg px-3.5 py-1.5 font-mono text-xs font-semibold capitalize transition-all duration-200
                focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00f5a0]
                ${
                  statusFilter === filter
                    ? 'bg-[#00f5a0] text-[#05140d] font-bold shadow-[0_1px_0_rgba(255,255,255,0.4)_inset]'
                    : 'text-slate-400 hover:bg-white/[0.06] hover:text-white'
                }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Loading state: skeleton grid */}
      {isLoading ? (
        <div className="grid gap-5 lg:grid-cols-2" aria-busy="true" aria-label="Loading products">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        /* Glassmorphic Empty state */
        <div className="glass-card-iso flex flex-col items-center justify-center gap-4 py-20 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-slate-400">
            <PackageSearch className="h-7 w-7 text-[#00f5a0]" />
          </div>
          <div>
            <p className="font-display text-base font-bold text-white">
              {products.length === 0 ? 'No products in tracker inventory' : 'No products match your active filter'}
            </p>
            <p className="mt-1 max-w-sm text-xs text-slate-400">
              {products.length === 0
                ? 'Click "Track Product" above to paste a URL from Amazon, Flipkart, BestBuy, or Zara.'
                : 'Try toggling between All, Active, or Paused filters.'}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {filteredProducts.map((product) => (
            <TrackedProductCard
              key={product._id}
              product={product}
              onRefresh={refreshProduct}
              onDelete={deleteProduct}
              onToggleTracking={(currentProduct) =>
                updateTracking({
                  id: currentProduct._id,
                  trackingStatus: currentProduct.trackingStatus === 'active' ? 'paused' : 'active',
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
  );
}