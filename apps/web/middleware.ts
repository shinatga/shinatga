// NextAuth 미들웨어 - 현재 비활성화됨
// import { auth } from "@/lib/auth";

// export default auth((req) => {
//   // Add custom middleware logic here if needed
// });

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };

// 임시로 아무 작업도 하지 않는 미들웨어
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
