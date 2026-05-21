'use client';

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
        <label htmlFor={id} className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200/70">
          {label}
        </label>
      ) : null}
      <div className="relative flex items-center">
        {leftIcon ? <div className="pointer-events-none absolute left-3 text-emerald-200/45">{leftIcon}</div> : null}
        <input
          id={id}
          type={type}
          ref={ref}
          className={cn(
            'w-full rounded-2xl border border-emerald-500/15 bg-emerald-950/40 py-3 text-sm text-emerald-50 placeholder:text-emerald-200/35 outline-none transition focus:border-emerald-300/40 focus:ring-2 focus:ring-emerald-300/10',
            leftIcon ? 'pl-10' : 'pl-4',
            rightIcon ? 'pr-10' : 'pr-4',
            error ? 'border-rose-400/40 focus:border-rose-300/40 focus:ring-rose-300/10' : '',
            className,
          )}
          {...props}
        />
        {rightIcon ? <div className="absolute right-3 text-emerald-200/45">{rightIcon}</div> : null}
      </div>
      {error ? <span className="text-xs text-rose-200">{error}</span> : null}
    </div>
  ),
);

Input.displayName = 'Input';

export default Input;
