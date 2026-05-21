import React from 'react';
import { PackageOpen } from 'lucide-react';
import Button from '../ui/button';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export default function EmptyState({ title, description, actionText, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 rounded-2xl border border-dashed border-slate-800 bg-slate-950/20 backdrop-blur-md max-w-md mx-auto my-6">
      <div className="h-16 w-16 rounded-2xl bg-slate-900 flex items-center justify-center mb-5 text-slate-500 border border-slate-800/80">
        <PackageOpen className="h-8 w-8 text-slate-500 animate-bounce" style={{ animationDuration: '3s' }} />
      </div>
      <h3 className="text-base font-bold text-slate-200 mb-2 font-['Outfit']">
        {title}
      </h3>
      <p className="text-xs text-slate-500 max-w-xs leading-relaxed mb-6">
        {description}
      </p>
      {actionText && onAction && (
        <Button variant="outline" size="sm" onClick={onAction} className="text-xs font-semibold">
          {actionText}
        </Button>
      )}
    </div>
  );
}
