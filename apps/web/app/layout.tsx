import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { APP } from "@/lib/constants";
import { ThemeProvider, ThemeScript } from "@/components/ThemeProvider";
import { NavigationLoadingProvider } from "@/components/NavigationLoadingProvider";
import { DialogProvider } from "@/components/DialogProvider";
import { Suspense } from "react";
import { AuthSessionProvider } from "@/components/auth/session-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: APP.fullName,
  description: APP.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <AuthSessionProvider>
            <Suspense fallback={null}>
              <NavigationLoadingProvider>
                <DialogProvider>
                  {children}
                </DialogProvider>
              </NavigationLoadingProvider>
            </Suspense>
          </AuthSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
