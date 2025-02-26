import { AppAbility, RoleEnum } from '@workspace/acl';

import {create} from 'zustand';
import { createJSONStorage, persist } from "zustand/middleware";

type User = {
  name: string,
  role: RoleEnum,
  email: string,
  id: string,
  avatarUrl: string | null
}

type SessionStoreActions = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  logout: () => void;
}

const useUserSession = create<SessionStoreActions>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      logout: () => {
        set(() => ({ user: null }));
        localStorage.removeItem("user-session-storage")
      }
    }),
    {
      name: "user-session-storage",
      storage: createJSONStorage(() => localStorage),
    },
  )
);

export default useUserSession;
