import { Link } from 'react-router-dom';
import Button from '@/components/ui/button';

export default function PublicLayout({ children, title, subtitle }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-brand-ink text-slate-100 antialiased selection:bg-brand-violet selection:text-white">
      {/* Ambient background light orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-brand-violet/20 blur-[130px]" />
        <div className="absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-brand-cyan/15 blur-[130px]" />
      </div>

      <header className="glass-nav sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-violet via-purple-600 to-brand-cyan shadow-glow text-white">
              <i className="bi bi-lightning-charge-fill text-xl" />
            </div>
            <div>
              <span className="font-display text-lg font-extrabold tracking-tight text-white">Price Drop</span>
              <span className="ms-1.5 rounded-md border border-brand-cyan/30 bg-brand-cyan/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-cyan">PRO</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-slate-300 transition hover:text-white">
              Sign in
            </Link>
            <Link to="/register">
              <Button size="sm">Get started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="relative mx-auto flex w-full max-w-xl flex-col px-4 pb-20 pt-12">
        {(title || subtitle) && (
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.05] p-3 text-white shadow-glow backdrop-blur-xl">
              <i className="bi bi-stars text-xl text-gradient" />
            </div>
            {title ? <h1 className="font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">{title}</h1> : null}
            {subtitle ? <p className="mt-3 text-sm leading-relaxed text-slate-400">{subtitle}</p> : null}
          </div>
        )}
        <div className="w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
