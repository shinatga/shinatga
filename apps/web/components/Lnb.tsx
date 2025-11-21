"use client";

import Link from "next/link";
import Image from "next/image";
import { APP, NAVIGATION } from "@/lib/constants";
import { ThemeToggle, Button } from "@shinatga/ui";
import { useThemeStore } from "@/lib/stores/theme-store";
import { useSession, signOut } from "next-auth/react";

export function Lnb() {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const { data: session } = useSession();

  return (
    <aside className="w-64 border-r bg-card flex flex-col">
      <div className="p-6 flex items-center gap-2">
        <APP.icon className="h-7 w-7" />
        <h1 className="text-2xl font-bold">{APP.name}</h1>
      </div>

      <nav className="space-y-1 px-3 flex-1">
        {NAVIGATION.sidebar.map((item) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-accent"
            >
              <IconComponent className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      {session?.user && (
        <div className="p-3 border-t">
          <div className="flex items-center gap-3 mb-3">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || "User"}
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-sm font-medium">
                {session.user.name?.[0] || "U"}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{session.user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            로그아웃
          </Button>
        </div>
      )}

      {/* Theme Toggle */}
      <div className="p-3 border-t">
        <div className="flex items-center justify-start">
          <ThemeToggle theme={theme} onThemeChange={setTheme} />
        </div>
      </div>
    </aside>
  );
}
