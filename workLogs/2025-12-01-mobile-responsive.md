# 2025-12-01 모바일 반응형 개선

## 작업 내용

### 1. shadcn/ui Sheet 컴포넌트 추가
- `packages/ui/src/components/sheet.tsx` 파일 생성
- radix-ui의 Dialog 기반 Sheet 컴포넌트 구현
- 모바일 사이드 메뉴용 UI 컴포넌트 추가

### 2. MobileHeader 컴포넌트 구현
- `apps/web/components/MobileHeader.tsx` 파일 생성
- 햄버거 메뉴 버튼과 Sheet를 활용한 모바일 네비게이션 구현
- 로고, 메뉴 항목, 사용자 정보 표시
- 모바일에서만 표시되도록 `md:hidden` 적용

### 3. Lnb 컴포넌트 수정
- 기존 데스크탑 사이드바를 모바일에서 숨김 처리 (`hidden md:flex`)
- 데스크탑 환경에만 표시되도록 변경

### 4. 레이아웃 통합
- `apps/web/app/(dashboard)/layout.tsx`에서 MobileHeader 추가
- MobileHeader와 Lnb가 함께 작동하도록 구성

### 5. 아이콘 리소스 추가
- `apps/web/app/icons/` 디렉토리 생성
- `hamburger.svg` 햄버거 메뉴 아이콘 추가

### 6. 파비콘 및 아이콘 설정
- `apps/web/app/icon.tsx`: 앱 아이콘 동적 생성 (텍스트 기반)
- `apps/web/app/apple-icon.tsx`: Apple 디바이스용 아이콘 동적 생성
- ImageResponse를 활용한 동적 아이콘 생성

## 기술적 세부사항

### 컴포넌트 구조
```
MobileHeader (모바일 전용)
├─ Sheet (shadcn/ui)
│  ├─ SheetTrigger (햄버거 메뉴 버튼)
│  └─ SheetContent
│     ├─ 로고
│     ├─ 네비게이션 메뉴
│     └─ 사용자 정보

Lnb (데스크탑 전용)
├─ 사이드바 레이아웃
├─ 네비게이션 메뉴
└─ 사용자 정보
```

### Tailwind 반응형 적용
- 모바일 우선 (Mobile First) 접근
- `md:` 브레이크포인트(768px)를 기준으로 분기
  - 모바일: MobileHeader 표시
  - 데스크탑: Lnb 표시

## 테스트 결과
- ✅ 타입 체크 통과 (`pnpm exec tsc --noEmit`)
- ✅ 모바일 환경에서 Sheet 메뉴 동작
- ✅ 데스크탑 환경에서 기존 사이드바 유지

## 다음 작업 고려사항
- [ ] Sheet 메뉴 애니메이션 개선 (필요시)
- [ ] 메뉴 활성화 상태 표시 개선
- [ ] 다크 모드 지원 확인
