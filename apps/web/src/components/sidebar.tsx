"use client"

import Link from "next/link";
import { Home, User, Settings, LogOut } from "lucide-react";

import useUserSession from "@/lib/store";
import { useRouter } from "next/navigation";

export function Sidebar() {
  const router = useRouter();
  const {logout} = useUserSession();

  const handleLogout = async () => {
    logout();

    router.push("/api/auth/sign-out");
  };

  return (
    <aside className="w-64 bg-card text-card-foreground p-4 space-y-4">
      <nav className="space-y-2">
        <Link href="/feed" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent">
          <Home className="w-5 h-5" />
          <span>Home</span>
        </Link>
        <Link href="/profile" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent">
          <User className="w-5 h-5" />
          <span>Profile</span>
        </Link>
        <Link href="/settings" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>
      </nav>
      <div className="pt-4 mt-4 border-t border-border">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent w-full"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
