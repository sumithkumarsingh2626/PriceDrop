import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/button';
import { Cloud } from 'lucide-react';

export default function PublicLayout({
  children,
  title,
  subtitle,
}) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050B18] text-[#F8FAFC] antialiased selection:bg-[#00D4FF] selection:text-[#050B18]">
      {/* Background Precision Grid & Radial Light Cones */}
      <div className="pointer-events-none fixed inset-0 grid-premium opacity-40" />
      <div className="pointer-events-none fixed -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#2563EB]/20 via-[#00D4FF]/10 to-transparent blur-[140px]" />

      <header className="glass-nav sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#00D4FF] p-0.5 shadow-glow-cyan">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#050B18]">
                <Cloud className="h-5 w-5 text-[#00D4FF]" />
              </div>
            </div>
            <div>
              <span className="font-display text-base font-extrabold tracking-tight text-white">Price Drop</span>
              <span className="ms-2 rounded border border-[#00D4FF]/30 bg-[#00D4FF]/10 px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#00D4FF]">
                AI CLOUD
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

      <main className="relative mx-auto flex w-full max-w-xl flex-col px-4 pb-20 pt-12">
        {(title || subtitle) && (
          <div className="mb-8 text-center">
            {title ? <h1 className="font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">{title}</h1> : null}
            {subtitle ? <p className="mt-2 text-xs leading-relaxed text-[#94A3B8]">{subtitle}</p> : null}
          </div>
        )}
        <div className="w-full">
          {children}
        </div>
      </main>
    </div>
  );
}