import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/button';
import { TrendingDown } from 'lucide-react';

export default function PublicLayout({
  children,
  title,
  subtitle,
}) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#06070a] text-slate-200 antialiased selection:bg-[#00f5a0] selection:text-[#06070a]">
      {/* Background Precision Grid */}
      <div className="pointer-events-none fixed inset-0 grid-premium opacity-50" />
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-transparent via-[#06070a]/40 to-[#06070a]" />

      <header className="glass-nav sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-b from-[#161c28] to-[#0c0f17] border border-white/10 shadow-specular text-[#00f5a0]">
              <TrendingDown className="h-5 w-5" />
            </div>
            <div>
              <span className="font-display text-base font-extrabold tracking-tight text-white">Price Drop</span>
              <span className="ms-2 font-mono text-[10px] font-semibold text-[#00f5a0] border border-[#00f5a0]/30 bg-[#00f5a0]/10 px-1.5 py-0.5 rounded">
                PRO
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-xs font-semibold text-slate-300 transition hover:text-white">
              Sign In
            </Link>
            <Link to="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="relative mx-auto flex w-full max-w-lg flex-col px-4 pb-20 pt-12">
        {(title || subtitle) && (
          <div className="mb-8 text-center">
            {title ? <h1 className="font-display text-3xl font-extrabold tracking-tight text-white">{title}</h1> : null}
            {subtitle ? <p className="mt-2 text-xs leading-relaxed text-slate-400">{subtitle}</p> : null}
          </div>
        )}
        <div className="w-full">
          {children}
        </div>
      </main>
    </div>
  );
}