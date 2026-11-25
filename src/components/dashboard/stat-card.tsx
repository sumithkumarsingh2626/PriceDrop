import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface StatCardProps {
  label: string;
  value: string;
  hint: string;
  icon: LucideIcon;
  variant?: 'mint' | 'cyan' | 'amber' | 'blue';
}

export default function StatCard({ label, value, hint, icon: Icon, variant = 'mint' }: StatCardProps) {
  const styles = {
    mint: {
      icon: 'text-[#00f5a0]',
      iconBg: 'bg-[#00f5a0]/10 border-[#00f5a0]/20',
      led: 'bg-[#00f5a0]',
      highlight: 'group-hover:border-[#00f5a0]/30',
    },
    cyan: {
      icon: 'text-[#38bdf8]',
      iconBg: 'bg-[#38bdf8]/10 border-[#38bdf8]/20',
      led: 'bg-[#38bdf8]',
      highlight: 'group-hover:border-[#38bdf8]/30',
    },
    amber: {
      icon: 'text-[#f59e0b]',
      iconBg: 'bg-[#f59e0b]/10 border-[#f59e0b]/20',
      led: 'bg-[#f59e0b]',
      highlight: 'group-hover:border-[#f59e0b]/30',
    },
    blue: {
      icon: 'text-[#818cf8]',
      iconBg: 'bg-[#818cf8]/10 border-[#818cf8]/20',
      led: 'bg-[#818cf8]',
      highlight: 'group-hover:border-[#818cf8]/30',
    },
  }[variant] || {
    icon: 'text-[#00f5a0]',
    iconBg: 'bg-[#00f5a0]/10 border-[#00f5a0]/20',
    led: 'bg-[#00f5a0]',
    highlight: 'group-hover:border-[#00f5a0]/30',
  };

  return (
    <Card hoverGlow isometric className={`group relative flex flex-col justify-between overflow-hidden p-6 transition-all duration-300 ${styles.highlight}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full animate-pulse-dot shadow-[0_0_8px_currentColor]" style={{ backgroundColor: styles.icon.replace('text-[', '').replace(']', '') }} />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              {label}
            </span>
          </div>
          <h3 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white">
            {value}
          </h3>
        </div>
        <div className={`rounded-xl border p-3 backdrop-blur-md transition-all duration-300 group-hover:scale-105 ${styles.iconBg} ${styles.icon}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-white/[0.05] pt-3 text-[11px] text-slate-400">
        <span className="truncate">{hint}</span>
        <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500">Live</span>
      </div>
    </Card>
  );
}