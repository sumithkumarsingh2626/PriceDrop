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
          <span className="glass-pill border-brand-violet/30 text-brand-purple">
            Portfolio Watches
          </span>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            Tracked <span className="text-gradient">Products</span>
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Real-time status and price monitoring for all saved e-commerce products.
          </p>
        </div>

        {/* 3D Glassmorphic Filter Tabs */}
        <div
          role="group"
          aria-label="Filter products by status"
          className="flex gap-1.5 rounded-2xl border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur-2xl shadow-glass"
        >
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              aria-pressed={statusFilter === filter}
              className={`rounded-xl px-4 py-2 text-xs font-bold capitalize transition-all duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan
                ${
                  statusFilter === filter
                    ? 'bg-gradient-to-r from-brand-violet to-brand-purple text-white shadow-glow'
                    : 'text-slate-400 hover:bg-white/[0.08] hover:text-white'
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
        <div className="glass-card-iso flex flex-col items-center justify-center gap-5 py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.05] shadow-inner">
            <PackageSearch className="h-8 w-8 text-brand-cyan" />
          </div>
          <div>
            <p className="font-display text-xl font-bold text-white">
              {products.length === 0 ? 'No products tracked yet' : 'No products match your filters'}
            </p>
            <p className="mt-2 max-w-sm text-sm text-slate-400">
              {products.length === 0
                ? 'Click "Track" in the top bar to paste a product URL from Amazon, Flipkart, BestBuy, or Zara.'
                : 'Try toggling the status filter or clearing your search keywords.'}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
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
