import { formatCurrency } from '@/lib/utils';
import { ArrowDownRight, ArrowUpRight, Equal } from 'lucide-react';

interface ComparisonStatsProps {
  basePrice: number;
  recommendedPrice: number;
  currency: string;
}

export function ComparisonStats({ basePrice, recommendedPrice, currency }: ComparisonStatsProps) {
  const diff = recommendedPrice - basePrice;
  const percentageDiff = (Math.abs(diff) / basePrice) * 100;
  
  if (diff === 0) {
    return (
      <div className="flex items-center gap-1 text-sm text-emerald-100/40">
        <Equal className="h-4 w-4" />
        <span>Same price</span>
      </div>
    );
  }

  const isCheaper = diff < 0;

  return (
    <div className={`flex items-center gap-1 text-sm font-medium ${isCheaper ? 'text-emerald-400' : 'text-red-400'}`}>
      {isCheaper ? <ArrowDownRight className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
      <span>
        {formatCurrency(Math.abs(diff), currency)} ({percentageDiff.toFixed(0)}%)
      </span>
      <span className="text-xs text-emerald-100/40 ml-1">
        {isCheaper ? 'cheaper' : 'more expensive'}
      </span>
    </div>
  );
}
