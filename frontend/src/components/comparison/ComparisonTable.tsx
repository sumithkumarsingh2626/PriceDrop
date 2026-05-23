import { PlatformCard } from './PlatformCard';
import { ComparisonLoader } from './ComparisonLoader';

interface Comparison {
  _id?: string;
  platform: string;
  productTitle: string;
  productUrl: string;
  currentPrice: number;
  originalPrice: number;
  image: string;
  inStock: boolean;
}

interface ComparisonTableProps {
  comparisons: Comparison[];
  isLoading: boolean;
  currency?: string;
  error?: string | null;
}

export function ComparisonTable({ comparisons, isLoading, currency = 'INR', error }: ComparisonTableProps) {
  if (isLoading) {
    return <ComparisonLoader />;
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-950/10 p-6 text-center text-sm text-red-400">
        {error}
      </div>
    );
  }

  if (comparisons.length === 0) {
    return (
      <div className="rounded-2xl border border-emerald-500/10 bg-emerald-950/20 p-6 text-center text-sm text-emerald-100/40">
        Comparison data is being fetched — check back in a moment.
      </div>
    );
  }

  const lowestPrice = Math.min(...comparisons.map((c) => c.currentPrice));

  return (
    <div className="space-y-3">
      {comparisons
        .slice()
        .sort((a, b) => a.currentPrice - b.currentPrice)
        .map((comparison) => (
          <PlatformCard
            key={comparison._id ?? comparison.platform}
            platform={comparison.platform}
            productTitle={comparison.productTitle}
            productUrl={comparison.productUrl}
            currentPrice={comparison.currentPrice}
            originalPrice={comparison.originalPrice}
            image={comparison.image}
            inStock={comparison.inStock}
            isLowest={comparison.currentPrice === lowestPrice}
            currency={currency}
          />
        ))}
    </div>
  );
}
