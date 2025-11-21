import Link from "next/link";
import { PAGES, ROUTES } from "@/lib/constants";
import { GoogleAuthButton } from "@/components/auth/google-auth-button";

export default function LoginPage() {
  const { login } = PAGES.auth;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">{login.title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {login.subtitle}
          </p>
        </div>

        <div className="mt-8 space-y-4">
          {/* 기존 버튼은 아직 기능이 없으므로 유지하거나 비활성화 */}
          {/* <Button className="w-full" size="lg" disabled>
            {login.button} (준비중)
          </Button> */}

          {/* <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                {login.divider}
              </span>
            </div>
          </div> */}

          <GoogleAuthButton />

          <p className="text-center text-sm">
            {login.noAccount}{" "}
            <Link href={ROUTES.register} className="text-primary hover:underline">
              {login.registerLink}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
