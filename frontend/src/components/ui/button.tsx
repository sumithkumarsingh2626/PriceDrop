'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

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
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-2xl font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#04110d] disabled:cursor-not-allowed disabled:opacity-60';

  const variants = {
    primary:
      'bg-emerald-400 text-emerald-950 shadow-[0_18px_40px_rgba(16,185,129,0.18)] hover:bg-emerald-300',
    secondary: 'bg-emerald-950/80 text-emerald-100 hover:bg-emerald-900/70',
    outline:
      'border border-emerald-500/25 bg-transparent text-emerald-100 hover:border-emerald-400/40 hover:bg-emerald-900/20',
    danger: 'bg-rose-500/15 text-rose-200 hover:bg-rose-500/25 border border-rose-500/20',
    ghost: 'text-emerald-200/80 hover:bg-emerald-900/20 hover:text-emerald-50',
  };

  const sizes = {
    sm: 'px-3 py-2 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-5 py-3 text-sm',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...rest}
    >
      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : leftIcon ? <span className="mr-2">{leftIcon}</span> : null}
      {children}
      {!isLoading && rightIcon ? <span className="ml-2">{rightIcon}</span> : null}
    </button>
  );
}
