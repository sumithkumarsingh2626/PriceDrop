import { useState } from 'react';
import { WishlistCard } from './WishlistCard';
import { ShareModal } from './ShareModal';

export interface WishlistData {
  _id: string;
  title: string;
  slug: string;
  isPublic: boolean;
  products: any[];
}

interface WishlistGridProps {
  wishlists: WishlistData[];
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

export function WishlistGrid({ wishlists, onDelete, onView }: WishlistGridProps) {
  const [shareData, setShareData] = useState<{ isOpen: boolean; url: string; title: string }>({
    isOpen: false,
    url: '',
    title: '',
  });

  const handleShare = (wishlist: WishlistData) => {
    const url = `${window.location.origin}/wishlist/${wishlist.slug}`;
    setShareData({ isOpen: true, url, title: wishlist.title });
  };

  if (wishlists.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-emerald-500/10 bg-emerald-950/20 py-16 text-center">
        <p className="text-emerald-100/60">You haven't created any wishlists yet.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {wishlists.map((wishlist) => (
          <WishlistCard
            key={wishlist._id}
            id={wishlist._id}
            title={wishlist.title}
            slug={wishlist.slug}
            isPublic={wishlist.isPublic}
            productCount={wishlist.products.length}
            previewImages={wishlist.products.map((p) => p.productImage).filter(Boolean)}
            onShare={() => handleShare(wishlist)}
            onDelete={() => onDelete(wishlist._id)}
            onClick={() => onView(wishlist._id)}
          />
        ))}
      </div>
      
      <ShareModal
        isOpen={shareData.isOpen}
        onClose={() => setShareData((prev) => ({ ...prev, isOpen: false }))}
        url={shareData.url}
        title={shareData.title}
      />
    </>
  );
}
