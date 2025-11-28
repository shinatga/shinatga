import { NextResponse } from "next/server";
import { prisma } from "@shinatga/database";
import { defaultTemplates } from "@shinatga/templates";

// POST /api/seed - 기본 템플릿 시딩 (개발/관리용)
export async function POST() {
  try {
    const results = [];

    for (const template of defaultTemplates) {
      // 이미 존재하는지 확인
      const existing = await prisma.template.findFirst({
        where: {
          name: template.name,
          isDefault: true
        }
      });

      if (existing) {
        // 기존 템플릿을 새 필드 구조로 업데이트
        const updated = await prisma.template.update({
          where: { id: existing.id },
          data: {
            fields: template.fields,
            description: template.description,
            icon: template.icon,
            color: template.color,
          },
        });
        results.push({ action: "updated", template: updated.name });
      } else {
        // 새 템플릿 생성
        const created = await prisma.template.create({
          data: {
            name: template.name,
            description: template.description,
            type: template.type,
            icon: template.icon,
            color: template.color,
            isDefault: template.isDefault,
            isPublic: template.isPublic,
            fields: template.fields,
          },
        });
        results.push({ action: "created", template: created.name });
      }
    }

    return NextResponse.json({
      message: "템플릿 시딩이 완료되었습니다.",
      results,
    });
  } catch (error) {
    console.error("템플릿 시딩 에러:", error);
    return NextResponse.json(
      { error: "템플릿 시딩에 실패했습니다.", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
