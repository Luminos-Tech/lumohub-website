"use client";
import { authApi } from "./api";
import { useAuthStore } from "@/store/authStore";

export function useLogout() {
  const clearAuth = useAuthStore((s) => s.clearAuth);
  return async () => {
    const refreshToken = localStorage.getItem("lumohub_refresh_token");
    if (refreshToken) {
      try { await authApi.logout(refreshToken); } catch {}
    }
    clearAuth();
  };
}
