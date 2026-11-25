import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const variants = {
  primary:
    'bg-gradient-to-b from-[#00f5a0] to-[#00d984] text-[#05140d] font-bold border border-[#00f5a0] shadow-[0_1px_0_0_rgba(255,255,255,0.4)_inset,0_6px_18px_-3px_rgba(0,245,160,0.45)] hover:brightness-105 hover:-translate-y-0.5 hover:shadow-[0_1px_0_0_rgba(255,255,255,0.5)_inset,0_10px_25px_-4px_rgba(0,245,160,0.6)] active:translate-y-0',
  secondary:
    'bg-white/[0.05] text-slate-200 border border-white/[0.08] backdrop-blur-md hover:bg-white/[0.09] hover:border-white/[0.16] hover:text-white hover:-translate-y-0.5 active:translate-y-0',
  outline:
    'bg-transparent border border-white/[0.12] text-slate-300 backdrop-blur-md hover:border-[#00f5a0]/40 hover:bg-[#00f5a0]/5 hover:text-white hover:-translate-y-0.5 active:translate-y-0',
  danger:
    'bg-rose-500/20 text-rose-300 border border-rose-500/30 backdrop-blur-md hover:bg-rose-500/30 hover:border-rose-500/50 hover:text-white hover:-translate-y-0.5 active:translate-y-0',
  ghost:
    'text-slate-400 hover:bg-white/[0.05] hover:text-slate-200 border border-transparent',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2.5 text-sm',
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