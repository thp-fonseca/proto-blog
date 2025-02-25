import createMiddleware from "next-intl/middleware"
import { type NextRequest, NextResponse } from "next/server"
import { routing } from "@/i18n/routing"

const locales = ["pt-BR", "en-US"]
const defaultLocale = "pt-BR"

const intlMiddleware = createMiddleware(routing)

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if the user is logged in by looking for an auth token in the cookies
  const authToken = request.cookies.get("token")?.value

  // If the user is logged in and trying to access the root path, redirect to /feed
  if (authToken && pathname === "/") {
    const locale = request.nextUrl.locale || defaultLocale
    return NextResponse.redirect(new URL(`/${locale}/feed`, request.url))
  }

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  )

  if (pathnameIsMissingLocale) {
    const locale = defaultLocale
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)", "/"],
}
