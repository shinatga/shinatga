import Link from "next/link";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from "@shinatga/ui";
import { PAGES } from "@/lib/constants";
import { getNotesServer } from "@/lib/api/server";
import { TemplateIcon } from "@/components/TemplateIcon";

export const dynamic = 'force-dynamic';

const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default async function NotesPage() {
  const { notes: notesLabels } = PAGES;
  
  // 서버에서 직접 데이터 가져오기
  const { notes } = await getNotesServer({ limit: 20 });

  return (
    <div className="container py-6 sm:py-8">
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">{notesLabels.title}</h1>
            <p className="text-sm sm:text-base text-muted-foreground">{notesLabels.subtitle}</p>
          </div>
          <Link href="/notes/new" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto">{notesLabels.newNote}</Button>
          </Link>
        </div>

        <div className="mt-6 sm:mt-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">{notesLabels.recentNotes}</h2>
          {notes.length === 0 ? (
            <Card>
              <CardContent className="py-8 sm:py-12 text-center">
                <p className="text-muted-foreground mb-4">{notesLabels.empty}</p>
                <Link href="/notes/new">
                  <Button>첫 노트 작성하기</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {notes.map((note) => (
                <Link key={note.id} href={`/notes/${note.id}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full active:scale-[0.98]">
                    <CardHeader className="p-4 sm:p-6">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="text-xl sm:text-2xl">
                          <TemplateIcon iconName={note.template?.icon} className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(note.createdAt)}
                        </span>
                      </div>
                      <CardTitle className="line-clamp-1 text-base sm:text-lg">{note.title}</CardTitle>
                      <CardDescription className="line-clamp-2 text-sm">
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
