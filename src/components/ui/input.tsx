import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  label?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', error, leftIcon, rightIcon, label, hint, id, ...props }, ref) => (
    <div className="flex w-full min-w-0 flex-col gap-1.5">
      {label ? (
        <div className="flex items-center justify-between h-5">
          <label htmlFor={id} className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-300">
            {label}
          </label>
          {hint ? (
            <span className="font-mono text-[10px] text-slate-500">{hint}</span>
          ) : null}
        </div>
      ) : null}
      <div className="relative flex w-full items-center">
        {leftIcon ? (
          <div className="pointer-events-none absolute left-3.5 text-slate-400">{leftIcon}</div>
        ) : null}
        <input
          id={id}
          type={type}
          ref={ref}
          className={cn(
            'w-full min-w-0 rounded-xl border border-white/[0.1] bg-[#0B1428]/90 py-2.5 text-xs text-[#F8FAFC] placeholder:text-slate-500 outline-none transition-all focus:border-[#00D4FF] focus:bg-[#111E38]/80 focus:ring-1 focus:ring-[#00D4FF]/40',
            leftIcon ? 'pl-10' : 'pl-3.5',
            rightIcon ? 'pr-10' : 'pr-3.5',
            error ? 'border-rose-400/60 focus:border-rose-400 focus:ring-rose-400/30' : '',
            className,
          )}
          {...props}
        />
        {rightIcon ? <div className="absolute right-3.5 text-slate-400">{rightIcon}</div> : null}
      </div>
      {error ? <span className="font-mono text-[11px] text-rose-400">{error}</span> : null}
    </div>
  ),
);

Input.displayName = 'Input';

export default Input;