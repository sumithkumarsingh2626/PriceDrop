import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', error, leftIcon, rightIcon, label, id, ...props }, ref) => (
    <div className="flex w-full flex-col gap-2">
      {label ? (
        <label htmlFor={id} className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
          {label}
        </label>
      ) : null}
      <div className="relative flex items-center">
        {leftIcon ? (
          <div className="pointer-events-none absolute left-3 text-slate-500">{leftIcon}</div>
        ) : null}
        <input
          id={id}
          type={type}
          ref={ref}
          className={cn(
            'w-full rounded-2xl border border-white/10 bg-slate-900/60 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-brand-violet/50 focus:ring-2 focus:ring-brand-violet/20',
            leftIcon ? 'pl-10' : 'pl-4',
            rightIcon ? 'pr-10' : 'pr-4',
            error ? 'border-rose-400/40 focus:border-rose-400/50 focus:ring-rose-400/20' : '',
            className,
          )}
          {...props}
        />
        {rightIcon ? <div className="absolute right-3 text-slate-500">{rightIcon}</div> : null}
      </div>
      {error ? <span className="text-xs text-rose-300">{error}</span> : null}
    </div>
  ),
);

Input.displayName = 'Input';

export default Input;
