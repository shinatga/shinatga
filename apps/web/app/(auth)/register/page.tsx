import { Button } from "@shinatga/ui";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { PAGES, ROUTES } from "@/lib/constants";

export default async function RegisterPage() {
  const session = await auth();
  const { register } = PAGES.auth;

  // 이미 로그인한 사용자는 대시보드로 리다이렉트
  if (session?.user) {
    redirect(ROUTES.notes);
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">{register.title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {register.subtitle}
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <Button className="w-full" size="lg">
            {register.button}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                {register.divider}
              </span>
            </div>
          </div>

          <p className="text-center text-sm">
            {register.hasAccount}{" "}
            <Link href={ROUTES.login} className="text-primary hover:underline">
              {register.loginLink}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
