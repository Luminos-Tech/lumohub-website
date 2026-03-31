import { api } from "@/lib/axios";
import type { ProfileInput } from "./types";
import type { User } from "@/types/user";

export const profileApi = {
  me: async () => (await api.get<User>("/users/me")).data,
  update: async (payload: ProfileInput) => (await api.patch<User>("/users/me", payload)).data,
  changePassword: async (current_password: string, new_password: string) => (await api.patch("/users/me/password", { current_password, new_password })).data
};
