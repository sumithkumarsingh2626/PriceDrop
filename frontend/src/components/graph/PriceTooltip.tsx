import { formatCurrency, formatDate, percentLabel } from '@/lib/utils';
import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

interface PriceTooltipProps extends TooltipProps<ValueType, NameType> {
  currency: string;
  highestPrice: number;
  lowestPrice: number;
}

export function PriceTooltip({ active, payload, label, currency, highestPrice, lowestPrice }: PriceTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    
    return (
      <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/90 p-4 shadow-xl backdrop-blur-md">
        <p className="text-xs font-semibold text-emerald-100/60 mb-2">
          {label ? formatDate(label as string) : ''}
        </p>
        <div className="space-y-1">
          <p className="text-sm">
            <span className="text-emerald-100/60">Price: </span>
            <span className="font-bold text-emerald-50">
              {formatCurrency(data.price, currency)}
            </span>
          </p>
          <p className="text-sm">
            <span className="text-emerald-100/60">Change: </span>
            <span className={data.percentageChange < 0 ? 'text-emerald-400 font-medium' : data.percentageChange > 0 ? 'text-red-400 font-medium' : 'text-emerald-100/60'}>
              {percentLabel(data.percentageChange)}
            </span>
          </p>
        </div>
        <div className="mt-3 pt-3 border-t border-emerald-500/20 grid grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-emerald-200/40">Highest</p>
            <p className="text-xs text-emerald-100/70">{formatCurrency(highestPrice, currency)}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-emerald-200/40">Lowest</p>
            <p className="text-xs text-emerald-400">{formatCurrency(lowestPrice, currency)}</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
