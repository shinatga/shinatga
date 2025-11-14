import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@shinatga/database";

// GET /api/templates/[id] - 특정 템플릿 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const template = await prisma.template.findUnique({
      where: { id },
    });

    if (!template) {
      return NextResponse.json(
        { error: "템플릿을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json(template);
  } catch (error) {
    console.error("템플릿 조회 에러:", error);
    return NextResponse.json(
      { error: "템플릿을 불러오는데 실패했습니다." },
      { status: 500 }
    );
  }
}

// PATCH /api/templates/[id] - 템플릿 수정
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // 기본 템플릿은 수정 불가
    const existingTemplate = await prisma.template.findUnique({
      where: { id },
    });

    if (!existingTemplate) {
      return NextResponse.json(
        { error: "템플릿을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    if (existingTemplate.isDefault) {
      return NextResponse.json(
        { error: "기본 템플릿은 수정할 수 없습니다." },
        { status: 403 }
      );
    }

    const template = await prisma.template.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(template);
  } catch (error) {
    console.error("템플릿 수정 에러:", error);
    return NextResponse.json(
      { error: "템플릿을 수정하는데 실패했습니다." },
      { status: 500 }
    );
  }
}

// DELETE /api/templates/[id] - 템플릿 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // 기본 템플릿은 삭제 불가
    const existingTemplate = await prisma.template.findUnique({
      where: { id },
    });

    if (!existingTemplate) {
      return NextResponse.json(
        { error: "템플릿을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    if (existingTemplate.isDefault) {
      return NextResponse.json(
        { error: "기본 템플릿은 삭제할 수 없습니다." },
        { status: 403 }
      );
    }

    await prisma.template.delete({
      where: { id },
    });

    return NextResponse.json({ message: "템플릿이 삭제되었습니다." });
  } catch (error) {
    console.error("템플릿 삭제 에러:", error);
    return NextResponse.json(
      { error: "템플릿을 삭제하는데 실패했습니다." },
      { status: 500 }
    );
  }
}

