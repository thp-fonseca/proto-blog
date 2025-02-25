import useUserSession from '@/lib/store'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const {logout} = useUserSession()
  const redirectUrl = request.nextUrl.clone()

  redirectUrl.pathname = '/auth/sign-in'

  const c = await cookies()
  c.delete('token')
  logout()
  return NextResponse.redirect(redirectUrl)
}
