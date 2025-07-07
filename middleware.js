// middleware.js
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

const protectedRoutes = ['/admin', '/Products', '/Checkout'];

export function middleware(request) {
  const token = request.cookies.get('token')?.value;

  const isProtected = protectedRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtected && !token) {
    const url = new URL('/', request.url);
    url.searchParams.set('unauthorized', 'true'); // ✅ Add this
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/Products/:path*', '/Checkout/:path*'],
};
