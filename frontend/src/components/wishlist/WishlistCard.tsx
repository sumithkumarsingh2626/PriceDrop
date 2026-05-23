import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { Share2, Lock, Globe, Trash2 } from 'lucide-react';

interface WishlistCardProps {
  id: string;
  title: string;
  slug: string;
  isPublic: boolean;
  productCount: number;
  previewImages: string[];
  onShare: () => void;
  onDelete: () => void;
  onClick: () => void;
}

export function WishlistCard({
  title,
  isPublic,
  productCount,
  previewImages,
  onShare,
  onDelete,
  onClick,
}: WishlistCardProps) {
  return (
    <Card className="group relative overflow-hidden transition-all hover:border-emerald-500/30 hover:bg-emerald-950/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]">
      <div 
        className="absolute inset-0 cursor-pointer z-0" 
        onClick={onClick} 
        aria-label={`View ${title} wishlist`}
      />
      <div className="relative z-10 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold">{title}</h3>
            {isPublic ? (
              <span title="Public"><Globe className="h-4 w-4 text-emerald-400" /></span>
            ) : (
              <span title="Private"><Lock className="h-4 w-4 text-emerald-100/40" /></span>
            )}
          </div>
          <p className="mt-1 text-sm text-emerald-100/60">
            {productCount} {productCount === 1 ? 'item' : 'items'}
          </p>
        </div>
        <div className="flex gap-2">
          {isPublic && (
            <button
              onClick={(e) => { e.stopPropagation(); onShare(); }}
              className="rounded-full bg-emerald-500/10 p-2 text-emerald-300 transition hover:bg-emerald-500/20"
              title="Share Wishlist"
            >
              <Share2 className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            className="rounded-full bg-red-500/10 p-2 text-red-400 transition hover:bg-red-500/20"
            title="Delete Wishlist"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-6 flex h-16 gap-2 opacity-80 transition-opacity group-hover:opacity-100 pointer-events-none">
        {previewImages.slice(0, 4).map((img, idx) => (
          <div key={idx} className="h-full w-16 overflow-hidden rounded-lg bg-emerald-950/50 p-1 border border-emerald-500/10">
            <img src={img} alt="Product preview" className="h-full w-full object-contain" />
          </div>
        ))}
        {productCount > 4 && (
          <div className="flex h-full w-16 items-center justify-center rounded-lg bg-emerald-950/50 border border-emerald-500/10 text-xs font-medium text-emerald-100/60">
            +{productCount - 4}
          </div>
        )}
        {productCount === 0 && (
          <div className="flex h-full w-full items-center justify-center rounded-lg border border-dashed border-emerald-500/20 text-xs text-emerald-100/40">
            Empty Wishlist
          </div>
        )}
      </div>
    </Card>
  );
}
