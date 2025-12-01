import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@shinatga/database";
import { auth } from "@/lib/auth";

// GET /api/templates - 템플릿 목록 조회
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type");
    const isDefault = searchParams.get("isDefault");

    const where: any = {};

    // 기본 템플릿만 조회하는 경우 (인증 불필요)
    if (isDefault === "true") {
      where.isDefault = true;
      if (type) where.type = type;

      const templates = await prisma.template.findMany({
        where,
        orderBy: [
          { createdAt: "desc" },
        ],
      });

      return NextResponse.json(templates);
    }

    // 커스텀 템플릿 조회 시에는 인증 필요
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 }
      );
    }

    // 기본 템플릿 또는 본인이 만든 템플릿만 조회
    where.OR = [
      { isDefault: true },
      { userId: session.user.id },
    ];

    if (type) where.type = type;

    const templates = await prisma.template.findMany({
      where,
      orderBy: [
        { isDefault: "desc" },
        { createdAt: "desc" },
      ],
    });

    return NextResponse.json(templates);
  } catch (error) {
    console.error("템플릿 목록 조회 에러:", error);
    return NextResponse.json(
      { error: "템플릿 목록을 불러오는데 실패했습니다." },
      { status: 500 }
    );
  }
}

// POST /api/templates - 커스텀 템플릿 생성
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, description, type, fields, icon, color } = body;

    if (!name || !type || !fields) {
      return NextResponse.json(
        { error: "이름, 타입, 필드는 필수입니다." },
        { status: 400 }
      );
    }

    const template = await prisma.template.create({
      data: {
        name,
        description,
        type,
        fields,
        icon,
        color,
        userId: session.user.id,
        isDefault: false,
        isPublic: false,
      },
    });

    return NextResponse.json(template, { status: 201 });
  } catch (error) {
    console.error("템플릿 생성 에러:", error);
    return NextResponse.json(
      { error: "템플릿을 생성하는데 실패했습니다." },
      { status: 500 }
    );
  }
}

