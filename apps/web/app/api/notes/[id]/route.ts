import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@shinatga/database";

// GET /api/notes/[id] - 특정 노트 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const note = await prisma.note.findUnique({
      where: { id },
      include: {
        template: true,
        tags: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!note) {
      return NextResponse.json(
        { error: "노트를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json(note);
  } catch (error) {
    console.error("노트 조회 에러:", error);
    return NextResponse.json(
      { error: "노트를 불러오는데 실패했습니다." },
      { status: 500 }
    );
  }
}

// PATCH /api/notes/[id] - 노트 수정
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, content, tags, category, isFavorite, isPinned, isArchived } = body;

    // 노트 존재 확인
    const existingNote = await prisma.note.findUnique({
      where: { id },
    });

    if (!existingNote) {
      return NextResponse.json(
        { error: "노트를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;
    if (category !== undefined) updateData.category = category;
    if (isFavorite !== undefined) updateData.isFavorite = isFavorite;
    if (isPinned !== undefined) updateData.isPinned = isPinned;
    if (isArchived !== undefined) updateData.isArchived = isArchived;

    // 태그 처리
    if (tags) {
      const tagConnections = await Promise.all(
        tags.map(async (tagName: string) => {
          const tag = await prisma.tag.upsert({
            where: { name: tagName },
            update: {},
            create: { name: tagName },
          });
          return { id: tag.id };
        })
      );

      updateData.tags = {
        set: tagConnections,
      };
    }

    const note = await prisma.note.update({
      where: { id },
      data: updateData,
      include: {
        template: true,
        tags: true,
      },
    });

    return NextResponse.json(note);
  } catch (error) {
    console.error("노트 수정 에러:", error);
    return NextResponse.json(
      { error: "노트를 수정하는데 실패했습니다." },
      { status: 500 }
    );
  }
}

// DELETE /api/notes/[id] - 노트 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // 노트 존재 확인
    const existingNote = await prisma.note.findUnique({
      where: { id },
    });

    if (!existingNote) {
      return NextResponse.json(
        { error: "노트를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    await prisma.note.delete({
      where: { id },
    });

    return NextResponse.json({ message: "노트가 삭제되었습니다." });
  } catch (error) {
    console.error("노트 삭제 에러:", error);
    return NextResponse.json(
      { error: "노트를 삭제하는데 실패했습니다." },
      { status: 500 }
    );
  }
}

