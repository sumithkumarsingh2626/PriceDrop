import { useMemo } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { useTrackingStore } from '@/store/trackingStore';
import { Card } from '@/components/ui/card';
import TrackedProductCard from '@/components/dashboard/tracked-product-card';

export default function Products() {
  const { products, updateTracking, updateNotifications, refreshProduct, isLoading } = useProducts();
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
        <div className="flex gap-2 rounded-2xl border border-emerald-500/10 bg-emerald-950/30 p-1">
          {(['all', 'active', 'paused']).map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`rounded-2xl px-4 py-2 text-sm transition ${
                statusFilter === filter
                  ? 'bg-emerald-400 text-emerald-950'
                  : 'text-emerald-100/70'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <Card>Loading tracked products...</Card>
      ) : filteredProducts.length === 0 ? (
        <Card>No products match the selected filters.</Card>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {filteredProducts.map((product) => (
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
  );
}
