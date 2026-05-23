import { ReasonBadge } from './ReasonBadge';
import { ComparisonStats } from './ComparisonStats';
import { formatCurrency } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/types';

interface RecommendationCardProps {
  recommendation: {
    _id: string;
    reason: string;
    score: number;
    product: Product;
  };
  baseProduct: Product;
}

export function RecommendationCard({ recommendation, baseProduct }: RecommendationCardProps) {
  const { product, reason, score } = recommendation;
  
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-emerald-500/15 bg-emerald-950/20 p-5 transition-all hover:bg-emerald-950/40 hover:shadow-lg">
      <div>
        <div className="flex items-start justify-between mb-4">
          <ReasonBadge reason={reason} />
          <div className="text-[10px] font-medium text-emerald-100/40 uppercase tracking-widest">
            {score}% Match
          </div>
        </div>
        
        <div className="flex gap-4 mb-4">
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-white/5 p-2 border border-emerald-500/10">
            {product.productImage ? (
              <img src={product.productImage} alt={product.title} className="h-full w-full object-contain" />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-emerald-100/20 text-xs">No img</div>
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-200/50 mb-1">{product.storeName}</p>
            <h4 className="text-sm font-medium text-emerald-50 line-clamp-2" title={product.title}>
              {product.title}
            </h4>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-emerald-500/10 mt-auto">
        <div className="flex items-end justify-between mb-3">
          <span className="text-xl font-bold text-emerald-400">
            {formatCurrency(product.currentPrice, product.currency)}
          </span>
          <ComparisonStats 
            basePrice={baseProduct.currentPrice} 
            recommendedPrice={product.currentPrice} 
            currency={product.currency} 
          />
        </div>
        <Link
          href={`/dashboard/products/${product._id}`}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500/10 py-2.5 text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/20"
        >
          View Details
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
