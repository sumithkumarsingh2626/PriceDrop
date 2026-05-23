import { LowestPriceBadge } from './LowestPriceBadge';
import { formatCurrency } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';

interface PlatformCardProps {
  platform: string;
  productTitle: string;
  productUrl: string;
  currentPrice: number;
  originalPrice: number;
  image: string;
  inStock: boolean;
  isLowest: boolean;
  currency?: string;
}

export function PlatformCard({
  platform,
  productTitle,
  productUrl,
  currentPrice,
  originalPrice,
  image,
  inStock,
  isLowest,
  currency = 'USD'
}: PlatformCardProps) {
  return (
    <div className={`relative flex items-center gap-4 rounded-2xl border bg-emerald-950/20 p-4 transition hover:bg-emerald-950/30 ${isLowest ? 'border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.15)]' : 'border-emerald-500/10'}`}>
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white/5 p-2">
        <img src={image} alt={platform} className="h-full w-full object-contain" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-100/80">{platform}</p>
          {isLowest && <LowestPriceBadge>Cheapest</LowestPriceBadge>}
        </div>
        <p className="truncate text-sm text-emerald-100/60 mt-1" title={productTitle}>{productTitle}</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold text-emerald-50">{formatCurrency(currentPrice, currency)}</span>
          {originalPrice > currentPrice && (
            <span className="text-sm text-emerald-100/40 line-through">{formatCurrency(originalPrice, currency)}</span>
          )}
        </div>
      </div>
      <div className="flex flex-col items-end gap-2 shrink-0">
        <span className={`text-xs font-medium ${inStock ? 'text-emerald-400' : 'text-red-400'}`}>
          {inStock ? 'In Stock' : 'Out of Stock'}
        </span>
        <a
          href={productUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-lg bg-emerald-500/10 px-3 py-1.5 text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/20"
        >
          View Deal
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
