"use client";
import { create } from "zustand";
import type { User } from "@/types/user";

type AuthState = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  setAuth: (payload: { user: User; accessToken: string; refreshToken: string }) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  setAuth: ({ user, accessToken, refreshToken }) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lumohub_access_token", accessToken);
      localStorage.setItem("lumohub_refresh_token", refreshToken);
      localStorage.setItem("lumohub_user", JSON.stringify(user));
    }
    set({ user, accessToken, refreshToken });
  },
  clearAuth: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("lumohub_access_token");
      localStorage.removeItem("lumohub_refresh_token");
      localStorage.removeItem("lumohub_user");
    }
    set({ user: null, accessToken: null, refreshToken: null });
  }
}));
