"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import type { User } from "@/types/user";

export function useAuthBootstrap() {
  const setAuth = useAuthStore((s) => s.setAuth);

  useEffect(() => {
    const accessToken = localStorage.getItem("lumohub_access_token");
    const refreshToken = localStorage.getItem("lumohub_refresh_token");
    const rawUser = localStorage.getItem("lumohub_user");
    if (accessToken && refreshToken && rawUser) {
      const user = JSON.parse(rawUser) as User;
      setAuth({ user, accessToken, refreshToken });
    }
  }, [setAuth]);
}
