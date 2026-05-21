const buildPolyline = (points, width, height, padding) => {
  if (!points.length) return '';

  const values = points.map((point) => point.price);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const stepX = points.length > 1 ? (width - padding * 2) / (points.length - 1) : 0;

  return points
    .map((point, index) => {
      const x = padding + index * stepX;
      const y = height - padding - ((point.price - min) / range) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(' ');
};

const PriceTrendMini = ({ trend, className = '' }) => {
  const points = trend?.points || [];
  const direction = trend?.direction || 'flat';
  const stroke =
    direction === 'down' ? '#16a34a' : direction === 'up' ? '#dc2626' : '#a8a29e';

  if (!points.length) {
    return (
      <div className={`rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs text-stone-500 ${className}`}>
        Trend data will appear after the first price update.
      </div>
    );
  }

  return (
    <div className={`rounded-xl border border-stone-200 bg-stone-50/80 px-3 py-2 ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">Trend</p>
          <p
            className={`mt-1 text-sm font-semibold ${
              direction === 'down'
                ? 'text-green-700'
                : direction === 'up'
                  ? 'text-red-600'
                  : 'text-stone-600'
            }`}
          >
            {trend.label}
          </p>
        </div>

        <svg viewBox="0 0 120 42" className="h-10 w-28 overflow-visible">
          <polyline
            fill="none"
            stroke={stroke}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={buildPolyline(points, 120, 42, 4)}
          />
        </svg>
      </div>
    </div>
  );
};

export default PriceTrendMini;
