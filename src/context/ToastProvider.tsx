import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle, AlertTriangle, Info, AlertOctagon } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-remove toast after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const success = useCallback((message: string) => addToast(message, 'success'), [addToast]);
  const error = useCallback((message: string) => addToast(message, 'error'), [addToast]);
  const warning = useCallback((message: string) => addToast(message, 'warning'), [addToast]);
  const info = useCallback((message: string) => addToast(message, 'info'), [addToast]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast: addToast, success, error, warning, info }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 w-full max-w-sm pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => {
            let icon = <Info className="h-5 w-5 text-sky-400" />;
            let borderColor = 'border-slate-800/80';
            let bgGlow = 'rgba(24, 24, 27, 0.8)';
            
            if (t.type === 'success') {
              icon = <CheckCircle className="h-5 w-5 text-sky-400" />;
              borderColor = 'border-sky-500/30';
              bgGlow = 'rgba(56, 189, 246, 0.08)';
            } else if (t.type === 'error') {
              icon = <AlertOctagon className="h-5 w-5 text-rose-400" />;
              borderColor = 'border-rose-500/30';
              bgGlow = 'rgba(244, 63, 94, 0.05)';
            } else if (t.type === 'warning') {
              icon = <AlertTriangle className="h-5 w-5 text-amber-400" />;
              borderColor = 'border-amber-500/30';
              bgGlow = 'rgba(245, 158, 11, 0.05)';
            }

            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                className={`pointer-events-auto flex items-start gap-3 rounded-xl border ${borderColor} p-4 text-sm shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl bg-slate-950/90 text-slate-200 overflow-hidden relative`}
                style={{ backgroundColor: `rgba(9, 9, 11, 0.95)`, boxShadow: `inset 0 1px 0 0 rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.5)` }}
              >
                {/* Visual Glow Backdrop */}
                <div 
                  className="absolute -left-10 -top-10 w-24 h-24 rounded-full blur-2xl pointer-events-none" 
                  style={{ backgroundColor: bgGlow === 'rgba(24, 24, 27, 0.8)' ? 'rgba(56, 189, 248, 0.05)' : bgGlow }}
                />
                
                <div className="flex-shrink-0 mt-0.5">{icon}</div>
                <div className="flex-grow font-medium leading-5">{t.message}</div>
                <button
                  onClick={() => removeToast(t.id)}
                  className="flex-shrink-0 text-slate-500 hover:text-slate-300 transition duration-150"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
