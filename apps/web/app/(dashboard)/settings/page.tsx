import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@shinatga/ui";
import { PAGES } from "@/lib/constants";

export default function SettingsPage() {
  const { settings } = PAGES;

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{settings.title}</h1>
        <p className="text-muted-foreground">{settings.subtitle}</p>
      </div>

      <div className="space-y-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>{settings.sections.profile.title}</CardTitle>
            <CardDescription>{settings.sections.profile.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{settings.sections.profile.status}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{settings.sections.notifications.title}</CardTitle>
            <CardDescription>{settings.sections.notifications.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{settings.sections.notifications.status}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{settings.sections.theme.title}</CardTitle>
            <CardDescription>{settings.sections.theme.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{settings.sections.theme.status}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
