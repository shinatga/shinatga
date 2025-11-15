"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@shinatga/ui";
import { TipTapEditor } from "@shinatga/editor";
import { getNote, deleteNote, type NoteWithRelations } from "@/lib/api";
import { useDialog } from "@/hooks/useDialog";

interface NoteDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function NoteDetailPage({ params }: NoteDetailPageProps) {
  const router = useRouter();
  const { showAlert, showConfirm } = useDialog();
  const [note, setNote] = useState<NoteWithRelations | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [noteId, setNoteId] = useState<string>("");

  useEffect(() => {
    const initPage = async () => {
      const resolvedParams = await params;
      setNoteId(resolvedParams.id);
    };
    initPage();
  }, [params]);

  useEffect(() => {
    if (!noteId) return;

    const loadNote = async () => {
      try {
        const data = await getNote(noteId);
        setNote(data);
      } catch (error) {
        console.error("노트 로드 실패:", error);
        await showAlert({ description: "노트를 불러오는데 실패했습니다." });
        router.push("/notes");
      } finally {
        setIsLoading(false);
      }
    };

    loadNote();
  }, [noteId, router, showAlert]);

  const handleDelete = async () => {
    const confirmed = await showConfirm({
      description: "정말로 이 노트를 삭제하시겠습니까?"
    });
    if (!confirmed) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteNote(noteId);
      await showAlert({ description: "노트가 삭제되었습니다." });
      router.push("/notes");
    } catch (error) {
      console.error("노트 삭제 실패:", error);
      await showAlert({ description: "노트를 삭제하는데 실패했습니다." });
      setIsDeleting(false);
    }
  };

  const handleEdit = () => {
    router.push(`/notes/${noteId}/edit`);
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="container py-8 max-w-5xl mx-auto">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">로딩 중...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!note) {
    return null;
  }

  return (
    <div className="container py-8 max-w-5xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => router.push("/notes")}>
            ← 목록
          </Button>
          {note.template && (
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{note.template.icon}</span>
                <span className="text-sm text-muted-foreground">
                  {note.template.name}
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleEdit}>
            수정
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "삭제 중..." : "삭제"}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">{note.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>작성: {formatDate(note.createdAt)}</span>
            {note.updatedAt !== note.createdAt && (
              <span>수정: {formatDate(note.updatedAt)}</span>
            )}
          </div>
          {note.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {note.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="text-sm px-3 py-1 bg-muted rounded-full"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8">
          <TipTapEditor
            content={note.content}
            editable={false}
            showMenuBar={false}
          />
        </div>
      </div>
    </div>
  );
}

