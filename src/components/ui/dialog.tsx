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
              "relative z-10 w-full max-w-lg rounded-2xl border border-slate-800/80 bg-slate-950 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl overflow-hidden",
              "before:absolute before:inset-0 before:bg-[linear-gradient(130deg,rgba(255,255,255,0.03),transparent)] before:pointer-events-none",
              className
            )}
            style={{ boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.05), 0 20px 50px rgba(0,0,0,0.5)' }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4.5 top-4.5 rounded-lg p-1 text-slate-500 hover:bg-slate-900 hover:text-slate-200 transition duration-150"
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
