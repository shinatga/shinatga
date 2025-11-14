// NextAuth API 라우트 - 현재 비활성화됨
// import { handlers } from "@/lib/auth";
// export const { GET, POST } = handlers;

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "NextAuth is currently disabled" }, { status: 503 });
}

export async function POST() {
  return NextResponse.json({ message: "NextAuth is currently disabled" }, { status: 503 });
}
