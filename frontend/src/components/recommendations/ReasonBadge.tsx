import { Sparkles, TrendingDown } from 'lucide-react';

export function ReasonBadge({ reason }: { reason: string }) {
  const isCheaper = reason.toLowerCase().includes('cheaper');
  const Icon = isCheaper ? TrendingDown : Sparkles;
  
  return (
    <div className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
      isCheaper 
        ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' 
        : 'border-blue-500/30 bg-blue-500/10 text-blue-300'
    }`}>
      <Icon className="h-3 w-3" />
      {reason}
    </div>
  );
}
