import { Link } from 'react-router-dom';
import { Home, SearchX } from 'lucide-react';
import Button from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-brand-ink px-6 text-center">
      {/* Icon */}
      <div className="flex h-24 w-24 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-950/40">
        <SearchX className="h-12 w-12 text-emerald-400/70" />
      </div>

      {/* Copy */}
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/50">Error 404</p>
        <h1 className="text-5xl font-bold text-emerald-50">Page not found</h1>
        <p className="max-w-sm text-base text-emerald-200/60">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>

      {/* CTA */}
      <div className="flex gap-3">
        <Link to="/">
          <Button leftIcon={<Home className="h-4 w-4" />}>Go to home</Button>
        </Link>
        <Link to="/dashboard">
          <Button variant="outline">Open dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
