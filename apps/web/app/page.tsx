import Link from "next/link";
import { Button } from "@shinatga/ui";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-5xl w-full text-center space-y-8">
        <h1 className="text-6xl font-bold tracking-tight">
          시냇가 🌿
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          노트, 제목을 체계적으로 관리하는
          <br />
          템플릿 기반 노트 앱
        </p>

        <div className="flex gap-4 justify-center mt-8">
          <Link href="/login">
            <Button size="lg">시작하기</Button>
          </Link>
          <Link href="/register">
            <Button variant="outline" size="lg">
              회원가입
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="p-6 border rounded-lg">
            <div className="text-4xl mb-4">📖</div>
            <h3 className="text-lg font-semibold mb-2">예배 말씀</h3>
            <p className="text-sm text-muted-foreground">
              설교 제목, 본문, 적용점을 구조화하여 기록
            </p>
          </div>

          <div className="p-6 border rounded-lg">
            <div className="text-4xl mb-4">✝️</div>
            <h3 className="text-lg font-semibold mb-2">묵상 노트</h3>
            <p className="text-sm text-muted-foreground">
              관찰, 해석, 적용, 기도의 체계적인 묵상
            </p>
          </div>

          <div className="p-6 border rounded-lg">
            <div className="text-4xl mb-4">🙏</div>
            <h3 className="text-lg font-semibold mb-2">기도 제목</h3>
            <p className="text-sm text-muted-foreground">
              기도 제목과 응답을 추적하고 관리
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
