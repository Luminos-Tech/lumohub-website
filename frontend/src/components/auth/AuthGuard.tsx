"use client";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useAuthBootstrap } from "@/hooks/useAuth";

export function AuthGuard({ children }: { children: ReactNode }) {
  useAuthBootstrap();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    const token = localStorage.getItem("lumohub_access_token");
    if (!token && !user) {
      router.replace("/login");
    }
  }, [router, user]);

  return <>{children}</>;
}
