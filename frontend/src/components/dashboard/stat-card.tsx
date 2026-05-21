'use client';

import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface StatCardProps {
  label: string;
  value: string;
  hint: string;
  icon: LucideIcon;
}

export default function StatCard({ label, value, hint, icon: Icon }: StatCardProps) {
  return (
    <Card hoverGlow className="flex items-start justify-between gap-4">
      <div>
        <p className="text-[11px] uppercase tracking-[0.24em] text-emerald-200/60">{label}</p>
        <h3 className="mt-3 text-3xl font-bold text-emerald-50">{value}</h3>
        <p className="mt-2 text-sm text-emerald-100/60">{hint}</p>
      </div>
      <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/10 p-3 text-emerald-300">
        <Icon className="h-5 w-5" />
      </div>
    </Card>
  );
}
