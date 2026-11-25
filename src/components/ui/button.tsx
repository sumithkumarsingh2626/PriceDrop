import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const variants = {
  primary:
    'bg-gradient-to-r from-brand-violet to-brand-purple text-white shadow-glow border border-white/20 hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-5px_rgba(124,58,237,0.6)] active:translate-y-0',
  secondary:
    'bg-white/[0.07] text-slate-100 border border-white/12 backdrop-blur-xl hover:bg-white/[0.12] hover:border-white/25 hover:-translate-y-0.5 active:translate-y-0',
  outline:
    'bg-white/[0.03] border border-white/15 text-slate-200 backdrop-blur-xl hover:border-brand-cyan/50 hover:bg-brand-cyan/10 hover:text-white hover:-translate-y-0.5 active:translate-y-0',
  danger:
    'bg-rose-600/80 text-white border border-rose-400/30 backdrop-blur-xl hover:bg-rose-600 hover:-translate-y-0.5',
  ghost:
    'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent',
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
