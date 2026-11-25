import { Link } from 'react-router-dom';
import { Home, LayoutDashboard, SearchX } from 'lucide-react';
import Button from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-brand-ink px-6 text-center antialiased">
      {/* Ambient background light orbs */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-brand-violet/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-brand-cyan/20 blur-[120px]" />

      <Card hoverGlow isometric className="relative flex max-w-md flex-col items-center gap-6 p-10 shadow-2xl">
        {/* Floating 3D Icon */}
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/15 bg-white/[0.05] shadow-glow backdrop-blur-2xl">
          <SearchX className="h-10 w-10 text-brand-cyan animate-pulse" />
        </div>

        {/* Copy */}
        <div className="space-y-2">
          <span className="glass-pill border-brand-violet/30 text-brand-purple">
            404 Not Found
          </span>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white">
            Lost in Space
          </h1>
          <p className="text-sm leading-relaxed text-slate-400">
            The page you are looking for does not exist, was moved, or had its URL altered.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex w-full flex-col gap-3 pt-2 sm:flex-row">
          <Link to="/" className="flex-1">
            <Button size="sm" className="w-full" leftIcon={<Home className="h-4 w-4" />}>
              Home
            </Button>
          </Link>
          <Link to="/dashboard" className="flex-1">
            <Button size="sm" variant="outline" className="w-full" leftIcon={<LayoutDashboard className="h-4 w-4" />}>
              Dashboard
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
