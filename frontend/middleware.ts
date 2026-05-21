import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SESSION_COOKIE = 'pda_session';

function isProtectedPath(pathname: string): boolean {
  const prefixes = ['/dashboard', '/products', '/analytics', '/settings', '/admin'];
  return prefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function middleware(req: NextRequest) {
  const hasSession = req.cookies.get(SESSION_COOKIE)?.value === '1';

  if (isProtectedPath(req.nextUrl.pathname) && !hasSession) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('from', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/products/:path*', '/analytics/:path*', '/settings/:path*', '/admin/:path*'],
};
