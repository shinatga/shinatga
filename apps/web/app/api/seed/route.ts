import { NextResponse } from "next/server";
import { prisma } from "@shinatga/database";
import { defaultTemplates } from "@shinatga/templates";

// POST /api/seed - 기본 템플릿 시딩 (개발/관리용)
export async function POST() {
  try {
    const results = [];

    for (const template of defaultTemplates) {
      // type 기준으로 모든 기존 템플릿 조회 (중복 확인)
      const existingTemplates = await prisma.template.findMany({
        where: {
          type: template.type,
          isDefault: true
        },
        orderBy: { createdAt: 'asc' } // 가장 오래된 것부터
      });

      if (existingTemplates.length > 0) {
        // 첫 번째(가장 오래된) 템플릿만 업데이트하고 나머지는 삭제
        const [keepTemplate, ...duplicates] = existingTemplates;

        // 중복 템플릿 삭제
        if (duplicates.length > 0) {
          await prisma.template.deleteMany({
            where: {
              id: { in: duplicates.map(t => t.id) }
            }
          });
          results.push({
            action: "removed_duplicates",
            count: duplicates.length,
            type: template.type
          });
        }

        // 유지할 템플릿 업데이트
        const updated = await prisma.template.update({
          where: { id: keepTemplate.id },
          data: {
            name: template.name,
            description: template.description,
            fields: template.fields,
            icon: template.icon,
            color: template.color,
          },
        });
        results.push({ action: "updated", template: `${keepTemplate.name} → ${updated.name}` });
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
