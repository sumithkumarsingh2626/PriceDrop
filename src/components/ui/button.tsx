import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const variants = {
  primary:
    'bg-gradient-to-r from-[#2563EB] via-[#1D4ED8] to-[#00D4FF] text-white font-bold border border-white/20 shadow-[0_1px_0_0_rgba(255,255,255,0.35)_inset,0_8px_24px_-4px_rgba(37,99,235,0.5),0_0_20px_-2px_rgba(0,212,255,0.3)] hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_1px_0_0_rgba(255,255,255,0.45)_inset,0_12px_30px_-4px_rgba(37,99,235,0.65),0_0_25px_0_rgba(0,212,255,0.45)] active:translate-y-0',
  secondary:
    'bg-[#0B1428]/80 text-[#F8FAFC] border border-white/[0.1] backdrop-blur-md hover:bg-[#111E38] hover:border-[#00D4FF]/30 hover:text-white hover:-translate-y-0.5 active:translate-y-0 shadow-[0_1px_0_0_rgba(255,255,255,0.08)_inset]',
  outline:
    'bg-transparent border border-white/[0.14] text-slate-200 backdrop-blur-md hover:border-[#00D4FF]/50 hover:bg-[#00D4FF]/10 hover:text-white hover:-translate-y-0.5 active:translate-y-0',
  danger:
    'bg-rose-600/25 text-rose-300 border border-rose-500/40 backdrop-blur-md hover:bg-rose-600/40 hover:border-rose-500/60 hover:text-white hover:-translate-y-0.5 active:translate-y-0',
  ghost:
    'text-slate-400 hover:bg-white/[0.06] hover:text-white border border-transparent',
};

const sizes = {
  sm: 'px-3.5 py-1.5 text-xs',
  md: 'px-4.5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

export default function Button({
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  type = 'button',
  ...rest
}: {
  className?: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  [key: string]: any;
}) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className,
      )}
      {...rest}
    >
      {isLoading && <Loader2 className="me-2 h-4 w-4 animate-spin" />}
      {!isLoading && leftIcon && <span className="me-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ms-2">{rightIcon}</span>}
    </button>
  );
}