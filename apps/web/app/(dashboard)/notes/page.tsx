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
          <h2 className="text-lg sm:text-xl font-semibold mb-5">{notesLabels.recentNotes}</h2>
          {notes.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="py-12 sm:py-16 text-center">
                <p className="text-muted-foreground mb-6 text-base">{notesLabels.empty}</p>
                <Link href="/notes/new">
                  <Button size="lg">첫 노트 작성하기</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:gap-5 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {notes.map((note) => (
                <Link key={note.id} href={`/notes/${note.id}`} className="group">
                  <Card className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full border-border/50">
                    <CardHeader className="p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                          <TemplateIcon iconName={note.template?.icon} className="w-6 h-6 sm:w-7 sm:h-7 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                        </div>
                        <span className="text-xs font-medium text-muted-foreground/80 bg-muted/30 px-2.5 py-1 rounded-md">
                          {formatDate(note.createdAt)}
                        </span>
                      </div>
                      <CardTitle className="line-clamp-1 text-base sm:text-lg font-semibold mb-1.5 group-hover:text-primary transition-colors duration-300">{note.title}</CardTitle>
                      <CardDescription className="line-clamp-2 text-sm leading-relaxed">
                        {note.template?.name || "자유 노트"}
                      </CardDescription>
                      {note.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {note.tags.map((tag) => (
                            <span
                              key={tag.id}
                              className="text-xs px-2.5 py-1 bg-muted/60 hover:bg-muted rounded-full transition-colors"
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
