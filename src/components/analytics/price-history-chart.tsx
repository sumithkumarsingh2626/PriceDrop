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
    <div className="glass-panel-soft h-[320px] p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ left: -10, right: 10, top: 16, bottom: 0 }}>
          <CartesianGrid stroke="rgba(16,185,129,0.08)" vertical={false} />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            stroke="#7dd3a6"
            fontSize={11}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            stroke="#7dd3a6"
            fontSize={11}
            tickFormatter={(value) => formatCurrency(Number(value), currency)}
            width={90}
          />
          <Tooltip
            cursor={{ stroke: 'rgba(52, 211, 153, 0.2)', strokeWidth: 1 }}
            contentStyle={{
              background: 'rgba(6, 20, 16, 0.96)',
              border: '1px solid rgba(52, 211, 153, 0.18)',
              borderRadius: '18px',
              color: '#ecfdf5',
            }}
            formatter={(value: number) => formatCurrency(value, currency)}
            labelFormatter={(label) => label}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#34d399"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 5, fill: '#a7f3d0', stroke: '#34d399', strokeWidth: 2 }}
            animationDuration={650}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
