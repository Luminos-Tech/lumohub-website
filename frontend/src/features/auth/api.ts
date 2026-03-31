import { api } from "@/lib/axios";
import type { LoginInput, RegisterInput } from "@/types/auth";
import type { TokenResponse } from "@/types/api";
import type { User } from "@/types/user";

export const authApi = {
  register: async (payload: RegisterInput) => (await api.post<User>("/auth/register", payload)).data,
  login: async (payload: LoginInput) => (await api.post<TokenResponse>("/auth/login", payload)).data,
  me: async () => (await api.get<User>("/auth/me")).data,
  refresh: async (refreshToken: string) => (await api.post("/auth/refresh", { refresh_token: refreshToken })).data,
  logout: async (refreshToken: string) => (await api.post("/auth/logout", { refresh_token: refreshToken })).data
};
