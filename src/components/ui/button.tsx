import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const variants = {
  primary:
    'bg-gradient-to-r from-brand-violet to-brand-purple text-white shadow-glow border border-brand-violet/40 hover:brightness-110',
  secondary: 'bg-slate-800 text-slate-100 border border-slate-700 hover:bg-slate-700',
  outline:
    'bg-transparent border border-white/15 text-slate-200 hover:border-brand-cyan/40 hover:bg-white/5',
  danger: 'bg-rose-600/90 text-white border border-rose-500/40',
  ghost: 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent',
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
}) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center rounded-xl font-semibold transition active:scale-[0.98] disabled:opacity-50',
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
