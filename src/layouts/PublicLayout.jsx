import { Link } from 'react-router-dom';
import Button from '@/components/ui/button';

export default function PublicLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-brand-ink bg-hero-mesh text-slate-100">
      <header className="glass-nav sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-violet to-brand-cyan">
              <i className="bi bi-lightning-charge-fill text-white" />
            </div>
            <span className="font-display text-lg font-bold">Price Drop Alert</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm text-slate-400 transition hover:text-white">
              Sign in
            </Link>
            <Link to="/register">
              <Button size="sm">Get started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-lg flex-col px-4 pb-16 pt-10">
        {(title || subtitle) && (
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 inline-flex rounded-2xl bg-gradient-to-br from-brand-violet to-brand-cyan p-3 text-white shadow-glow">
              <i className="bi bi-stars text-lg" />
            </div>
            {title ? <h1 className="font-display text-3xl font-bold">{title}</h1> : null}
            {subtitle ? <p className="mt-3 text-sm leading-relaxed text-slate-400">{subtitle}</p> : null}
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
