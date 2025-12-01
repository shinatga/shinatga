import React from "react";
import { Lnb } from "@/components/Lnb";
import { MobileHeader } from "@/components/MobileHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Mobile Header */}
      <MobileHeader />
      
      {/* Desktop Sidebar */}
      <Lnb />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4 md:pl-6 md:pr-0">{children}</main>
    </div>
  );
}
