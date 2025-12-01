# 데이터베이스 설정 가이드

이 문서는 시냇가 프로젝트의 데이터베이스를 설정하는 방법을 설명합니다.

## 빠른 시작

### 1. PostgreSQL 데이터베이스 준비

#### 옵션 A: Docker 사용 (권장)

```bash
# PostgreSQL 컨테이너 실행
docker run --name shinatga-db \
  -e POSTGRES_USER=shinatga \
  -e POSTGRES_PASSWORD=shinatga \
  -e POSTGRES_DB=shinatga \
  -p 5432:5432 \
  -d postgres:16

# 컨테이너가 실행 중인지 확인
docker ps
```

#### 옵션 B: 로컬 PostgreSQL 설치

PostgreSQL을 직접 설치하고 `shinatga` 데이터베이스를 생성하세요.

### 2. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
DATABASE_URL="postgresql://shinatga:shinatga@localhost:5432/shinatga?schema=public"
```

실제 데이터베이스 연결 정보에 맞게 수정하세요.

### 3. 데이터베이스 스키마 생성

```bash
# Prisma Client 생성
pnpm db:generate

# 데이터베이스에 스키마 푸시
pnpm db:push
```

### 4. 시드 데이터 삽입

기본 템플릿을 데이터베이스에 추가합니다:

```bash
pnpm db:seed
```

다음 템플릿이 생성됩니다:
- 📖 설교 노트
- 🙏 묵상 노트
- 🕊️ 기도 노트
- ✏️ 자유 노트
- 📚 성경 공부 노트

### 5. 개발 서버 실행

```bash
pnpm dev
```

브라우저에서 `http://localhost:3000`으로 접속하여 노트를 작성해보세요!

## 데이터베이스 관리

### Prisma Studio로 데이터 확인

```bash
pnpm db:studio
```

브라우저에서 `http://localhost:5555`가 열리며, 데이터를 시각적으로 확인하고 편집할 수 있습니다.

### 스키마 변경 시

1. `packages/database/prisma/schema.prisma` 파일 수정
2. 변경사항 푸시:
   ```bash
   pnpm db:push
   ```
3. Prisma Client 재생성:
   ```bash
   pnpm db:generate
   ```

## 문제 해결

### "database doesn't exist" 에러

데이터베이스가 생성되지 않은 경우입니다. PostgreSQL에 접속하여 데이터베이스를 생성하세요:

```bash
# Docker를 사용하는 경우
docker exec -it shinatga-db psql -U shinatga -c "CREATE DATABASE shinatga;"
```

### "connection refused" 에러

PostgreSQL 서버가 실행 중인지 확인하세요:

```bash
# Docker 컨테이너 확인
docker ps

# 컨테이너가 없으면 다시 시작
docker start shinatga-db
```

### 시드 데이터 다시 실행

시드 데이터를 다시 실행하려면:

```bash
pnpm db:seed
```

중복 데이터는 자동으로 스킵됩니다 (upsert 사용).

## API 엔드포인트

데이터베이스 연동 후 다음 API를 사용할 수 있습니다:

### Notes API
- `GET /api/notes` - 노트 목록 조회
- `POST /api/notes` - 노트 생성
- `GET /api/notes/[id]` - 특정 노트 조회
- `PATCH /api/notes/[id]` - 노트 수정
- `DELETE /api/notes/[id]` - 노트 삭제

### Templates API
- `GET /api/templates` - 템플릿 목록 조회
- `POST /api/templates` - 커스텀 템플릿 생성
- `GET /api/templates/[id]` - 특정 템플릿 조회
- `PATCH /api/templates/[id]` - 템플릿 수정
- `DELETE /api/templates/[id]` - 템플릿 삭제

## 다음 단계

- [ ] 사용자 인증 구현 (NextAuth)
- [ ] 노트 검색 기능
- [ ] 노트 필터링 (템플릿별, 태그별)
- [ ] 노트 편집 페이지
- [ ] 노트 내보내기 (PDF, Markdown)

