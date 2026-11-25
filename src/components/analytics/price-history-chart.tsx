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
    <div className="relative h-[320px] rounded-2xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur-xl">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ left: -10, right: 10, top: 16, bottom: 0 }}>
          <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            stroke="#94a3b8"
            fontSize={11}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            stroke="#94a3b8"
            fontSize={11}
            tickFormatter={(value) => formatCurrency(Number(value), currency)}
            width={90}
          />
          <Tooltip
            cursor={{ stroke: 'rgba(6, 182, 212, 0.3)', strokeWidth: 1.5, strokeDasharray: '4 4' }}
            contentStyle={{
              background: 'rgba(15, 23, 42, 0.95)',
              border: '1px solid rgba(6, 182, 212, 0.35)',
              borderRadius: '16px',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.2)',
              color: '#f8fafc',
              fontSize: '12px',
              padding: '10px 14px',
            }}
            formatter={(value: number) => [formatCurrency(value, currency), 'Price']}
            labelFormatter={(label) => `Recorded: ${label}`}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#06b6d4"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, fill: '#06b6d4', stroke: '#ffffff', strokeWidth: 2 }}
            animationDuration={650}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}