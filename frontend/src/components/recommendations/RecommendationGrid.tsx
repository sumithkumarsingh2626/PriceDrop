import { RecommendationCard } from './RecommendationCard';
import { Product } from '@/types';

interface Recommendation {
  _id: string;
  reason: string;
  score: number;
  product: Product;
}

interface RecommendationGridProps {
  recommendations: Recommendation[];
  baseProduct: Product;
  isLoading: boolean;
  error: string | null;
}

export function RecommendationGrid({ recommendations, baseProduct, isLoading, error }: RecommendationGridProps) {
  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-48 rounded-2xl border border-emerald-500/10 bg-emerald-950/20 animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-950/10 p-6 text-center text-sm text-red-400">
        {error}
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-emerald-500/20 bg-emerald-950/10 p-8 text-center text-sm text-emerald-100/40">
        No alternatives found yet. We're constantly analyzing the market.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {recommendations.map((rec) => (
        <RecommendationCard key={rec._id} recommendation={rec} baseProduct={baseProduct} />
      ))}
    </div>
  );
}
