import { auth } from "@/lib/auth";

export default auth((req) => {
  // NextAuth의 authorized 콜백에서 인증 로직 처리
  // lib/auth.ts의 callbacks.authorized 참고
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
