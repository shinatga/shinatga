import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from "@shinatga/ui";
import { defaultTemplates } from "@shinatga/templates";
import { PAGES } from "@/lib/constants";
import { TemplateIcon } from "@/components/TemplateIcon";

export default function TemplatesPage() {
  const { templates } = PAGES;

  return (
    <div className="container py-6 sm:py-8">
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">{templates.title}</h1>
          <p className="text-sm sm:text-base text-muted-foreground">{templates.subtitle}</p>
        </div>
        <Button className="w-full sm:w-auto">{templates.newTemplate}</Button>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold mb-4">{templates.defaultTemplates}</h2>
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {defaultTemplates.map((template) => (
              <Card key={template.name}>
                <CardHeader className="p-4 sm:p-6">
                  <div className="mb-2">
                    <TemplateIcon iconName={template.icon} className="w-8 h-8 sm:w-10 sm:h-10" />
                  </div>
                  <CardTitle className="text-base sm:text-lg">{template.name}</CardTitle>
                  <CardDescription className="text-sm">{template.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                  <p className="text-sm text-muted-foreground">
                    {template.fields.length}{templates.fields}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-semibold mb-4">{templates.customTemplates}</h2>
          <p className="text-sm sm:text-base text-muted-foreground">{templates.empty}</p>
        </div>
      </div>
    </div>
  );
}
