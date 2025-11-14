import { FileText, ClipboardList, Settings } from "lucide-react";

// 네비게이션 관련 상수
export const NAVIGATION = {
  sidebar: [
    {
      href: "/notes",
      icon: FileText,
      label: "노트",
    },
    {
      href: "/templates",
      icon: ClipboardList,
      label: "템플릿",
    },
    {
      href: "/settings",
      icon: Settings,
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
