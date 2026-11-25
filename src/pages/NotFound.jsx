import { Link } from 'react-router-dom';
import { Home, LayoutDashboard, SearchX } from 'lucide-react';
import Button from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#06070a] px-6 text-center antialiased">
      {/* Background Precision Grid */}
      <div className="pointer-events-none fixed inset-0 grid-premium opacity-50" />
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-transparent via-[#06070a]/40 to-[#06070a]" />

      <Card hoverGlow isometric className="relative flex max-w-md flex-col items-center gap-5 p-10 shadow-2xl">
        {/* Floating 3D Icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[#00f5a0] shadow-specular">
          <SearchX className="h-8 w-8" />
        </div>

        {/* Copy */}
        <div className="space-y-1.5">
          <span className="glass-pill border-white/10 font-mono text-[10px] text-slate-400">
            HTTP 404 · NOT FOUND
          </span>
          <h1 className="font-display text-2xl font-extrabold tracking-tight text-white">
            Resource Non-Existent
          </h1>
          <p className="text-xs leading-relaxed text-slate-400">
            The target route does not exist or has been relocated within the retail intelligence index.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex w-full flex-col gap-2.5 pt-2 sm:flex-row">
          <Link to="/" className="flex-1">
            <Button size="sm" variant="secondary" className="w-full" leftIcon={<Home className="h-3.5 w-3.5" />}>
              Landing Page
            </Button>
          </Link>
          <Link to="/dashboard" className="flex-1">
            <Button size="sm" className="w-full" leftIcon={<LayoutDashboard className="h-3.5 w-3.5" />}>
              Open Console
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}