import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@shinatga/database";
import { auth } from "@/lib/auth";

// GET /api/notes - 노트 목록 조회
export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const templateId = searchParams.get("templateId");
    const isFavorite = searchParams.get("isFavorite");
    const isPinned = searchParams.get("isPinned");
    const isArchived = searchParams.get("isArchived");
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    const where: any = {
      userId: session.user.id,
    };

    if (templateId) where.templateId = templateId;
    if (isFavorite !== null) where.isFavorite = isFavorite === "true";
    if (isPinned !== null) where.isPinned = isPinned === "true";
    if (isArchived !== null) where.isArchived = isArchived === "true";

    const [notes, total] = await Promise.all([
      prisma.note.findMany({
        where,
        include: {
          template: true,
          tags: true,
        },
        orderBy: [
          { isPinned: "desc" },
          { createdAt: "desc" },
        ],
        take: limit,
        skip: offset,
      }),
      prisma.note.count({ where }),
    ]);

    return NextResponse.json({
      notes,
      total,
      limit,
      offset,
    });
  } catch (error) {
    console.error("노트 목록 조회 에러:", error);
    return NextResponse.json(
      { error: "노트 목록을 불러오는데 실패했습니다." },
      { status: 500 }
    );
  }
}

// POST /api/notes - 노트 생성
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
    const { title, content, templateId, tags, category } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "제목과 내용은 필수입니다." },
        { status: 400 }
      );
    }

    // 태그 처리
    const tagConnections = tags
      ? await Promise.all(
        tags.map(async (tagName: string) => {
          const tag = await prisma.tag.upsert({
            where: { name: tagName },
            update: {},
            create: { name: tagName },
          });
          return { id: tag.id };
        })
      )
      : [];

    const note = await prisma.note.create({
      data: {
        title,
        content,
        templateId: templateId || null,
        userId: session.user.id,
        category,
        tags: {
          connect: tagConnections,
        },
      },
      include: {
        template: true,
        tags: true,
      },
    });

    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    console.error("노트 생성 에러:", error);
    return NextResponse.json(
      { error: "노트를 생성하는데 실패했습니다." },
      { status: 500 }
    );
  }
}

