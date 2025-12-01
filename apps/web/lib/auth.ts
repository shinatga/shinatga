/*
 * Google OAuth 설정 가이드:
 * 1. Google Cloud Console (https://console.cloud.google.com/) 접속
 * 2. 프로젝트 생성 및 'OAuth 동의 화면' 구성 (외부 사용자)
 * 3. '사용자 인증 정보' > 'OAuth 클라이언트 ID' 만들기 (웹 애플리케이션)
 * 4. 승인된 리디렉션 URI에 추가: http://localhost:3000/api/auth/callback/google
 * 5. 발급받은 클라이언트 ID와 Secret을 .env 파일에 설정:
 *    GOOGLE_CLIENT_ID=...
 *    GOOGLE_CLIENT_SECRET=...
 *    AUTH_SECRET=... (openssl rand -base64 32 로 생성)
 */

import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@shinatga/database";
import Google from "next-auth/providers/google";
import { authConfig } from "@/auth.config";

// 환경 변수 체크 및 디버깅
const missingEnvs: string[] = [];
if (!process.env.GOOGLE_CLIENT_ID) missingEnvs.push("GOOGLE_CLIENT_ID");
if (!process.env.GOOGLE_CLIENT_SECRET) missingEnvs.push("GOOGLE_CLIENT_SECRET");
if (!process.env.AUTH_SECRET) missingEnvs.push("AUTH_SECRET");

if (missingEnvs.length > 0) {
  console.error("❌ [NextAuth] 다음 환경 변수가 누락되었습니다:", missingEnvs.join(", "));
} else {
  console.log("✅ [NextAuth] 필수 환경 변수가 모두 확인되었습니다.");
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    ...authConfig.callbacks,
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});
