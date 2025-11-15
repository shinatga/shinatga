import type { Note, Template, Tag } from "@shinatga/database";

export interface NoteWithRelations extends Note {
  template: Template | null;
  tags: Tag[];
}

export interface CreateNoteData {
  title: string;
  content: string; // HTML string
  templateId?: string;
  tags?: string[];
  category?: string;
}

export interface UpdateNoteData {
  title?: string;
  content?: string; // HTML string
  tags?: string[];
  category?: string;
  isFavorite?: boolean;
  isPinned?: boolean;
  isArchived?: boolean;
}

export interface NotesListResponse {
  notes: NoteWithRelations[];
  total: number;
  limit: number;
  offset: number;
}

export interface NotesListParams {
  templateId?: string;
  isFavorite?: boolean;
  isPinned?: boolean;
  isArchived?: boolean;
  limit?: number;
  offset?: number;
}

// 노트 목록 조회
export async function getNotes(params?: NotesListParams): Promise<NotesListResponse> {
  const searchParams = new URLSearchParams();
  
  if (params?.templateId) searchParams.set("templateId", params.templateId);
  if (params?.isFavorite !== undefined) searchParams.set("isFavorite", String(params.isFavorite));
  if (params?.isPinned !== undefined) searchParams.set("isPinned", String(params.isPinned));
  if (params?.isArchived !== undefined) searchParams.set("isArchived", String(params.isArchived));
  if (params?.limit) searchParams.set("limit", String(params.limit));
  if (params?.offset) searchParams.set("offset", String(params.offset));

  const response = await fetch(`/api/notes?${searchParams.toString()}`);
  
  if (!response.ok) {
    throw new Error("노트 목록을 불러오는데 실패했습니다.");
  }

  return response.json();
}

// 특정 노트 조회
export async function getNote(id: string): Promise<NoteWithRelations> {
  const response = await fetch(`/api/notes/${id}`);
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("노트를 찾을 수 없습니다.");
    }
    throw new Error("노트를 불러오는데 실패했습니다.");
  }

  return response.json();
}

// 노트 생성
export async function createNote(data: CreateNoteData): Promise<NoteWithRelations> {
  const response = await fetch("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "노트를 생성하는데 실패했습니다.");
  }

  return response.json();
}

// 노트 수정
export async function updateNote(id: string, data: UpdateNoteData): Promise<NoteWithRelations> {
  const response = await fetch(`/api/notes/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "노트를 수정하는데 실패했습니다.");
  }

  return response.json();
}

// 노트 삭제
export async function deleteNote(id: string): Promise<void> {
  const response = await fetch(`/api/notes/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "노트를 삭제하는데 실패했습니다.");
  }
}

// 노트 즐겨찾기 토글
export async function toggleNoteFavorite(id: string, isFavorite: boolean): Promise<NoteWithRelations> {
  return updateNote(id, { isFavorite });
}

// 노트 고정 토글
export async function toggleNotePin(id: string, isPinned: boolean): Promise<NoteWithRelations> {
  return updateNote(id, { isPinned });
}

// 노트 아카이브 토글
export async function toggleNoteArchive(id: string, isArchived: boolean): Promise<NoteWithRelations> {
  return updateNote(id, { isArchived });
}

