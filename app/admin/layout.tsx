
import type React from "react"
import type { Metadata } from "next"
import QueryProvider from "@/components/QueryProvider";
import AppToaster from "../toaster";

export const metadata: Metadata = {
  title: "Admin Dashboard - Court Contracting Company",
  description: "Admin panel for managing Court Contracting Company projects and content",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <QueryProvider>
      <div className="min-h-screen bg-background">
        {children}
        <AppToaster />
      </div>
    </QueryProvider>
  );
}
