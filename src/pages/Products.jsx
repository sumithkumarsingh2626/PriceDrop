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
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-emerald-200/60">Tracked products</p>
          <h1 className="mt-2 text-4xl font-semibold">Manage your saved watches</h1>
        </div>

        {/* Filter tabs */}
        <div
          role="group"
          aria-label="Filter products by status"
          className="flex gap-2 rounded-2xl border border-emerald-500/10 bg-emerald-950/30 p-1"
        >
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              aria-pressed={statusFilter === filter}
              className={`rounded-2xl px-4 py-2 text-sm capitalize transition
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950
                ${statusFilter === filter
                  ? 'bg-emerald-400 text-emerald-950 font-semibold'
                  : 'text-emerald-100/70 hover:text-emerald-100 hover:bg-emerald-500/10'
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
        /* Empty state */
        <div className="flex flex-col items-center justify-center gap-5 rounded-3xl border border-emerald-500/10 bg-emerald-950/20 py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-950/40">
            <PackageSearch className="h-8 w-8 text-emerald-400/60" />
          </div>
          <div>
            <p className="text-xl font-semibold text-emerald-50">
              {products.length === 0 ? 'No products tracked yet' : 'No products match your filters'}
            </p>
            <p className="mt-2 max-w-xs text-sm text-emerald-200/50">
              {products.length === 0
                ? 'Use the search bar above to add a product URL and start tracking its price.'
                : 'Try changing the status filter or clearing your search query.'}
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
