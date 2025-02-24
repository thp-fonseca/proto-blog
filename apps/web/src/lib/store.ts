import { create } from "zustand"

interface UserState {
  user: {
    id: string
    username: string
  } | null
  isLoggedIn: boolean
  login: (user: { id: string; username: string }) => void
  logout: () => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoggedIn: false,
  login: (user) => set({ user, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
}))
