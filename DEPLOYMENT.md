# Vercel 배포 가이드

Shinatga 프로젝트를 Vercel에 배포하는 상세한 가이드입니다.

## 📋 사전 준비사항

- ✅ GitHub 계정
- ✅ Vercel 계정 (https://vercel.com)
- ✅ 프로젝트가 GitHub에 푸시되어 있어야 함

---

## 🗄️ 1단계: 데이터베이스 준비

### Option A: Vercel Postgres (추천 - 가장 쉬운 방법)

1. **Vercel 대시보드 접속**
   - https://vercel.com 로그인
   - 아직 프로젝트가 없다면 4단계 배포 후 진행

2. **Vercel Postgres 생성**
   ```
   Storage 탭 클릭
   → Create Database
   → Postgres 선택
   → Database 이름: shinatga-db (또는 원하는 이름)
   → Region: Washington, D.C., USA (iad1) 선택
   → Create 클릭
   ```

3. **환경 변수 자동 연결**
   - 생성 완료 후 "Connect to Project" 클릭
   - 프로젝트 선택
   - 환경 변수가 자동으로 추가됨

4. **비용**: 무료 플랜 - 256MB storage, 60시간 compute time/month

---

### Option B: Supabase (무료 500MB)

1. **Supabase 프로젝트 생성**
   ```
   https://supabase.com 접속
   → New Project
   → Organization 선택/생성
   → Project name: shinatga
   → Database Password 설정 (잘 보관!)
   → Region: Northeast Asia (Tokyo) 선택
   → Create Project (약 2분 소요)
   ```

2. **Connection String 가져오기**
   ```
   Settings (왼쪽 하단 톱니바퀴)
   → Database
   → Connection String 섹션
   → URI 탭 선택
   → [YOUR-PASSWORD]를 실제 비밀번호로 교체
   ```

3. **예시 형식**:
   ```
   postgresql://postgres.abcdefghijklmn:your-password@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres
   ```

---

### Option C: Railway (무료 $5 크레딧/월)

1. **Railway 프로젝트 생성**
   ```
   https://railway.app 접속
   → Start a New Project
   → Deploy PostgreSQL
   → 자동 프로비저닝 완료
   ```

2. **Connection String 가져오기**
   ```
   Variables 탭 클릭
   → DATABASE_URL 값 복사
   ```

---

## 🚀 2단계: Vercel에 프로젝트 Import

1. **Vercel 대시보드**
   ```
   https://vercel.com/dashboard
   → Add New...
   → Project
   ```

2. **Repository Import**
   ```
   Import Git Repository
   → GitHub 연동 (처음이라면 권한 허용)
   → shinatga/shinatga 검색
   → Import 클릭
   ```

3. **프로젝트 설정**
   ```
   Framework Preset: Next.js (자동 감지됨)
   Root Directory: ./ (기본값 유지)
   Build Command: pnpm build --filter=@shinatga/web (vercel.json에 이미 설정됨)
   Output Directory: apps/web/.next (vercel.json에 이미 설정됨)
   Install Command: pnpm install (vercel.json에 이미 설정됨)
   ```

---

## ⚙️ 3단계: 환경 변수 설정

### 필수 환경 변수

Vercel 프로젝트 설정 화면에서 (또는 Settings → Environment Variables):

```bash
# Database URL (1단계에서 선택한 DB의 Connection String)
DATABASE_URL=postgresql://user:password@host:5432/database

# 예시 - Vercel Postgres
DATABASE_URL=postgres://default:xxxxx@ep-xxx.us-east-1.postgres.vercel-storage.com:5432/verceldb

# 예시 - Supabase
DATABASE_URL=postgresql://postgres.xxxxx:your-password@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres

# 예시 - Railway
DATABASE_URL=postgresql://postgres:xxxxx@containers-us-west-xxx.railway.app:7XXX/railway
```

### 환경 변수 입력 방법

1. **Vercel 대시보드에서**:
   ```
   프로젝트 선택
   → Settings
   → Environment Variables
   → Add New
   ```

2. **각 변수 추가**:
   ```
   Name: DATABASE_URL
   Value: (1단계에서 복사한 Connection String)
   Environment: Production, Preview, Development (모두 선택)
   → Save
   ```

---

## 🔨 4단계: 배포 시작

### 첫 배포

1. **Deploy 버튼 클릭**
   - Import 화면에서 "Deploy" 클릭
   - 또는 프로젝트 대시보드에서 "Deploy" 클릭

2. **빌드 진행 확인**
   ```
   Building...
   → Installing dependencies (pnpm install)
   → Generating Prisma Client (postinstall)
   → Building Next.js app
   → Deploying...
   ```

3. **배포 완료**
   - 약 2-5분 소요
   - 성공 시: 🎉 "Your project has been deployed"
   - 실패 시: 로그 확인 (다음 섹션 참고)

---

## 🔧 5단계: 데이터베이스 초기화

배포 후 데이터베이스 테이블 생성이 필요합니다.

### Option A: Vercel CLI로 초기화 (추천)

1. **Vercel CLI 설치** (로컬에서):
   ```bash
   pnpm add -g vercel
   ```

2. **로그인**:
   ```bash
   vercel login
   ```

3. **프로젝트 연결**:
   ```bash
   cd /path/to/shinatga
   vercel link
   ```

4. **환경 변수 pull**:
   ```bash
   vercel env pull .env.production
   ```

5. **Prisma Push 실행**:
   ```bash
   # 프로덕션 DATABASE_URL 사용
   DATABASE_URL="$(grep DATABASE_URL .env.production | cut -d '=' -f2)" pnpm db:push --filter=@shinatga/database
   ```

### Option B: Supabase SQL Editor 사용

1. **Prisma 스키마를 SQL로 변환** (로컬에서):
   ```bash
   cd packages/database
   npx prisma migrate dev --name init --create-only
   ```

2. **생성된 migration SQL 파일 찾기**:
   ```bash
   cat prisma/migrations/*/migration.sql
   ```

3. **Supabase SQL Editor에서 실행**:
   ```
   Supabase Dashboard
   → SQL Editor
   → New Query
   → SQL 내용 붙여넣기
   → Run
   ```

### Option C: Railway CLI 사용

1. **Railway CLI 설치**:
   ```bash
   pnpm add -g @railway/cli
   ```

2. **로그인 및 연결**:
   ```bash
   railway login
   railway link
   ```

3. **Prisma Push**:
   ```bash
   railway run pnpm db:push --filter=@shinatga/database
   ```

---

## 🎯 6단계: 배포 확인

1. **사이트 접속**
   ```
   https://your-project-name.vercel.app
   ```

2. **기능 확인**
   - 노트 목록 페이지 로딩
   - 새 노트 작성
   - 노트 저장 및 조회
   - TipTap 에디터 동작

3. **문제 발생 시**
   - Vercel 대시보드 → 프로젝트 → Deployments → 최신 배포 클릭 → Logs 확인

---

## 🔄 재배포 (업데이트 시)

### 자동 배포

Git push만 하면 자동으로 배포됩니다:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

→ Vercel이 자동으로 감지하고 배포 시작

### 수동 배포

```bash
vercel --prod
```

---

## 🐛 문제 해결

### 빌드 실패 시

1. **로그 확인**:
   ```
   Vercel Dashboard → Deployments → Failed Deployment → View Function Logs
   ```

2. **흔한 오류**:

   **"Module not found"**:
   ```bash
   # 로컬에서 확인
   pnpm install
   pnpm build
   # 성공하면 git push
   ```

   **"DATABASE_URL is not defined"**:
   ```
   Vercel Dashboard
   → Settings
   → Environment Variables
   → DATABASE_URL 추가
   → Redeploy
   ```

   **"Prisma Client not generated"**:
   ```
   package.json의 postinstall 스크립트 확인
   → "postinstall": "pnpm db:generate" 존재 확인
   → Redeploy
   ```

### 런타임 에러

**"Can't reach database server"**:
- DATABASE_URL 형식 확인
- 데이터베이스 서버 작동 확인
- Vercel IP whitelist 확인 (Supabase/Railway 설정)

**"Table does not exist"**:
- 5단계 데이터베이스 초기화 다시 실행

---

## 💰 비용 안내

### Vercel
- **Hobby 플랜** (무료):
  - 프로젝트 제한 없음
  - 100GB 대역폭/월
  - Serverless Function 실행 시간: 100시간/월
  - **충분함** ✅

### 데이터베이스

1. **Vercel Postgres** (무료):
   - 256MB storage
   - 60시간 compute/월
   - **개인 프로젝트 충분** ✅

2. **Supabase** (무료):
   - 500MB storage
   - 무제한 API requests
   - **개인 프로젝트 충분** ✅

3. **Railway** (무료):
   - $5 크레딧/월
   - 약 500시간 실행 시간
   - **가벼운 사용 충분** ✅

---

## 📊 성능 최적화 (선택사항)

### 1. Edge Runtime 활성화

`apps/web/app/layout.tsx`에 추가:
```typescript
export const runtime = 'edge';
```

### 2. 이미지 최적화

`next.config.js`에 추가:
```javascript
images: {
  domains: ['your-cdn.com'],
  formats: ['image/avif', 'image/webp'],
}
```

### 3. 캐싱 설정

API Routes에 revalidate 추가:
```typescript
export const revalidate = 60; // 60초 캐시
```

---

## 🔐 보안 체크리스트

- [ ] `.env` 파일이 `.gitignore`에 포함되어 있는지 확인
- [ ] 프로덕션 DATABASE_URL에 강력한 비밀번호 사용
- [ ] Vercel 환경 변수가 올바르게 설정되었는지 확인
- [ ] API Routes에 rate limiting 고려 (향후)
- [ ] CORS 설정 확인 (필요 시)

---

## 📚 추가 리소스

- [Vercel 문서](https://vercel.com/docs)
- [Next.js 배포 가이드](https://nextjs.org/docs/deployment)
- [Prisma 프로덕션 체크리스트](https://www.prisma.io/docs/guides/deployment/deployment)
- [Turborepo Vercel 가이드](https://turbo.build/repo/docs/handbook/deploying-with-docker)

---

## 🎉 완료!

이제 Shinatga가 전 세계에서 접근 가능한 웹 앱으로 배포되었습니다!

**배포 URL**: https://your-project-name.vercel.app

궁금한 점이 있으면 Vercel 대시보드의 Logs를 확인하거나, GitHub Issues에 질문을 남겨주세요.
