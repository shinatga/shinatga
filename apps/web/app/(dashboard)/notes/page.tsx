import Link from "next/link";
import { Button, Card, CardHeader, CardTitle, CardDescription } from "@shinatga/ui";
import { defaultTemplates } from "@shinatga/templates";
import { PAGES } from "@/lib/constants";

export default function NotesPage() {
  const { notes } = PAGES;

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{notes.title}</h1>
          <p className="text-muted-foreground">{notes.subtitle}</p>
        </div>
        <Link href="/notes/new">
          <Button>{notes.newNote}</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {defaultTemplates.map((template) => (
          <Card key={template.name} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="text-4xl mb-2">{template.icon}</div>
              <CardTitle>{template.name}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">{notes.recentNotes}</h2>
        <p className="text-muted-foreground">{notes.empty}</p>
      </div>
    </div>
  );
}
