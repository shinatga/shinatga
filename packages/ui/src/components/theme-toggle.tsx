"use client";

import { Sun, Moon, Monitor } from "lucide-react";
import { Button } from "./button";
import { cn } from "../lib/utils";

type Theme = "light" | "dark" | "system";

interface ThemeToggleProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  className?: string;
}

const THEME_CONFIG = {
  light: {
    icon: Sun,
    label: "라이트 모드",
    next: "dark" as Theme,
  },
  dark: {
    icon: Moon,
    label: "다크 모드",
    next: "system" as Theme,
  },
  system: {
    icon: Monitor,
    label: "시스템 설정",
    next: "light" as Theme,
  },
} as const;

export function ThemeToggle({
  theme,
  onThemeChange,
  className,
}: ThemeToggleProps) {
  const config = THEME_CONFIG[theme];

  const handleToggle = () => {
    onThemeChange(config.next);
  };

  const IconComponent = config.icon;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className={cn("relative", className)}
      title={config.label}
    >
      <IconComponent className="h-5 w-5" aria-label={config.label} />
    </Button>
  );
}

/**
 * 3가지 모드를 선택할 수 있는 확장형 테마 토글
 */
export function ThemeToggleExpanded({
  theme,
  onThemeChange,
  className,
}: ThemeToggleProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {(Object.keys(THEME_CONFIG) as Theme[]).map((mode) => {
        const config = THEME_CONFIG[mode];
        const isActive = theme === mode;

        const IconComponent = config.icon;

        return (
          <Button
            key={mode}
            variant={isActive ? "secondary" : "ghost"}
            size="sm"
            onClick={() => onThemeChange(mode)}
            className="justify-start gap-3"
          >
            <IconComponent className="h-4 w-4" />
            <span className="text-sm">{config.label}</span>
          </Button>
        );
      })}
    </div>
  );
}
