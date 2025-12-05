"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu } from "lucide-react";
import { APP, NAVIGATION } from "@/lib/constants";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  ThemeToggle,
  Button,
} from "@shinatga/ui";
import { useThemeStore } from "@/lib/stores/theme-store";
import { useSession, signOut } from "next-auth/react";

export function MobileHeader() {
  const [open, setOpen] = useState(false);
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const { data: session } = useSession();

  const handleNavClick = () => {
    setOpen(false);
  };

  return (
    <header className="md:hidden sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 px-4 shadow-sm">
      <div className="flex items-center gap-2.5">
        <APP.icon className="h-6 w-6" />
        <span className="text-lg font-bold">{APP.name}</span>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Menu className="h-5 w-5" />
            <span className="sr-only">메뉴 열기</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] p-0">
          <SheetHeader className="p-6 pb-4 border-b">
            <SheetTitle className="flex items-center gap-2.5">
              <APP.icon className="h-6 w-6" />
              {APP.name}
            </SheetTitle>
          </SheetHeader>

          <nav className="space-y-1 px-3 py-4 flex-1">
            {NAVIGATION.sidebar.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-accent/80 active:bg-accent transition-colors duration-200"
                >
                  <IconComponent className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* User Profile */}
          {session?.user && (
            <div className="p-3 border-t mt-auto bg-muted/30">
              <div className="flex items-center gap-3 mb-3">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    width={40}
                    height={40}
                    className="rounded-full ring-2 ring-border"
                  />
                ) : (
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-sm font-medium ring-2 ring-border">
                    {session.user.name?.[0] || "U"}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">
                    {session.user.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {session.user.email}
                  </p>
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
          <div className="p-4 border-t">
            <div className="flex items-center justify-start">
              <ThemeToggle theme={theme} onThemeChange={setTheme} />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}

