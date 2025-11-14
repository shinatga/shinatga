import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from "@shinatga/ui";
import { defaultTemplates } from "@shinatga/templates";
import { PAGES } from "@/lib/constants";

export default function TemplatesPage() {
  const { templates } = PAGES;

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{templates.title}</h1>
          <p className="text-muted-foreground">{templates.subtitle}</p>
        </div>
        <Button>{templates.newTemplate}</Button>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">{templates.defaultTemplates}</h2>
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
                    {template.fields.length}{templates.fields}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">{templates.customTemplates}</h2>
          <p className="text-muted-foreground">{templates.empty}</p>
        </div>
      </div>
    </div>
  );
}
