import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark" | "system";

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark";
  updateResolvedTheme: () => void;
}

const getSystemTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const getResolvedTheme = (theme: Theme): "light" | "dark" => {
  if (theme === "system") {
    return getSystemTheme();
  }
  return theme;
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: "dark", // 기본 테마: 다크 모드
      resolvedTheme: "dark",
      setTheme: (theme: Theme) => {
        set({ theme, resolvedTheme: getResolvedTheme(theme) });
      },
      updateResolvedTheme: () => {
        const { theme } = get();
        set({ resolvedTheme: getResolvedTheme(theme) });
      },
    }),
    {
      name: "shinatga-theme",
      onRehydrateStorage: () => (state) => {
        // 스토리지에서 복원된 후 시스템 테마 업데이트
        if (state) {
          state.updateResolvedTheme();
        }
      },
    }
  )
);

// 시스템 테마 변경 감지
if (typeof window !== "undefined") {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", () => {
    const store = useThemeStore.getState();
    if (store.theme === "system") {
      store.updateResolvedTheme();
    }
  });
}
