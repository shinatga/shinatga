// 네비게이션 관련 상수
export const NAVIGATION = {
  sidebar: [
    {
      href: "/notes",
      icon: "📝",
      label: "노트",
    },
    {
      href: "/templates",
      icon: "📋",
      label: "템플릿",
    },
    {
      href: "/settings",
      icon: "⚙️",
      label: "설정",
    },
  ],
} as const;

export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  notes: "/notes",
  templates: "/templates",
  settings: "/settings",
} as const;
