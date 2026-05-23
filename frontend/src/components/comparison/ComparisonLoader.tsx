export function ComparisonLoader() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 rounded-2xl border border-emerald-500/10 bg-emerald-950/20 p-4 animate-pulse">
          <div className="h-16 w-16 shrink-0 rounded-xl bg-emerald-900/40"></div>
          <div className="flex-1 space-y-2">
            <div className="h-3 w-24 rounded bg-emerald-900/40"></div>
            <div className="h-3 w-48 rounded bg-emerald-900/40"></div>
            <div className="h-5 w-32 rounded bg-emerald-900/40"></div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="h-3 w-16 rounded bg-emerald-900/40"></div>
            <div className="h-7 w-20 rounded-lg bg-emerald-900/40"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
