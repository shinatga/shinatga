"use client";

import { useThemeStore } from "@/lib/stores/theme-store";
import { useEffect } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const resolvedTheme = useThemeStore((state) => state.resolvedTheme);

  useEffect(() => {
    const root = document.documentElement;

    // 이전 테마 클래스 제거
    root.classList.remove("light", "dark");

    // 새로운 테마 클래스 추가
    root.classList.add(resolvedTheme);
  }, [resolvedTheme]);

  return <>{children}</>;
}

/**
 * 초기 로드 시 깜빡임 방지 스크립트
 * <head>에 삽입하여 JavaScript 로드 전에 테마를 적용
 */
export function ThemeScript() {
  const themeScript = `
    (function() {
      try {
        const stored = localStorage.getItem('shinatga-theme');
        const theme = stored ? JSON.parse(stored).state.theme : 'dark';

        const getSystemTheme = () => {
          return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        };

        const resolvedTheme = theme === 'system' ? getSystemTheme() : theme;

        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(resolvedTheme);
      } catch (e) {
        // 기본값: 다크 모드
        document.documentElement.classList.add('dark');
      }
    })();
  `;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: themeScript }}
      suppressHydrationWarning
    />
  );
}
