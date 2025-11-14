import React from "react";
import { Lnb } from "@/components/Lnb";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Lnb />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pl-6">{children}</main>
    </div>
  );
}
