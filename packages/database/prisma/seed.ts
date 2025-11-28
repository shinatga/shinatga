import { PrismaClient } from "@prisma/client";
import { defaultTemplates } from "@shinatga/templates";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 데이터베이스 시딩 시작...");

  // 기본 템플릿 생성 (packages/templates에서 가져옴)
  const templates = defaultTemplates;

  for (const template of templates) {
    // 이미 존재하는지 확인
    const existing = await prisma.template.findFirst({
      where: {
        name: template.name,
        isDefault: true
      }
    });

    if (existing) {
      console.log(`⏭️  템플릿 이미 존재: ${template.name}`);
      // 기존 템플릿을 새 필드 구조로 업데이트
      await prisma.template.update({
        where: { id: existing.id },
        data: {
          fields: template.fields,
          description: template.description,
          icon: template.icon,
          color: template.color,
        },
      });
      console.log(`🔄 템플릿 업데이트: ${template.name}`);
      continue;
    }

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
    console.log(`✅ 템플릿 생성: ${created.name}`);
  }

  console.log("✨ 시딩 완료!");
}

main()
  .catch((e) => {
    console.error("❌ 시딩 에러:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

