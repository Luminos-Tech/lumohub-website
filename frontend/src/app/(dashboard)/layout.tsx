"use client";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { ProtectedLayout } from "@/components/layout/ProtectedLayout";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard><ProtectedLayout>{children}</ProtectedLayout></AuthGuard>;
}
