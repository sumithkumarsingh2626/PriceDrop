import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Dialog({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
}: DialogProps) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm pointer-events-auto"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15, transition: { duration: 0.15 } }}
            className={cn(
              "relative z-10 w-full max-w-lg rounded-3xl border border-white/15 bg-slate-950/85 p-7 shadow-2xl backdrop-blur-2xl overflow-hidden",
              className
            )}
            style={{
              boxShadow: '0 25px 60px -10px rgba(0,0,0,0.8), inset 0 1px 1px 0 rgba(255,255,255,0.25), 0 0 30px rgba(124,58,237,0.15)',
            }}
          >
            {/* Top specular reflection bar */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand-cyan/10 blur-2xl" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-5 top-5 rounded-xl border border-white/10 bg-white/[0.05] p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition duration-150 backdrop-blur-md"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Dialog Content */}
            <div className="flex flex-col gap-1.5 mb-5 pr-6">
              <h2 className="text-xl font-bold tracking-tight text-slate-100">
                {title}
              </h2>
              {description && (
                <p className="text-sm font-medium text-slate-400">
                  {description}
                </p>
              )}
            </div>

            <div className="relative text-sm text-slate-300">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
