# 시냇가 🌿

템플릿 기반 노트 앱 - 성경 묵상, 설교 노트, 기도 제목을 체계적으로 관리하세요

## 프로젝트 구조

```
shinatga/
├── apps/
│   └── web/                 # Next.js 15+ App Router
├── packages/
│   ├── ui/                  # 공유 UI 컴포넌트 (shadcn/ui)
│   ├── database/            # Prisma ORM
│   ├── editor/              # TipTap 에디터
│   ├── templates/           # 템플릿 시스템
│   ├── typescript-config/   # 공유 TS 설정
│   └── eslint-config/       # 공유 ESLint 설정
└── turbo.json               # Turborepo 설정
```

## 주요 기능

### 템플릿 시스템
- **커스텀 템플릿**: 나만의 템플릿 생성 가능

### WYSIWYG 에디터 (TipTap)
- 구조화된 필드 (템플릿 기반)
- 태그 및 카테고리

### 풀스택 기능
- ~~인증 (NextAuth v5)~~ - 현재 비활성화됨
- 노트 저장/검색
- 템플릿 관리
- PostgreSQL 데이터베이스

## 기술 스택

| Category | Technology |
|----------|-----------|
| Framework | Next.js 15+ (App Router) |
| Monorepo | Turborepo + pnpm |
| Database | PostgreSQL + Prisma |
| Auth | ~~NextAuth.js v5~~ (비활성화됨) |
| Editor | TipTap |
| Styling | Tailwind CSS |
| UI | shadcn/ui |
| Validation | Zod |

## 시작하기

> **참고**: 현재 NextAuth 인증 기능은 비활성화되어 있습니다. 개발 초기에는 인증 없이 모든 기능에 접근할 수 있습니다. 인증이 필요하면 다음 파일의 주석을 해제하세요:
> - `apps/web/lib/auth.ts`
> - `apps/web/middleware.ts`
> - `apps/web/app/api/auth/[...nextauth]/route.ts`

### 요구사항

- Node.js 20+
- pnpm 9+
- PostgreSQL

### 설치

```bash
# 의존성 설치
pnpm install

# 환경 변수 설정
cp apps/web/.env apps/web/.env
cp packages/database/.env packages/database/.env

# DATABASE_URL 설정
# apps/web/.env 및 packages/database/.env 파일 수정

# Prisma 클라이언트 생성
pnpm db:generate

# 데이터베이스 스키마 푸시
pnpm db:push
```

### 개발 서버 실행

```bash
# 모든 앱/패키지 개발 모드
pnpm dev

# 특정 앱만 실행
pnpm --filter @shinatga/web dev
```

### 빌드

```bash
# 전체 프로젝트 빌드
pnpm build

# 특정 앱만 빌드
pnpm --filter @shinatga/web build
```

## 데이터베이스

### Prisma Studio

```bash
pnpm db:studio
```

### 마이그레이션

```bash
pnpm --filter @shinatga/database db:migrate
```

## 스크립트

| Command | Description |
|---------|-------------|
| `pnpm dev` | 개발 서버 실행 |
| `pnpm build` | 프로덕션 빌드 |
| `pnpm lint` | 린트 검사 |
| `pnpm format` | 코드 포맷팅 |
| `pnpm type-check` | 타입 체크 |
| `pnpm db:generate` | Prisma 클라이언트 생성 |
| `pnpm db:push` | 스키마 푸시 |
| `pnpm db:studio` | Prisma Studio 실행 |

## 패키지 정보

### @shinatga/web
Next.js 14+ 메인 애플리케이션

### @shinatga/ui
재사용 가능한 UI 컴포넌트 라이브러리 (shadcn/ui 기반)

### @shinatga/database
Prisma ORM 설정 및 스키마

### @shinatga/editor
TipTap 기반 WYSIWYG 에디터 + 커스텀 익스텐션

### @shinatga/templates
템플릿 타입 정의 및 기본 템플릿

### @shinatga/typescript-config
공유 TypeScript 설정

### @shinatga/eslint-config
공유 ESLint 설정

## 라이센스

MIT