import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@shinatga/ui";

export default function SettingsPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">설정</h1>
        <p className="text-muted-foreground">앱 설정을 관리하세요</p>
      </div>

      <div className="space-y-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>프로필</CardTitle>
            <CardDescription>계정 정보를 관리합니다</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">프로필 설정 준비 중...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>알림</CardTitle>
            <CardDescription>알림 설정을 관리합니다</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">알림 설정 준비 중...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>테마</CardTitle>
            <CardDescription>앱 테마를 설정합니다</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">테마 설정 준비 중...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
