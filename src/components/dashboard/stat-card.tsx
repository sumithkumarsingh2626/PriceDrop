import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface StatCardProps {
  label: string;
  value: string;
  hint: string;
  icon: LucideIcon;
  variant?: 'cyan' | 'blue' | 'violet' | 'emerald';
}

export default function StatCard({ label, value, hint, icon: Icon, variant = 'cyan' }: StatCardProps) {
  const styles = {
    cyan: {
      icon: 'text-[#00D4FF]',
      iconBg: 'bg-[#00D4FF]/10 border-[#00D4FF]/25 shadow-glow-cyan',
      highlight: 'group-hover:border-[#00D4FF]/40',
    },
    blue: {
      icon: 'text-[#2563EB]',
      iconBg: 'bg-[#2563EB]/10 border-[#2563EB]/25 shadow-glow-blue',
      highlight: 'group-hover:border-[#2563EB]/40',
    },
    violet: {
      icon: 'text-[#8B5CF6]',
      iconBg: 'bg-[#8B5CF6]/10 border-[#8B5CF6]/25 shadow-glow-violet',
      highlight: 'group-hover:border-[#8B5CF6]/40',
    },
    emerald: {
      icon: 'text-[#10B981]',
      iconBg: 'bg-[#10B981]/10 border-[#10B981]/25',
      highlight: 'group-hover:border-[#10B981]/40',
    },
  }[variant] || {
    icon: 'text-[#00D4FF]',
    iconBg: 'bg-[#00D4FF]/10 border-[#00D4FF]/25 shadow-glow-cyan',
    highlight: 'group-hover:border-[#00D4FF]/40',
  };

  return (
    <Card hoverGlow isometric className={`group relative flex flex-col justify-between overflow-hidden p-6 transition-all duration-300 ${styles.highlight}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
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

      <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-3 text-[11px] text-[#94A3B8]">
        <span className="truncate">{hint}</span>
        <span className="font-mono text-[9px] uppercase tracking-wider text-[#00D4FF] font-semibold">Active</span>
      </div>
    </Card>
  );
}