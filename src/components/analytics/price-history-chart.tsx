import { useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import type { PriceHistoryPoint } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';

interface PriceHistoryChartProps {
  history: PriceHistoryPoint[];
  currency: string;
}

export default function PriceHistoryChart({
  history,
  currency,
}: PriceHistoryChartProps) {
  const data = useMemo(
    () =>
      history.map((point) => ({
        ...point,
        label: formatDate(point.scrapedAt),
      })),
    [history],
  );

  return (
    <div className="relative h-[300px] rounded-xl border border-white/[0.06] bg-[#07090f]/70 p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ left: -10, right: 10, top: 16, bottom: 0 }}>
          <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            stroke="#64748b"
            fontSize={10}
            fontFamily="monospace"
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            stroke="#64748b"
            fontSize={10}
            fontFamily="monospace"
            tickFormatter={(value) => formatCurrency(Number(value), currency)}
            width={80}
          />
          <Tooltip
            cursor={{ stroke: 'rgba(0, 245, 160, 0.3)', strokeWidth: 1.5, strokeDasharray: '3 3' }}
            contentStyle={{
              background: '#0c0f17',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '12px',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              fontSize: '11px',
              fontFamily: 'monospace',
              padding: '10px 14px',
            }}
            formatter={(value: number) => [formatCurrency(value, currency), 'Valuation']}
            labelFormatter={(label) => `Scraped: ${label}`}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#00f5a0"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, fill: '#00f5a0', stroke: '#06070a', strokeWidth: 2 }}
            animationDuration={600}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}