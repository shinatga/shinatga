import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 데이터베이스 시딩 시작...");

  // 기본 템플릿 생성
  const templates = [
    {
      name: "설교 노트",
      description: "설교를 듣고 정리하는 노트",
      type: "sermon",
      icon: "📖",
      color: "#3b82f6",
      isDefault: true,
      isPublic: true,
      fields: {
        sections: [
          { id: "title", label: "제목", type: "text" },
          { id: "scripture", label: "본문 말씀", type: "scripture" },
          { id: "mainPoint", label: "핵심 메시지", type: "textarea" },
          { id: "notes", label: "설교 내용", type: "editor" },
          { id: "application", label: "적용점", type: "textarea" },
        ],
      },
    },
    {
      name: "묵상 노트",
      description: "말씀 묵상을 기록하는 노트",
      type: "meditation",
      icon: "🙏",
      color: "#8b5cf6",
      isDefault: true,
      isPublic: true,
      fields: {
        sections: [
          { id: "date", label: "날짜", type: "date" },
          { id: "scripture", label: "묵상 본문", type: "scripture" },
          { id: "observation", label: "관찰 (무엇을 보았는가?)", type: "textarea" },
          { id: "interpretation", label: "해석 (무엇을 의미하는가?)", type: "textarea" },
          { id: "application", label: "적용 (어떻게 살 것인가?)", type: "textarea" },
          { id: "prayer", label: "기도", type: "textarea" },
        ],
      },
    },
    {
      name: "기도 노트",
      description: "기도 제목과 응답을 기록하는 노트",
      type: "prayer",
      icon: "🕊️",
      color: "#10b981",
      isDefault: true,
      isPublic: true,
      fields: {
        sections: [
          { id: "date", label: "날짜", type: "date" },
          { id: "category", label: "분류", type: "select", options: ["감사", "회개", "간구", "중보"] },
          { id: "request", label: "기도 제목", type: "textarea" },
          { id: "scripture", label: "관련 말씀", type: "scripture" },
          { id: "answer", label: "응답", type: "textarea" },
          { id: "answerDate", label: "응답 날짜", type: "date" },
        ],
      },
    },
    {
      name: "자유 노트",
      description: "자유롭게 작성하는 노트",
      type: "custom",
      icon: "✏️",
      color: "#f59e0b",
      isDefault: true,
      isPublic: true,
      fields: {
        sections: [
          { id: "content", label: "내용", type: "editor" },
        ],
      },
    },
    {
      name: "성경 공부 노트",
      description: "성경 공부 내용을 정리하는 노트",
      type: "study",
      icon: "📚",
      color: "#ef4444",
      isDefault: true,
      isPublic: true,
      fields: {
        sections: [
          { id: "topic", label: "주제", type: "text" },
          { id: "scripture", label: "본문", type: "scripture" },
          { id: "background", label: "배경", type: "textarea" },
          { id: "keyVerses", label: "핵심 구절", type: "editor" },
          { id: "lessons", label: "배운 점", type: "textarea" },
          { id: "questions", label: "질문", type: "textarea" },
        ],
      },
    },
  ];

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
      continue;
    }

    const created = await prisma.template.create({
      data: template,
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

