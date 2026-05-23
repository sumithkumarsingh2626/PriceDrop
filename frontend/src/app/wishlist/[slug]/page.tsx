'use client';

import { useParams } from 'next/navigation';
import { usePublicWishlist } from '@/hooks/useWishlists';
import { WishlistProductCard } from '@/components/wishlist/WishlistProductCard';
import { formatCurrency } from '@/lib/utils';
import { Lock } from 'lucide-react';

export default function PublicWishlistPage() {
  const params = useParams<{ slug: string }>();
  const { wishlist, isLoading, error } = usePublicWishlist(params.slug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050a08] text-emerald-50">
        <div className="flex h-16 items-center border-b border-emerald-500/10 px-6">
          <span className="text-xl font-bold tracking-tighter text-emerald-50">PriceDrop</span>
        </div>
        <div className="flex h-[60vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500/30 border-t-emerald-400"></div>
        </div>
      </div>
    );
  }

  if (error || !wishlist) {
    return (
      <div className="min-h-screen bg-[#050a08] text-emerald-50">
        <div className="flex h-16 items-center border-b border-emerald-500/10 px-6">
          <span className="text-xl font-bold tracking-tighter text-emerald-50">PriceDrop</span>
        </div>
        <div className="mx-auto mt-20 max-w-2xl text-center px-4">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
            <Lock className="h-10 w-10 text-red-400" />
          </div>
          <h1 className="mt-6 text-3xl font-bold">Wishlist Unavailable</h1>
          <p className="mt-4 text-emerald-100/60">
            This wishlist either doesn't exist, has been deleted, or is marked as private by the owner.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050a08] text-emerald-50 selection:bg-emerald-500/30">
      <div className="flex h-16 items-center border-b border-emerald-500/10 px-6">
        <span className="text-xl font-bold tracking-tighter text-emerald-50">PriceDrop</span>
      </div>
      
      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 border-b border-emerald-500/10 pb-8 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">{wishlist.title}</h1>
          <p className="mt-4 text-emerald-100/60">
            Curated collection of {wishlist.products.length} {wishlist.products.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        {wishlist.products.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-emerald-500/20 bg-emerald-950/10 py-24 text-center">
            <p className="text-lg text-emerald-100/60">This wishlist is currently empty.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlist.products.map((product) => (
              <WishlistProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
