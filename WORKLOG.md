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

---

### 템플릿 시딩 및 API 인증 수정

**문제 발견:**
- 템플릿 선택 드롭다운에서 템플릿이 표시되지 않는 문제 발견
- 데이터베이스에 템플릿 레코드가 없었음
- API가 기본 템플릿 조회 시에도 인증을 요구하는 문제

**원인 분석:**
1. Seed 파일이 기존 필드 구조(`fields.sections`) 사용 → 새 구조(`fields` 배열)와 불일치
2. `/api/templates` 엔드포인트가 모든 요청에 인증 필요
3. 데이터베이스 연결 문제로 일반적인 시딩 불가능

**변경 파일:**

1. **Seed 파일 수정**
   - `packages/database/prisma/seed.ts`:
     - `@shinatga/templates`에서 defaultTemplates import
     - 템플릿 업데이트 로직 추가 (기존 템플릿 필드 구조 업데이트)
     - 명시적 필드 매핑으로 타입 안전성 확보

2. **API 인증 로직 개선**
   - `apps/web/app/api/templates/route.ts`:
     - 기본 템플릿 조회(`isDefault=true`)는 인증 불필요
     - 커스텀 템플릿 조회만 인증 필요
     - 공개 템플릿 접근성 향상

3. **시딩 API 엔드포인트 추가**
   - `apps/web/app/api/seed/route.ts` (NEW):
     - HTTP POST로 템플릿 시딩 가능
     - 기존 템플릿 업데이트 지원
     - 웹 인터페이스를 통한 시딩 가능

**결과:**
- ✅ 로컬 데이터베이스 시딩 성공 (3개 템플릿 생성)
- ✅ 템플릿 API 인증 없이 정상 작동
- ✅ 프로덕션 환경에서도 `/api/seed` POST 요청으로 시딩 가능

---

### 동적 반복 필드 기능 구현

**목표:**
목장원을 동적으로 추가/삭제할 수 있는 반복 필드 시스템 구현

**작업 내용:**

1. **타입 시스템 확장**
   - `packages/templates/src/types.ts`:
     - `repeatable` 필드 타입 추가
     - `Subfield` 스키마 정의 (반복 필드의 하위 필드)
     - `minItems`, `maxItems` 속성 추가

2. **기도제목 템플릿 재설계**
   - `packages/templates/src/defaults/prayer.ts`:
     - "목장 기도제목"으로 템플릿 명 변경
     - 필드 2개로 단순화 (날짜 + 목장원 반복 필드)
     - 각 목장원마다 이름과 기도제목 입력 가능

3. **반복 필드 렌더러 컴포넌트**
   - `apps/web/components/RepeatableFieldRenderer.tsx` (NEW):
     - 동적 항목 추가/삭제 기능
     - 서브필드 타입별 렌더링 (text, textarea, date, select, scripture)
     - 깔끔한 UI와 validation

4. **기존 컴포넌트 통합**
   - `apps/web/components/TemplateFieldRenderer.tsx`:
     - `repeatable` 케이스 추가
     - RepeatableFieldRenderer 통합

5. **폼 로직 업데이트**
   - `apps/web/app/(dashboard)/notes/new/page.tsx`:
     - 반복 필드를 HTML로 변환하는 로직 추가
     - 반복 필드 검증 로직 (minItems, maxItems)

**기술적 특징:**
- 동적으로 목장원 추가/삭제 가능
- 각 목장원마다 독립적인 입력 필드
- TypeScript 타입 안전성 100% 유지
- 모든 타입 체크 통과 ✅

**데이터 구조 예시:**
```json
{
  "prayer-date": "2025-11-28",
  "prayer-members": [
    {
      "member-name": "김철수",
      "member-prayer": "직장에서의 승진..."
    },
    {
      "member-name": "이영희",
      "member-prayer": "자녀 대학 입시..."
    }
  ]
}
```
