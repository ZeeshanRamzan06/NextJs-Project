import {NextRequest, NextResponse } from 'next/server'
export { default } from "next-auth/middleware"
import { getToken } from "next-auth/jwt"
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
            const token = await getToken({req: request})
            const url = request.nextUrl
            
            // If the user is authenticated
  if (token) {
    // Prevent access to auth pages for logged-in users
    if (
      url.pathname.startsWith('/sign-in') ||
      url.pathname.startsWith('/sign-up') ||
      url.pathname.startsWith('/verify')  
    ) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    // Allow access to all other routes for authenticated users
    return NextResponse.next();
  }

  // If the user is not authenticated
  if (
    url.pathname.startsWith('/dashboard') || // Protect dashboard routes
    url.pathname.startsWith('/verify') // Protect verification routes
  ) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // Allow access to public routes (e.g., /sign-in, /sign-up, /home)
  return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/sign-in',
    '/sign-up',
    '/',
    '/dasboard/:path*',
    "/verify/:path"
  ],
}