import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

/* const isProtectedRoute = createRouteMatcher([
  '/bookings(.*)',
  '/checkout(.*)',
  '/favorites(.*)',
  '/profile(.*)',
  '/rentals(.*)',
  '/reviews(.*)',
]); */

/* Specify which routes are going to be public */
const isPublicRoute = createRouteMatcher(['/', '/properties(.*)'])
/* Matcher for the admin route */
const isAdminRoute = createRouteMatcher(['/admin(.*)']);

/* If the route is not in the public list, restrict it */
export default clerkMiddleware((auth, req) => {
  const isAdminUser = auth().userId === process.env.ADMIN_USER_ID;
  if (isAdminRoute(req) && !isAdminUser) return NextResponse.redirect(new URL('/', req.url));
  if (!isPublicRoute(req)) auth().protect();
});

export const config = {
  matcher: [
    /* '/((?!.*\\..*|_next).*)',  */
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/', '/(api|trpc)(.*)'
  ],
};
