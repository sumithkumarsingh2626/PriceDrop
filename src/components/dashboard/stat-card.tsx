import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface StatCardProps {
  label: string;
  value: string;
  hint: string;
  icon: LucideIcon;
  variant?: 'violet' | 'cyan' | 'emerald' | 'amber';
}

export default function StatCard({ label, value, hint, icon: Icon, variant = 'violet' }: StatCardProps) {
  const variantStyles = {
    violet: {
      iconBg: 'bg-brand-violet/15 border-brand-violet/30 text-brand-purple',
      glow: 'group-hover:border-brand-violet/50',
      badge: 'text-violet-400',
    },
    cyan: {
      iconBg: 'bg-brand-cyan/15 border-brand-cyan/30 text-brand-cyan',
      glow: 'group-hover:border-brand-cyan/50',
      badge: 'text-cyan-400',
    },
    emerald: {
      iconBg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
      glow: 'group-hover:border-emerald-500/50',
      badge: 'text-emerald-400',
    },
    amber: {
      iconBg: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
      glow: 'group-hover:border-amber-500/50',
      badge: 'text-amber-400',
    },
  }[variant] || {
    iconBg: 'bg-brand-violet/15 border-brand-violet/30 text-brand-purple',
    glow: 'group-hover:border-brand-violet/50',
    badge: 'text-violet-400',
  };

  return (
    <Card hoverGlow isometric className="group relative flex flex-col justify-between overflow-hidden p-6 transition-all duration-300">
      {/* Ambient background light orb inside the glass */}
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/[0.04] blur-xl transition-all duration-300 group-hover:bg-brand-cyan/10" />
      
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className={`text-[10px] font-bold uppercase tracking-[0.24em] ${variantStyles.badge}`}>
            {label}
          </span>
          <h3 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white">
            {value}
          </h3>
        </div>
        <div className={`rounded-2xl border p-3.5 shadow-inner backdrop-blur-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${variantStyles.iconBg}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      
      <div className="mt-4 flex items-center gap-1.5 border-t border-white/[0.06] pt-3 text-xs text-slate-400">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-cyan/70 animate-pulse" />
        <span className="truncate">{hint}</span>
      </div>
    </Card>
  );
}
