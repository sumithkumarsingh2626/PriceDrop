import { cn } from '@/lib/utils';

export function Card({ className, children, hoverGlow, isometric, ...props }) {
  return (
    <div
      className={cn(
        isometric || hoverGlow ? 'glass-card-iso p-6' : 'glass-card p-6',
        className,
      )}
      {...props}
    >
      {/* Specular top reflection line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }) {
  return (
    <div className={cn('mb-4 flex flex-col gap-1', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }) {
  return (
    <h3 className={cn('text-lg font-bold text-white', className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }) {
  return (
    <p className={cn('text-sm text-slate-400', className)} {...props}>
      {children}
    </p>
  );
}
