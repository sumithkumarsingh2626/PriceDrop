'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import type { PriceHistoryPoint } from '@/types';
import { formatDate } from '@/lib/utils';
import { PriceTooltip } from './PriceTooltip';
import { ReplayControls } from './ReplayControls';
import { TimelineSlider } from './TimelineSlider';

interface PriceGraphProps {
  history: PriceHistoryPoint[];
  currency: string;
}

export function PriceGraph({ history, currency }: PriceGraphProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(history.length > 0 ? history.length - 1 : 0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const sortedHistory = useMemo(
    () => [...history].sort((a, b) => new Date(a.scrapedAt).getTime() - new Date(b.scrapedAt).getTime()),
    [history]
  );

  const visibleData = useMemo(() => {
    if (sortedHistory.length === 0) return [];
    return sortedHistory.slice(0, currentIndex + 1);
  }, [sortedHistory, currentIndex]);

  const { highestPrice, lowestPrice } = useMemo(() => {
    if (sortedHistory.length === 0) return { highestPrice: 0, lowestPrice: 0 };
    const prices = sortedHistory.map((h) => h.price);
    return {
      highestPrice: Math.max(...prices),
      lowestPrice: Math.min(...prices),
    };
  }, [sortedHistory]);

  const maxIndex = sortedHistory.length > 0 ? sortedHistory.length - 1 : 0;

  useEffect(() => {
    setCurrentIndex(maxIndex);
  }, [maxIndex]);

  useEffect(() => {
    if (isPlaying) {
      if (currentIndex >= maxIndex) {
        setIsPlaying(false);
        return;
      }
      timerRef.current = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 300); // Animation speed
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentIndex, maxIndex]);

  const handlePlayPause = () => {
    if (currentIndex >= maxIndex && !isPlaying) {
      // If at end, start from beginning
      setCurrentIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentIndex(maxIndex);
  };

  if (history.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-3xl border border-emerald-500/10 bg-emerald-950/20 text-sm text-emerald-100/40">
        No price history available.
      </div>
    );
  }

  // To prevent the graph's Y axis from jumping around too much during replay, 
  // we fix the domain to the absolute max/min of the entire dataset.
  const yDomain = [lowestPrice * 0.95, highestPrice * 1.05];

  return (
    <div className="space-y-6">
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={visibleData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(16, 185, 129, 0.1)" />
            <XAxis
              dataKey="scrapedAt"
              tickFormatter={(val: string) => formatDate(val).split(' ')[0]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'rgba(209, 250, 229, 0.4)', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              domain={yDomain}
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'rgba(209, 250, 229, 0.4)', fontSize: 12 }}
              tickFormatter={(val: number) => Math.round(val).toString()}
            />
            <Tooltip
              content={<PriceTooltip currency={currency} highestPrice={highestPrice} lowestPrice={lowestPrice} />}
              cursor={{ stroke: 'rgba(16, 185, 129, 0.3)', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#34d399"
              strokeWidth={2}
              fill="url(#priceGradient)"
              isAnimationActive={false} // Disable Recharts animation because we animate data manually
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex flex-col gap-4 rounded-2xl bg-emerald-950/20 p-4 border border-emerald-500/10">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-emerald-100">Timeline Replay</p>
          <ReplayControls isPlaying={isPlaying} onPlayPause={handlePlayPause} onReset={handleReset} />
        </div>
        <TimelineSlider currentIndex={currentIndex} maxIndex={maxIndex} onChange={(i) => { setCurrentIndex(i); setIsPlaying(false); }} />
      </div>
    </div>
  );
}
