# @shinatga/database

Prisma를 사용하는 데이터베이스 패키지입니다.

## 설정

### 1. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/shinatga?schema=public"
```

PostgreSQL 데이터베이스를 사용합니다. 로컬 개발 환경에서는 Docker를 사용하는 것을 권장합니다:

```bash
# Docker로 PostgreSQL 실행
docker run --name shinatga-db \
  -e POSTGRES_USER=shinatga \
  -e POSTGRES_PASSWORD=shinatga \
  -e POSTGRES_DB=shinatga \
  -p 5432:5432 \
  -d postgres:16
```

그 다음 `.env` 파일:

```env
DATABASE_URL="postgresql://shinatga:shinatga@localhost:5432/shinatga?schema=public"
```

### 2. Prisma Client 생성

```bash
pnpm db:generate
```

### 3. 데이터베이스 스키마 푸시

```bash
pnpm db:push
```

### 4. 시드 데이터 생성

기본 템플릿을 데이터베이스에 추가합니다:

```bash
pnpm db:seed
```

## 사용 가능한 명령어

- `pnpm db:generate` - Prisma Client 생성
- `pnpm db:push` - 데이터베이스 스키마 푸시 (개발용)
- `pnpm db:migrate` - 마이그레이션 생성 및 실행 (프로덕션용)
- `pnpm db:studio` - Prisma Studio 실행 (데이터베이스 GUI)
- `pnpm db:seed` - 시드 데이터 삽입

## 스키마 구조

### User
사용자 정보 및 인증 관련 데이터

### Template
노트 템플릿 (설교, 묵상, 기도 등)

### Note
사용자가 작성한 노트

### Tag
노트에 부여할 수 있는 태그

## 개발 워크플로우

1. `schema.prisma` 파일 수정
2. `pnpm db:push` 실행 (개발 환경)
3. `pnpm db:generate` 실행 (Prisma Client 재생성)

프로덕션 배포 시에는 `pnpm db:migrate`를 사용하여 마이그레이션을 관리하세요.

## Prisma Studio

데이터베이스를 시각적으로 관리하려면:

```bash
pnpm db:studio
```

브라우저에서 `http://localhost:5555`가 열립니다.

