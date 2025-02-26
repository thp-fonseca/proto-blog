import { isAuthenticated } from '@/auth/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const isAuth = await isAuthenticated()

  return NextResponse.json({ isAuth }, { status: 200 })
}
