"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { ReactNode, useEffect } from "react";
import { queryClient } from "@/lib/react-query";
import { useRouter } from "next/navigation";
import useUserSession from "@/lib/store";
import { getProfile } from "@/http/get-profile";

const AuthProvider = ({ children }: Readonly<{ children: ReactNode }>) => {
  const { setUser, logout } = useUserSession();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check-token');
        if (!response.ok) {
          logout();
          router.push('/auth/sign-in');
          return;
        }
        const data = await response.json();
        if (data?.isAuth) {
          const profile = await getProfile();
          setUser(profile.user);
        } else {
          logout();
          router.push('/auth/sign-in');
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        logout();
        router.push('/auth/sign-in');
      }
    };

    checkAuth();
  }, [setUser, logout, router]);

  return children;
};

export function Providers({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange
      >
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
