import { Sprout, BookOpen, BookA, MessageCircleMore } from "lucide-react";

// 페이지별 텍스트 상수
export const PAGES = {
  home: {
    hero: {
      title: "시냇가",
      icon: Sprout,
      description: "노트, 제목을 체계적으로 관리하는",
      subtitle: "템플릿 기반 노트 앱",
    },
    cta: {
      start: "시작하기",
      register: "회원가입",
    },
    features: [
      {
        icon: BookOpen,
        title: "예배 말씀",
        description: "설교 제목, 본문, 적용점을 구조화하여 기록",
      },
      {
        icon: BookA,
        title: "묵상 노트",
        description: "관찰, 해석, 적용, 기도의 체계적인 묵상",
      },
      {
        icon: MessageCircleMore,
        title: "기도 제목",
        description: "기도 제목과 응답을 추적하고 관리",
      },
    ],
  },
  auth: {
    login: {
      title: "시냇가에 오신 것을 환영합니다",
      subtitle: "로그인하여 시작하세요",
      button: "이메일로 로그인",
      divider: "또는",
      noAccount: "계정이 없으신가요?",
      registerLink: "회원가입",
    },
    register: {
      title: "계정 만들기",
      subtitle: "시냇가와 함께 묵상을 시작하세요",
      button: "이메일로 가입하기",
      divider: "또는",
      hasAccount: "이미 계정이 있으신가요?",
      loginLink: "로그인",
    },
  },
  notes: {
    title: "노트",
    subtitle: "나의 묵상과 기도를 기록하세요",
    newNote: "새 노트 작성",
    recentNotes: "최근 노트",
    empty: "아직 작성된 노트가 없습니다.",
  },
  templates: {
    title: "템플릿",
    subtitle: "노트 템플릿을 관리하고 커스터마이징하세요",
    newTemplate: "새 템플릿 만들기",
    defaultTemplates: "기본 템플릿",
    customTemplates: "나만의 템플릿",
    empty: "아직 커스텀 템플릿이 없습니다.",
    fields: "개 필드",
  },
  settings: {
    title: "설정",
    subtitle: "앱 설정을 관리하세요",
    sections: {
      profile: {
        title: "프로필",
        description: "계정 정보를 관리합니다",
        status: "프로필 설정 준비 중...",
      },
      notifications: {
        title: "알림",
        description: "알림 설정을 관리합니다",
        status: "알림 설정 준비 중...",
      },
      theme: {
        title: "테마",
        description: "앱 테마를 설정합니다",
        status: "테마 설정 준비 중...",
      },
    },
  },
} as const;
