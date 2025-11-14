"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from "@shinatga/ui";
import { PAGES } from "@/lib/constants";
import { getNotes, type NoteWithRelations } from "@/lib/api";

export default function NotesPage() {
  const { notes: notesLabels } = PAGES;
  const [notes, setNotes] = useState<NoteWithRelations[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const data = await getNotes({ limit: 20 });
        setNotes(data.notes);
      } catch (error) {
        console.error("노트 로드 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNotes();
  }, []);

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{notesLabels.title}</h1>
          <p className="text-muted-foreground">{notesLabels.subtitle}</p>
        </div>
        <Link href="/notes/new">
          <Button>{notesLabels.newNote}</Button>
        </Link>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">{notesLabels.recentNotes}</h2>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">로딩 중...</p>
            </div>
          </div>
        ) : notes.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">{notesLabels.empty}</p>
              <Link href="/notes/new">
                <Button>첫 노트 작성하기</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <Link key={note.id} href={`/notes/${note.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="text-2xl">{note.template?.icon || "📝"}</div>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(note.createdAt)}
                      </span>
                    </div>
                    <CardTitle className="line-clamp-1">{note.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {note.template?.name || "자유 노트"}
                    </CardDescription>
                    {note.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {note.tags.map((tag) => (
                          <span
                            key={tag.id}
                            className="text-xs px-2 py-1 bg-muted rounded-full"
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
