"use server"

import { cookies } from "next/headers"

export async function login(username: string, password: string) {
  // In a real application, you would validate the credentials against a database
  // For this example, we'll use a mock authentication
  if (username === "user" && password === "password") {
    const user = { id: "1", username: "user" }
    const c = await cookies()
    c.set("isLoggedIn", "true", { httpOnly: true })
    return user
  }
  throw new Error("Invalid credentials")
}
