"use client";

import Link from "next/link";
import { APP, NAVIGATION } from "@/lib/constants";
import { ThemeToggle } from "@shinatga/ui";
import { useThemeStore } from "@/lib/stores/theme-store";

export function Lnb() {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

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

      {/* Theme Toggle */}
      <div className="p-3 border-t">
        <div className="flex items-center justify-start">
          <ThemeToggle theme={theme} onThemeChange={setTheme} />
        </div>
      </div>
    </aside>
  );
}
