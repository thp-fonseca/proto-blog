import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from '@/i18n/routing';

const locales = ['pt-BR', 'en-US'];
const defaultLocale = 'pt-BR';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const authToken = request.cookies.get('token')?.value;

  const protectedRoutes = ['/feed'];

  if (!authToken && protectedRoutes.some((route) => pathname.includes(route))) {
    const locale = request.nextUrl.locale || defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}/auth/sign-in`, request.url));
  }

  if (authToken && pathname === '/') {
    const locale = request.nextUrl.locale || defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}/feed`, request.url));
  }

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)', '/'],
};
