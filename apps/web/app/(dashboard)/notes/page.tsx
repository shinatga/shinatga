import { Button, Card, CardHeader, CardTitle, CardDescription } from "@shinatga/ui";
import { defaultTemplates } from "@shinatga/templates";

export default function NotesPage() {
  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">노트</h1>
          <p className="text-muted-foreground">나의 묵상과 기도를 기록하세요</p>
        </div>
        <Button>새 노트 작성</Button>
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
        <h2 className="text-xl font-semibold mb-4">최근 노트</h2>
        <p className="text-muted-foreground">아직 작성된 노트가 없습니다.</p>
      </div>
    </div>
  );
}
