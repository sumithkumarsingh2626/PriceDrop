import { ReactNode } from 'react';

export function LowestPriceBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
      {children}
    </span>
  );
}
