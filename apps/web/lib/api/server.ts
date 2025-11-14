import { prisma } from "@shinatga/database";
import type { Note, Template, Tag } from "@shinatga/database";

export interface NoteWithRelations extends Note {
  template: Template | null;
  tags: Tag[];
}

export interface NotesListParams {
  templateId?: string;
  isFavorite?: boolean;
  isPinned?: boolean;
  isArchived?: boolean;
  limit?: number;
  offset?: number;
}

export interface NotesListResponse {
  notes: NoteWithRelations[];
  total: number;
  limit: number;
  offset: number;
}

/**
 * 서버 사이드에서 노트 목록 조회
 * Server Components에서 직접 Prisma를 사용하여 데이터 가져오기
 */
export async function getNotesServer(
  params?: NotesListParams
): Promise<NotesListResponse> {
  const {
    templateId,
    isFavorite,
    isPinned,
    isArchived,
    limit = 50,
    offset = 0,
  } = params || {};

  const where: any = {};

  // TODO: 인증 구현 후 userId 필터 추가
  // where.userId = session.user.id;

  if (templateId) where.templateId = templateId;
  if (isFavorite !== undefined) where.isFavorite = isFavorite;
  if (isPinned !== undefined) where.isPinned = isPinned;
  if (isArchived !== undefined) where.isArchived = isArchived;

  const [notes, total] = await Promise.all([
    prisma.note.findMany({
      where,
      include: {
        template: true,
        tags: true,
      },
      orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
      take: limit,
      skip: offset,
    }),
    prisma.note.count({ where }),
  ]);

  return {
    notes,
    total,
    limit,
    offset,
  };
}

/**
 * 서버 사이드에서 특정 노트 조회
 */
export async function getNoteServer(id: string): Promise<NoteWithRelations> {
  const note = await prisma.note.findUnique({
    where: { id },
    include: {
      template: true,
      tags: true,
    },
  });

  if (!note) {
    throw new Error("노트를 찾을 수 없습니다.");
  }

  return note;
}

