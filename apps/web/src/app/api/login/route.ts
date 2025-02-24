import { NextResponse } from "next/server"
import { login } from "@/app/actions"

export async function POST(request: Request) {
  const { username, password } = await request.json()
  try {
    const user = await login(username, password)
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }
}

