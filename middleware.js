// middleware.js
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

const protectedRoutes = ['/admin', '/products', '/checkout']; // Changed to lowercase for consistency

export function middleware(request) {
  // Try multiple cookie names for better compatibility
  const token = request.cookies.get('token')?.value || 
                request.cookies.get('auth-token')?.value ||
                request.cookies.get('session')?.value;

  const currentPath = request.nextUrl.pathname.toLowerCase(); // Normalize path case
  const isProtected = protectedRoutes.some(route =>
    currentPath.startsWith(route.toLowerCase())
  );

  // Debug logging (will appear in Netlify functions log)
  console.log(`Middleware triggered for ${currentPath}`);
  console.log(`Token present: ${!!token}, Protected route: ${isProtected}`);

  if (isProtected && !token) {
    console.log('Redirecting to home with unauthorized flag');
    const url = new URL('/', request.url);
    url.searchParams.set('unauthorized', 'true');
    
    // Create response and ensure cookies are preserved
    const response = NextResponse.redirect(url);
    
    // Important headers for Netlify
    response.headers.set('x-middleware-cache', 'no-cache');
    response.headers.set('Cache-Control', 'no-store, max-age=0');
    
    return response;
  }

  // For protected routes with valid token
  if (isProtected && token) {
    const response = NextResponse.next();
    // Ensure no caching of protected pages
    response.headers.set('Cache-Control', 'no-store, max-age=0');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/Products/:path*', // Changed to lowercase to match protectedRoutes
    '/Checkout/:path*',
    // Alternative matcher that might work better on Netlify:
    // '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ],
};