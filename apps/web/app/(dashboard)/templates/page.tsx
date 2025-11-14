import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from "@shinatga/ui";
import { defaultTemplates } from "@shinatga/templates";

export default function TemplatesPage() {
  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">템플릿</h1>
          <p className="text-muted-foreground">노트 템플릿을 관리하고 커스터마이징하세요</p>
        </div>
        <Button>새 템플릿 만들기</Button>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">기본 템플릿</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {defaultTemplates.map((template) => (
              <Card key={template.name}>
                <CardHeader>
                  <div className="text-4xl mb-2">{template.icon}</div>
                  <CardTitle>{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {template.fields.length}개 필드
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">나만의 템플릿</h2>
          <p className="text-muted-foreground">아직 커스텀 템플릿이 없습니다.</p>
        </div>
      </div>
    </div>
  );
}
