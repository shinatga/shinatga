import { Button } from "@shinatga/ui";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">시냇가에 오신 것을 환영합니다</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            로그인하여 시작하세요
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <Button className="w-full" size="lg">
            이메일로 로그인
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                또는
              </span>
            </div>
          </div>

          <p className="text-center text-sm">
            계정이 없으신가요?{" "}
            <Link href="/register" className="text-primary hover:underline">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
