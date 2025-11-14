"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { LoadingOverlay } from "./LoadingOverlay";

export function NavigationLoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  // 라우팅이 시작될 때 로딩 표시
  const startLoading = useCallback(() => {
    // 짧은 지연 후 로딩 표시 (즉각적인 페이지 전환 시 깜빡임 방지)
    const id = setTimeout(() => {
      setIsLoading(true);
    }, 1000);
    setTimeoutId(id);
  }, []);

  // 라우팅이 완료될 때 로딩 숨김
  const stopLoading = useCallback(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsLoading(false);
  }, [timeoutId]);

  useEffect(() => {
    // pathname 또는 searchParams가 변경되면 로딩 종료
    stopLoading();
  }, [pathname, searchParams, stopLoading]);

  useEffect(() => {
    // 링크 클릭 이벤트 감지
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      
      if (anchor && anchor.href) {
        const currentUrl = window.location.href;
        const targetUrl = anchor.href;
        
        // 외부 링크나 같은 페이지가 아닌 경우에만 로딩 표시
        if (
          targetUrl !== currentUrl &&
          targetUrl.startsWith(window.location.origin) &&
          !anchor.hasAttribute("target")
        ) {
          startLoading();
        }
      }
    };

    // form submit 이벤트 감지
    const handleSubmit = (e: SubmitEvent) => {
      const form = e.target as HTMLFormElement;
      const method = form.method.toLowerCase();
      
      // GET 방식의 form submit은 페이지 이동이므로 로딩 표시
      if (method === "get") {
        startLoading();
      }
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("submit", handleSubmit);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("submit", handleSubmit);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [startLoading, timeoutId]);

  return (
    <>
      {children}
      <LoadingOverlay isLoading={isLoading} />
    </>
  );
}

