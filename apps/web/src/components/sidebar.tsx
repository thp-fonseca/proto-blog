import Link from "next/link";
import { Home, User, Settings, LogOut } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-64 bg-card text-card-foreground p-4 space-y-4">
      <nav className="space-y-2">
        <Link
          href="/feed"
          className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent"
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </Link>
        <Link
          href="/profile"
          className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent"
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </Link>
        <Link
          href="/settings"
          className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent"
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>
      </nav>
      <div className="pt-4 mt-4 border-t border-border">
        <Link href="/api/auth/sign-out">
          <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent w-full">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </Link>
      </div>
    </aside>
  );
}
