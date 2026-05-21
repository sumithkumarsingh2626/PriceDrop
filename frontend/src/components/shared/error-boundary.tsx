'use client';

import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import Button from '../ui/button';

interface ErrorBoundaryProps {
  error: Error;
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 rounded-2xl border border-rose-500/20 bg-rose-500/5 backdrop-blur-md max-w-md mx-auto my-12">
      <div className="h-14 w-14 rounded-full bg-rose-500/10 flex items-center justify-center mb-5 text-rose-400 border border-rose-500/20 animate-pulse">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h3 className="text-base font-bold text-slate-200 mb-2 font-['Outfit']">
        System Encountered an Error
      </h3>
      <p className="text-xs text-slate-400 max-w-xs leading-relaxed mb-6 font-mono break-words bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
        {error.message || 'Unknown compilation error'}
      </p>
      <Button
        variant="secondary"
        size="sm"
        leftIcon={<RotateCcw className="h-4 w-4" />}
        onClick={reset}
        className="text-xs font-semibold"
      >
        Retry Operation
      </Button>
    </div>
  );
}
