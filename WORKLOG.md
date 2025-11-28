# Worklog

## 2025-11-28

### 템플릿 기능 구현

**작업 내용:**
- 예배 노트 및 묵상 노트 템플릿 추가
- 템플릿 기반 동적 폼 렌더링 구현

**변경 파일:**

1. **템플릿 정의 수정**
   - `packages/templates/src/defaults/sermon.ts`: 예배 노트 템플릿으로 전면 개편
     - 필드 9개 → 6개로 축소 (예배 날짜, 예배 종류, 설교 제목, 본문 말씀, 설교자, 노트)
     - 예배 종류 select 필드 추가
     - rich-text는 마지막 노트 필드만 사용

   - `packages/templates/src/defaults/meditation.ts`: 묵상 노트 템플릿으로 전면 개편
     - 필드 8개 → 6개로 축소 (날짜, 본문 말씀, 관찰, 해석, 적용, 기도)
     - 관찰/해석/적용은 textarea로 변경
     - 기도 필드만 rich-text 사용

2. **새 컴포넌트 추가**
   - `apps/web/components/TemplateFieldRenderer.tsx`: 템플릿 필드 렌더러
     - 6가지 필드 타입 지원 (text, textarea, date, select, scripture, rich-text)
     - 필수 필드 표시, description 지원, 에러 메시지 표시

3. **노트 작성 페이지 개선**
   - `apps/web/app/(dashboard)/notes/new/page.tsx`: 동적 폼 렌더링 로직 추가
     - 템플릿 선택 시 필드 기반 폼 자동 생성
     - 필드값 검증 로직 추가
     - 템플릿 데이터 → HTML 변환 로직 구현
     - 자유 작성 모드 유지

**기술적 개선:**
- TypeScript 타입 안전성 확보
- 모든 타입 체크 통과
- 기존 기능과 100% 호환성 유지
